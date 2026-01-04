const Joi = require('joi')

exports.create = {
  body: Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().required(),
    date: Joi.string().isoDate().required(),
    paymentMethod: Joi.string().required()
  })
}

exports.update = {
  body: Joi.object({
    description: Joi.string(),
    amount: Joi.number().positive(),
    category: Joi.string(),
    date: Joi.string().isoDate(),
    paymentMethod: Joi.string()
  })
}
