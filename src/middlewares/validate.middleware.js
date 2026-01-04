const Joi = require('joi')

/**
 * Universal Joi validation middleware
 * Usage: validate({ body, query, params })
 */
module.exports = (schema) => {
  return (req, res, next) => {
    const toValidate = {}

    if (schema.body) toValidate.body = req.body
    if (schema.query) toValidate.query = req.query
    if (schema.params) toValidate.params = req.params

    const validationSchema = Joi.object(schema)

    const { error, value } = validationSchema.validate(toValidate, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    })

    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.details.reduce((acc, curr) => {
          acc[curr.path.join('.')] = curr.message
          return acc
        }, {})
      })
    }

    // Replace request data with validated/sanitized data
    Object.assign(req, value)

    next()
  }
}
