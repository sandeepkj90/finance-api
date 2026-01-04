const jwt = require('jsonwebtoken')
const { JWT } = require('../configs/env')

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT.SECRET,
    { expiresIn: JWT.EXPIRES_IN }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    JWT.REFRESH_SECRET,
    { expiresIn: JWT.REFRESH_EXPIRES_IN }
  )
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT.SECRET)
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT.REFRESH_SECRET)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
}
