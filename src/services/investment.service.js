const Investment = require('../models/Investment.model')

exports.list = async (userId, query) => {
  const { page = 1, limit = 20 } = query
  const filter = { userId }

  const items = await Investment.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Investment.countDocuments(filter)
  return items
}

exports.create = (userId, data) =>
  Investment.create({ ...data, userId })

exports.getById = (userId, id) =>
  Investment.findOne({ _id: id, userId })

exports.update = (userId, id, data) =>
  Investment.findOneAndUpdate({ _id: id, userId }, data, { new: true })

exports.remove = (userId, id) =>
  Investment.findOneAndDelete({ _id: id, userId })