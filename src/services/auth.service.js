const User = require('../models/User.model')
const jwtUtil = require('../utils/jwt.util')
const passwordUtil = require('../utils/password.util')

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user || !(await passwordUtil.compare(password, user.passwordHash))) {
    const err = new Error('Invalid email or password')
    err.status = 401
    err.code = 'AUTH_ERROR'
    throw err
  }

  const accessToken = jwtUtil.generateAccessToken(user)
  const refreshToken = jwtUtil.generateRefreshToken(user)

  user.refreshToken = refreshToken
  await user.save()

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
}

exports.refresh = async (refreshToken) => {
  const payload = jwtUtil.verifyRefreshToken(refreshToken)

  const user = await User.findById(payload.id)
  if (!user || user.refreshToken !== refreshToken) {
    const err = new Error('Invalid refresh token')
    err.status = 401
    throw err
  }

  return {
    accessToken: jwtUtil.generateAccessToken(user),
    refreshToken
  }
}

exports.logout = async (userId, refreshToken) => {
  await User.findOneAndUpdate(
    { _id: userId, refreshToken },
    { refreshToken: null }
  )
}
