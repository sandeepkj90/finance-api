const mongoose = require('mongoose')

const PAYMENT_METHODS = [
  'Bank Transfer',
  'Cash',
  'Cheque',
  'Credit Card',
  'Debit Card',
  'Digital Wallet',
  'UPI',
  'Other'
]

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    source: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      default: 'Bank Transfer'
    },
    date: { type: Date, required: true },
    account: { type: String, trim: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Income', schema)
