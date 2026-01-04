const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  description: String,
  amount: { type: Number, required: true },
  category: String,
  date: { type: Date, required: true },
  paymentMethod: String
}, { timestamps: true })

module.exports = mongoose.model('Expense', schema)
