const Joi = require('joi')

exports.create = {
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    amount: Joi.number().required(),
    currentValue: Joi.number().required(),
    returns: Joi.number().required(),
    date: Joi.string().isoDate().required()
  })
}

exports.update = {
  body: Joi.object({
    name: Joi.string(),
    type: Joi.string(),
    amount: Joi.number(),
    currentValue: Joi.number(),
    returns: Joi.number(),
    date: Joi.string().isoDate()
  })
}
