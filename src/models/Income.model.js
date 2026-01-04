const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  source: String,
  amount: Number,
  category: String,
  date: Date,
  account: String
}, { timestamps: true })

module.exports = mongoose.model('Income', schema)
