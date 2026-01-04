const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
  amount: Number,
  date: Date,
  note: String
}, { timestamps: true })

module.exports = mongoose.model('LoanRepayment', schema)
