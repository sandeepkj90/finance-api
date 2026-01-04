const Joi = require('joi')

exports.login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}

exports.refresh = {
  body: Joi.object({
    refreshToken: Joi.string().required()
  })
}

exports.logout = {
  body: Joi.object({
    refreshToken: Joi.string().required()
  })
}
