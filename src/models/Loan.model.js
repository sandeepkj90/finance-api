const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lender: String,
  amount: Number,
  interestRate: Number,
  term: Number,
  monthlyPayment: Number,
  paidAmount: { type: Number, default: 0 },
  remainingBalance: Number,
  status: { type: String, enum: ['active', 'Paid Off'], default: 'active' },
  startDate: Date
}, { timestamps: true })

module.exports = mongoose.model('Loan', schema)
