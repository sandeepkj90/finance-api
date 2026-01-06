const router = require('express').Router()
const controller = require('../controllers/budget.controller')
const validate = require('../middlewares/validate.middleware')
const validation = require('../validations/budget.validation')
const auth = require('../middlewares/auth.middleware')

/**
 * Protected - All budget routes require authentication
 */
router.use(auth)

/**
 * GET /api/budgets
 * Get all budgets (with optional month/year filter)
 */
router.get('/', validate(validation.getList), controller.getBudgets)

/**
 * POST /api/budgets
 * Create a new budget
 */
router.post('/', validate(validation.create), controller.createBudget)

/**
 * PUT /api/budgets/:id
 * Update a budget
 */
router.put('/:id', validate(validation.update), controller.updateBudget)

/**
 * DELETE /api/budgets/:id
 * Delete a budget
 */
router.delete('/:id', validate(validation.delete), controller.deleteBudget)

module.exports = router
