const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['expense', 'income', 'transfer'] },
  amount: Number,
  date: Date,
  category: String,
  description: String,
  account: String,
  relatedId: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

module.exports = mongoose.model('Transaction', schema)
