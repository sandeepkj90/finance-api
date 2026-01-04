const router = require('express').Router()
const c = require('../controllers/loan.controller')
const v = require('../validations/loan.validation')
const validate = require('../middlewares/validate.middleware')
const auth = require('../middlewares/auth.middleware')

router.use(auth)

router.get('/', c.list)
router.post('/', validate(v.create), c.create)
router.get('/:id', c.get)
router.put('/:id', validate(v.update), c.update)
router.delete('/:id', c.remove)
router.post('/:id/repayment', validate(v.repayment), c.repay)
router.get('/:id/repayments', c.repayments)

module.exports = router
