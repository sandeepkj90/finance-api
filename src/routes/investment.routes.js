const router = require('express').Router()
const c = require('../controllers/investment.controller')
const v = require('../validations/investment.validation')
const validate = require('../middlewares/validate.middleware')
const auth = require('../middlewares/auth.middleware')

/**
 * Protected - All investment routes require authentication
 */
router.use(auth)

/**
 * GET /api/investments
 * Get all investments (with optional type/category filter)
 */
router.get('/', c.list)

/**
 * POST /api/investments
 * Create a new investment
 */
router.post('/', validate(v.create), c.create)

/**
 * GET /api/investments/:id
 * Get investment by ID
 */
router.get('/:id', validate(v.getById), c.get)

/**
 * PUT /api/investments/:id
 * Update an investment
 */
router.put('/:id', validate(v.update), c.update)

/**
 * DELETE /api/investments/:id
 * Delete an investment
 */
router.delete('/:id', validate(v.delete), c.remove)

module.exports = router