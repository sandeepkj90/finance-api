const router = require('express').Router()
const c = require('../controllers/expense.controller')
const v = require('../validations/expense.validation')
const validate = require('../middlewares/validate.middleware')
const auth = require('../middlewares/auth.middleware');

router.use(auth)

router.get('/', c.list)
router.post('/', validate(v.create), c.create)
router.get('/:id', c.get)
router.put('/:id', validate(v.update), c.update)
router.delete('/:id', c.remove)

module.exports = router
