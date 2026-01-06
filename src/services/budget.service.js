const Budget = require('../models/Budget.model')

const BUDGET_CATEGORIES = [
  'Housing & Fixed Commitments',
  'Utilities & Communication',
  'Groceries & Daily Essentials',
  'Transportation',
  'Subscriptions & Services',
  'Investments & Savings',
  'Personal / Family Expenses',
  'Miscellaneous'
]

exports.getBudgets = async (userId, month, year) => {
  const query = { userId }

  if (month !== undefined) {
    query.month = month
  }
  if (year !== undefined) {
    query.year = year
  }

  const budgets = await Budget.find(query).sort({ createdAt: -1 })

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)

  return budgets;
}

exports.createBudget = async (userId, { category, limit, month, year }) => {
  // Check if budget already exists
  const existing = await Budget.findOne({
    userId,
    category,
    month,
    year
  })

  if (existing) {
    const err = new Error(
      'Budget for this category already exists for the selected month/year'
    )
    err.status = 400
    err.code = 'DUPLICATE_BUDGET'
    throw err
  }

  const budget = await Budget.create({
    userId,
    category,
    limit,
    month,
    year,
    spent: 0
  })

  return {
    id: budget._id.toString(),
    userId: budget.userId.toString(),
    category: budget.category,
    limit: budget.limit,
    spent: budget.spent,
    month: budget.month,
    year: budget.year,
    createdAt: budget.createdAt,
    updatedAt: budget.updatedAt
  }
}

exports.updateBudget = async (budgetId, userId, updateData) => {
  const budget = await Budget.findById(budgetId)

  if (!budget) {
    const err = new Error(`Budget with id '${budgetId}' not found`)
    err.status = 404
    err.code = 'NOT_FOUND'
    throw err
  }

  // Check authorization
  if (budget.userId.toString() !== userId) {
    const err = new Error("You don't have permission to update this budget")
    err.status = 401
    err.code = 'UNAUTHORIZED'
    throw err
  }

  // Check for duplicate if category/month/year is being changed
  if (
    updateData.category ||
    updateData.month !== undefined ||
    updateData.year
  ) {
    const duplicate = await Budget.findOne({
      userId,
      _id: { $ne: budgetId },
      category: updateData.category || budget.category,
      month: updateData.month !== undefined ? updateData.month : budget.month,
      year: updateData.year || budget.year
    })

    if (duplicate) {
      const err = new Error(
        'Budget for this category already exists for the selected month/year'
      )
      err.status = 400
      err.code = 'DUPLICATE_BUDGET'
      throw err
    }
  }

  Object.assign(budget, updateData)
  await budget.save()

  return {
    id: budget._id.toString(),
    userId: budget.userId.toString(),
    category: budget.category,
    limit: budget.limit,
    spent: budget.spent,
    month: budget.month,
    year: budget.year,
    createdAt: budget.createdAt,
    updatedAt: budget.updatedAt
  }
}

exports.deleteBudget = async (budgetId, userId) => {
  const budget = await Budget.findById(budgetId)

  if (!budget) {
    const err = new Error(`Budget with id '${budgetId}' not found`)
    err.status = 404
    err.code = 'NOT_FOUND'
    throw err
  }

  // Check authorization
  if (budget.userId.toString() !== userId) {
    const err = new Error("You don't have permission to delete this budget")
    err.status = 401
    err.code = 'UNAUTHORIZED'
    throw err
  }

  await Budget.findByIdAndDelete(budgetId)

  return {
    id: budget._id.toString(),
    category: budget.category,
    deletedAt: new Date()
  }
}

exports.updateBudgetSpent = async (budgetId, amount) => {
  const budget = await Budget.findById(budgetId)
  if (budget) {
    budget.spent += amount
    await budget.save()
  }
  return budget
}

exports.getBudgetById = async (budgetId, userId) => {
  const budget = await Budget.findById(budgetId)

  if (!budget) {
    const err = new Error(`Budget with id '${budgetId}' not found`)
    err.status = 404
    err.code = 'NOT_FOUND'
    throw err
  }

  if (budget.userId.toString() !== userId) {
    const err = new Error("You don't have permission to access this budget")
    err.status = 401
    err.code = 'UNAUTHORIZED'
    throw err
  }

  return {
    id: budget._id.toString(),
    userId: budget.userId.toString(),
    category: budget.category,
    limit: budget.limit,
    spent: budget.spent,
    month: budget.month,
    year: budget.year,
    createdAt: budget.createdAt,
    updatedAt: budget.updatedAt
  }
}
