const Joi = require('joi')

exports.create = {
  body: Joi.object({
    source: Joi.string().required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().required(),
    date: Joi.string().isoDate().required(),
    account: Joi.string()
  })
}

exports.update = {
  body: Joi.object({
    source: Joi.string(),
    amount: Joi.number().positive(),
    category: Joi.string(),
    date: Joi.string().isoDate(),
    account: Joi.string()
  })
}
