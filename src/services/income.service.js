const Income = require('../models/Income.model')

exports.list = async (userId, query) => {
  const { page = 1, limit = 20 } = query
  const filter = { userId }

  const items = await Income.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Income.countDocuments(filter)
  return items
}

exports.create = (userId, data) =>
  Income.create({ ...data, userId })

exports.getById = (userId, id) =>
  Income.findOne({ _id: id, userId })

exports.update = (userId, id, data) =>
  Income.findOneAndUpdate({ _id: id, userId }, data, { new: true })

exports.remove = (userId, id) =>
  Income.findOneAndDelete({ _id: id, userId })