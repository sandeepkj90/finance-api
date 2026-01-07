const service = require('../services/reminder.service')

exports.list = async (req, res, next) => {
  try {
    res.json(await service.list(req.user.id, req.query))
  } catch (e) { next(e) }
}

exports.getDashboard = async (req, res, next) => {
  try {
    res.json(await service.getDashboard(req.user.id))
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
      const error = new Error('Reminder not found')
      error.status = 404
      return next(error)
    }
    res.json({ success: true, data: item })
  } catch (e) { next(e) }
}

exports.update = async (req, res, next) => {
  try {
    const item = await service.getById(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Reminder not found')
      error.status = 404
      return next(error)
    }
    res.json(await service.update(req.user.id, req.params.id, req.body))
  } catch (e) { next(e) }
}

exports.pause = async (req, res, next) => {
  try {
    const item = await service.getById(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Reminder not found')
      error.status = 404
      return next(error)
    }
    res.json(await service.updateStatus(req.user.id, req.params.id, 'PAUSED'))
  } catch (e) { next(e) }
}

exports.resume = async (req, res, next) => {
  try {
    const item = await service.getById(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Reminder not found')
      error.status = 404
      return next(error)
    }
    res.json(await service.updateStatus(req.user.id, req.params.id, 'ACTIVE'))
  } catch (e) { next(e) }
}

exports.complete = async (req, res, next) => {
  try {
    const item = await service.getById(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Reminder not found')
      error.status = 404
      return next(error)
    }
    res.json(await service.updateStatus(req.user.id, req.params.id, 'COMPLETED'))
  } catch (e) { next(e) }
}

exports.remove = async (req, res, next) => {
  try {
    const item = await service.getById(req.user.id, req.params.id)
    if (!item) {
      const error = new Error('Reminder not found')
      error.status = 404
      return next(error)
    }
    res.json(await service.remove(req.user.id, req.params.id))
  } catch (e) { next(e) }
}
