const Joi = require('joi')

const INVESTMENT_TYPES = ['Stocks', 'Mutual Fund', 'Bonds', 'ETFs', 'Cryptocurrency', 'Fixed Deposit']

const INVESTMENT_CATEGORIES = [
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
    name: Joi.string().min(2).max(100).required(),
    type: Joi.string()
      .valid(...INVESTMENT_TYPES)
      .required(),
    category: Joi.string()
      .valid(...INVESTMENT_CATEGORIES)
      .required(),
    amount: Joi.number().min(1).required(),
    currentValue: Joi.number().min(0).required(),
    returns: Joi.number(),
    date: Joi.date().iso().required()
  })
}

exports.update = {
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    type: Joi.string().valid(...INVESTMENT_TYPES),
    category: Joi.string().valid(...INVESTMENT_CATEGORIES),
    amount: Joi.number().min(1),
    currentValue: Joi.number().min(0),
    returns: Joi.number(),
    date: Joi.date().iso()
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
