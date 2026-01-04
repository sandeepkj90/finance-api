const jwtUtil = require('../utils/jwt.util')

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authorization token missing',
        code: 'AUTH_ERROR'
      })
    }

    const token = header.split(' ')[1]
    const payload = jwtUtil.verifyAccessToken(token)

    req.user = {
      id: payload.id,
      email: payload.email
    }

    next()
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired token',
      code: 'AUTH_ERROR'
    })
  }
}
