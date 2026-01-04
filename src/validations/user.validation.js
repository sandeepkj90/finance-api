const Joi = require('joi')

exports.create = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}

exports.update = {
  body: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email()
  })
}

exports.changePassword = {
  body: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  })
}
