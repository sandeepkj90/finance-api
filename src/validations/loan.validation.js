const Joi = require('joi')

exports.create = {
  body: Joi.object({
    lender: Joi.string().required(),
    amount: Joi.number().required(),
    interestRate: Joi.number().required(),
    term: Joi.number().required(),
    monthlyPayment: Joi.number().required(),
    paidAmount: Joi.number(),
    startDate: Joi.string().isoDate().required()
  })
}

exports.update = {
  body: Joi.object({
    lender: Joi.string(),
    amount: Joi.number(),
    interestRate: Joi.number(),
    term: Joi.number(),
    monthlyPayment: Joi.number(),
    paidAmount: Joi.number(),
    startDate: Joi.string().isoDate(),
    status: Joi.string().valid('active', 'Paid Off')
  })
}

exports.repayment = {
  body: Joi.object({
    amount: Joi.number().positive().required(),
    date: Joi.string().isoDate().required(),
    note: Joi.string()
  })
}
