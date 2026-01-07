const router = require('express').Router()
const c = require('../controllers/reminder.controller')
const v = require('../validations/reminder.validation')
const validate = require('../middlewares/validate.middleware')
const auth = require('../middlewares/auth.middleware')

router.use(auth)

router.get('/dashboard', c.getDashboard)
router.get('/', c.list)
router.post('/', validate(v.create), c.create)
router.get('/:id', c.get)
router.put('/:id', validate(v.update), c.update)
router.patch('/:id/pause', c.pause)
router.patch('/:id/resume', c.resume)
router.patch('/:id/complete', c.complete)
router.delete('/:id', c.remove)

module.exports = router
