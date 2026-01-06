const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: { type: String, trim: true, default: null },
    address: { type: String, trim: true, default: null },
    passwordHash: { type: String, required: true },
    refreshToken: { type: String, default: null }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
