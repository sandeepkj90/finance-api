const Expense = require('../models/Expenses.model')

exports.list = async (userId, query) => {
  const { page = 1, limit = 20 } = query
  const filter = { userId }

  const items = await Expense.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Expense.countDocuments(filter)
  return items
}

exports.create = (userId, data) =>
  Expense.create({ ...data, userId })

exports.getById = (userId, id) =>
  Expense.findOne({ _id: id, userId })

exports.update = (userId, id, data) =>
  Expense.findOneAndUpdate({ _id: id, userId }, data, { new: true })

exports.remove = (userId, id) =>
  Expense.findOneAndDelete({ _id: id, userId })
