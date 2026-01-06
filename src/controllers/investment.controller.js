const service = require('../services/investment.service')

exports.list = async (req, res, next) => {
  try {
    const data = await service.list(req.user.id, req.query)
    res.json({
      status: 'success',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.user.id, req.body)
    res.status(201).json({
      status: 'success',
      code: 'INVESTMENT_CREATED',
      message: 'Investment created successfully',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.get = async (req, res, next) => {
  try {
    const data = await service.getById(req.user.id, req.params.id)
    res.json({
      status: 'success',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const data = await service.update(req.user.id, req.params.id, req.body)
    res.json({
      status: 'success',
      code: 'INVESTMENT_UPDATED',
      message: 'Investment updated successfully',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.remove = async (req, res, next) => {
  try {
    const data = await service.remove(req.user.id, req.params.id)
    res.json({
      status: 'success',
      code: 'INVESTMENT_DELETED',
      message: 'Investment deleted successfully',
      data
    })
  } catch (err) {
    next(err)
  }
}