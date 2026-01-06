const Joi = require('joi')

const BUDGET_CATEGORIES = [
  'Housing & Fixed Commitments',
  'Utilities & Communication',
  'Groceries & Daily Essentials',
  'Transportation',
  'Subscriptions & Services',
  'Investments & Savings',
  'Personal / Family Expenses',
  'Miscellaneous'
]

exports.create = {
  body: Joi.object({
    category: Joi.string()
      .valid(...BUDGET_CATEGORIES)
      .required(),
    limit: Joi.number().min(1).required(),
    month: Joi.number().min(0).max(11).required(),
    year: Joi.number().min(2000).required()
  })
}

exports.update = {
  body: Joi.object({
    category: Joi.string().valid(...BUDGET_CATEGORIES),
    limit: Joi.number().min(1),
    month: Joi.number().min(0).max(11),
    year: Joi.number().min(2000)
  }),
  params: Joi.object({
    id: Joi.string().required()
  })
}

exports.getById = {
  params: Joi.object({
    id: Joi.string().required()
  })
}

exports.delete = {
  params: Joi.object({
    id: Joi.string().required()
  })
}

exports.getList = {
  query: Joi.object({
    month: Joi.number().min(0).max(11),
    year: Joi.number().min(2000)
  })
}
