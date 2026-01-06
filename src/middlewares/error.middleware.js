module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500
  const errorCode = err.code || 'SERVER_ERROR'
  const message = err.message || 'Internal Server Error'

  // Format response based on error type
  if (err.isValidationError) {
    // Joi validation errors
    return res.status(400).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      errors: err.details
    })
  }

  // Generic error response
  res.status(statusCode).json({
    status: 'error',
    code: errorCode,
    message: message
  })
}

