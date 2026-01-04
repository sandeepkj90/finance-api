const userService = require('../services/user.service')

exports.register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body)
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (err) {
    next(err)
  }
}

exports.profile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id)
    if (!user) {
      const error = new Error('User not found')
      error.status = 404
      return next(error)
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
}

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body)
    if (!user) {
      const error = new Error('User not found')
      error.status = 404
      return next(error)
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
}

exports.changePassword = async (req, res, next) => {
  try {
    await userService.changePassword(
      req.user.id,
      req.body.currentPassword,
      req.body.newPassword
    )
    res.json({ success: true, message: 'Password changed successfully' })
  } catch (err) {
    next(err)
  }
}
