const Investment = require('../models/Investment.model')

exports.list = async (userId, query) => {
  const { page = 1, limit = 20, type, category } = query
  const filter = { userId }

  if (type) {
    filter.type = type
  }
  if (category) {
    filter.category = category
  }

  const items = await Investment.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Investment.countDocuments(filter)

  return items;
}

exports.create = async (userId, data) => {
  // Calculate returns if currentValue is provided
  const returns = data.currentValue - data.amount

  const investment = await Investment.create({
    ...data,
    userId,
    returns
  })

  return {
    id: investment._id.toString(),
    userId: investment.userId.toString(),
    name: investment.name,
    type: investment.type,
    category: investment.category,
    amount: investment.amount,
    currentValue: investment.currentValue,
    returns: investment.returns,
    date: investment.date,
    createdAt: investment.createdAt,
    updatedAt: investment.updatedAt
  }
}

exports.getById = async (userId, id) => {
  const investment = await Investment.findOne({ _id: id, userId })

  if (!investment) {
    const err = new Error(`Investment with id '${id}' not found`)
    err.status = 404
    err.code = 'NOT_FOUND'
    throw err
  }

  return {
    id: investment._id.toString(),
    userId: investment.userId.toString(),
    name: investment.name,
    type: investment.type,
    category: investment.category,
    amount: investment.amount,
    currentValue: investment.currentValue,
    returns: investment.returns,
    date: investment.date,
    createdAt: investment.createdAt,
    updatedAt: investment.updatedAt
  }
}

exports.update = async (userId, id, data) => {
  const investment = await Investment.findOne({ _id: id, userId })

  if (!investment) {
    const err = new Error(`Investment with id '${id}' not found`)
    err.status = 404
    err.code = 'NOT_FOUND'
    throw err
  }

  // Check authorization
  if (investment.userId.toString() !== userId) {
    const err = new Error("You don't have permission to update this investment")
    err.status = 401
    err.code = 'UNAUTHORIZED'
    throw err
  }

  // Update returns if amount or currentValue changes
  if (data.amount || data.currentValue) {
    const amount = data.amount || investment.amount
    const currentValue = data.currentValue || investment.currentValue
    data.returns = currentValue - amount
  }

  Object.assign(investment, data)
  await investment.save()

  return {
    id: investment._id.toString(),
    userId: investment.userId.toString(),
    name: investment.name,
    type: investment.type,
    category: investment.category,
    amount: investment.amount,
    currentValue: investment.currentValue,
    returns: investment.returns,
    date: investment.date,
    createdAt: investment.createdAt,
    updatedAt: investment.updatedAt
  }
}

exports.remove = async (userId, id) => {
  const investment = await Investment.findOne({ _id: id, userId })

  if (!investment) {
    const err = new Error(`Investment with id '${id}' not found`)
    err.status = 404
    err.code = 'NOT_FOUND'
    throw err
  }

  // Check authorization
  if (investment.userId.toString() !== userId) {
    const err = new Error("You don't have permission to delete this investment")
    err.status = 401
    err.code = 'UNAUTHORIZED'
    throw err
  }

  await Investment.findByIdAndDelete(id)

  return {
    id: investment._id.toString(),
    name: investment.name,
    deletedAt: new Date()
  }
}