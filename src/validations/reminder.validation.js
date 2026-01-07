const Joi = require('joi')

exports.create = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string()
      .valid('LOAN_EMI', 'CREDIT_CARD', 'SUBSCRIPTION', 'RENT', 'INSURANCE', 'CUSTOM')
      .required(),
    amount: Joi.number(),
    startDate: Joi.string().isoDate().required(),
    endDate: Joi.string().isoDate().required(),
    reminderDay: Joi.number().integer().min(1).max(31).required(),
    frequency: Joi.string().valid('MONTHLY', 'YEARLY', 'ONCE').required()
  })
}

exports.update = {
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    type: Joi.string().valid('LOAN_EMI', 'CREDIT_CARD', 'SUBSCRIPTION', 'RENT', 'INSURANCE', 'CUSTOM'),
    amount: Joi.number(),
    startDate: Joi.string().isoDate(),
    endDate: Joi.string().isoDate(),
    reminderDay: Joi.number().integer().min(1).max(31),
    frequency: Joi.string().valid('MONTHLY', 'YEARLY', 'ONCE')
  })
}

exports.statusUpdate = {
  body: Joi.object({
    status: Joi.string().valid('ACTIVE', 'PAUSED', 'COMPLETED').required()
  })
}
