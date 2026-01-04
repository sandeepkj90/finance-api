const service = require('../services/investment.service')

exports.list = async (req, res, next) => {
  try {
    res.json(await service.list(req.user.id, req.query))
  } catch (e) { next(e) }
}

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.user.id, req.body))
  } catch (e) { next(e) }
}

exports.get = async (req, res, next) => {
  try {
    const item = await service.getById(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Investment not found')
      error.status = 404
      return next(error)
    }
    res.json(item)
  } catch (e) { next(e) }
}

exports.update = async (req, res, next) => {
  try {
    const item = await service.update(req.user.id, req.params.id, req.body)
    if (!item) {
      const error = new Error('Investment not found')
      error.status = 404
      return next(error)
    }
    res.json(item)
  } catch (e) { next(e) }
}

exports.remove = async (req, res, next) => {
  try {
    const item = await service.remove(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Investment not found')
      error.status = 404
      return next(error)
    }
    res.json({ success: true, message: 'Investment deleted successfully' })
  } catch (e) { next(e) }
}