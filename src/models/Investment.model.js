const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String,
  amount: Number,
  currentValue: Number,
  returns: Number,
  date: Date
}, { timestamps: true })

module.exports = mongoose.model('Investment', schema)
