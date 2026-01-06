const Joi = require('joi')

const PAYMENT_METHODS = [
  'Bank Transfer',
  'Cash',
  'Cheque',
  'Credit Card',
  'Debit Card',
  'Digital Wallet',
  'UPI',
  'Other'
]

exports.create = {
  body: Joi.object({
    source: Joi.string().min(2).max(100).required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().required(),
    paymentMethod: Joi.string()
      .valid(...PAYMENT_METHODS),
    date: Joi.date().iso().required(),
    account: Joi.string().max(100)
  })
}

exports.update = {
  body: Joi.object({
    source: Joi.string().min(2).max(100),
    amount: Joi.number().positive(),
    category: Joi.string(),
    paymentMethod: Joi.string()
      .valid(...PAYMENT_METHODS),
    date: Joi.date().iso(),
    account: Joi.string().max(100)
  })
}
