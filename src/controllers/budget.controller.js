const budgetService = require('../services/budget.service')

exports.getBudgets = async (req, res, next) => {
  try {
    const { month, year } = req.query
    const data = await budgetService.getBudgets(
      req.user.id,
      month !== undefined ? parseInt(month) : undefined,
      year !== undefined ? parseInt(year) : undefined
    )

    res.json({
      status: 'success',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.createBudget = async (req, res, next) => {
  try {
    const data = await budgetService.createBudget(req.user.id, req.body)

    res.status(201).json({
      status: 'success',
      code: 'BUDGET_CREATED',
      message: 'Budget created successfully',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await budgetService.updateBudget(id, req.user.id, req.body)

    res.json({
      status: 'success',
      code: 'BUDGET_UPDATED',
      message: 'Budget updated successfully',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await budgetService.deleteBudget(id, req.user.id)

    res.json({
      status: 'success',
      code: 'BUDGET_DELETED',
      message: 'Budget deleted successfully',
      data
    })
  } catch (err) {
    next(err)
  }
}
