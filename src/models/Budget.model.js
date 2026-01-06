const mongoose = require('mongoose')

const BUDGET_CATEGORIES = [
  'Housing & Fixed Commitments',
  'Utilities & Communication',
  'Groceries & Daily Essentials',
  'Transportation',
  'Subscriptions & Services',
  'Investments & Savings',
  'Personal / Family Expenses',
  'Miscellaneous'
]

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: BUDGET_CATEGORIES,
      required: true
    },
    limit: {
      type: Number,
      required: true,
      min: 1
    },
    spent: {
      type: Number,
      default: 0,
      min: 0
    },
    month: {
      type: Number,
      required: true,
      min: 0,
      max: 11
    },
    year: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

// Compound index to ensure unique budget per user/category/month/year
budgetSchema.index({ userId: 1, category: 1, month: 1, year: 1 }, { unique: true })

module.exports = mongoose.model('Budget', budgetSchema)
