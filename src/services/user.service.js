const User = require('../models/User.model')
const passwordUtil = require('../utils/password.util')

exports.createUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email })
  if (exists) {
    const err = new Error('Email already registered')
    err.status = 409
    err.code = 'USER_EXISTS'
    throw err
  }

  const passwordHash = await passwordUtil.hash(password)

  return User.create({
    name,
    email,
    passwordHash
  })
}

exports.getProfile = async (userId) => {
  return User.findById(userId).select('-passwordHash -refreshToken')
}

exports.updateProfile = async (userId, data) => {
  // Check if email is being updated and if it already exists
  if (data.email) {
    const existingUser = await User.findOne({
      email: data.email,
      _id: { $ne: userId }
    })
    if (existingUser) {
      const err = new Error('Email already in use by another user')
      err.status = 409
      err.code = 'EMAIL_EXISTS'
      throw err
    }
  }

  return User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
    select: '-passwordHash -refreshToken'
  })
}

exports.changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId)

  const isMatch = await passwordUtil.compare(
    currentPassword,
    user.passwordHash
  )

  if (!isMatch) {
    const err = new Error('Current password is incorrect')
    err.status = 400
    err.code = 'INVALID_PASSWORD'
    throw err
  }

  user.passwordHash = await passwordUtil.hash(newPassword)
  await user.save()
}
