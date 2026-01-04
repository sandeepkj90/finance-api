const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  last4: String,
  limit: Number,
  balance: Number
}, { timestamps: true })

module.exports = mongoose.model('CreditCard', schema)
