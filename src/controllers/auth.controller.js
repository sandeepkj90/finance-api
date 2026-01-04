const authService = require('../services/auth.service')

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

exports.refresh = async (req, res, next) => {
  try {
    const data = await authService.refresh(req.body.refreshToken)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id, req.body.refreshToken)
    res.json({ success: true, message: 'Logged out successfully' })
  } catch (err) {
    next(err)
  }
}
