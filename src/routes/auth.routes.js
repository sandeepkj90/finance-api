const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const validate = require('../middlewares/validate.middleware')
const authValidation = require('../validations/auth.validation')
const authMiddleware = require('../middlewares/auth.middleware')

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post(
  '/login',
  validate(authValidation.login),
  authController.login
)

/**
 * POST /api/auth/refresh
 * Body: { refreshToken }
 */
router.post(
  '/refresh',
  validate(authValidation.refresh),
  authController.refresh
)

/**
 * POST /api/auth/logout
 * Body: { refreshToken }
 */
router.post(
  '/logout',
  authMiddleware,
  validate(authValidation.logout),
  authController.logout
)

module.exports = router
