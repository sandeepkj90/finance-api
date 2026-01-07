const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: ['LOAN_EMI', 'CREDIT_CARD', 'SUBSCRIPTION', 'RENT', 'INSURANCE', 'CUSTOM'],
    required: true
  },
  amount: Number,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reminderDay: { type: Number, required: true, min: 1, max: 31 },
  frequency: {
    type: String,
    enum: ['MONTHLY', 'YEARLY', 'ONCE'],
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PAUSED', 'COMPLETED'],
    default: 'ACTIVE'
  }
}, { timestamps: true })

module.exports = mongoose.model('Reminder', schema)
