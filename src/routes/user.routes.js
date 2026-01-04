const router = require('express').Router()
const controller = require('../controllers/user.controller')
const validate = require('../middlewares/validate.middleware')
const validation = require('../validations/user.validation')
const auth = require('../middlewares/auth.middleware')

/**
 * Public
 */
router.post('/register', validate(validation.create), controller.register)

/**
 * Protected
 */
router.use(auth)

router.get('/me', controller.profile)
router.put('/me', validate(validation.update), controller.updateProfile)
router.put(
  '/me/change-password',
  validate(validation.changePassword),
  controller.changePassword
)

module.exports = router
