const Joi = require('joi')

exports.pagination = {
  query: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1)
  })
}
