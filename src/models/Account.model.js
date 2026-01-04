const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String,
  balance: Number,
  currency: { type: String, default: 'INR' }
}, { timestamps: true })

module.exports = mongoose.model('Account', schema)
