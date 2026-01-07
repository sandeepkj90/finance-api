const router = require('express').Router()

router.use('/auth', require('./auth.routes'))
router.use('/budgets', require('./budget.routes'))
router.use('/expenses', require('./expense.routes'))
router.use('/incomes', require('./income.routes'))
router.use('/investments', require('./investment.routes'))
router.use('/loans', require('./loan.routes'))
router.use('/reminders', require('./reminder.routes'))
// router.use('/transactions', require('./transaction.routes'))
// router.use('/accounts', require('./account.routes'))
// router.use('/credit-cards', require('./creditCard.routes'))
// router.use('/reports', require('./report.routes'))
// router.use('/dashboard', require('./dashboard.routes'))
// router.use('/services', require('./service.routes'))
router.use('/users', require('./user.routes'))

module.exports = router
