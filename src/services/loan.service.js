const Loan = require('../models/Loan.model')
const Repayment = require('../models/LoanRepayment.model')

exports.list = async (userId, query) => {
  const { page = 1, limit = 20 } = query
  const filter = { userId }

  const items = await Loan.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Loan.countDocuments(filter)
  return items;
}

exports.create = async (userId, data) => {
  data.remainingBalance = data.amount - (data.paidAmount || 0)
  return Loan.create({ ...data, userId })
}

exports.getById = (userId, id) =>
  Loan.findOne({ _id: id, userId })

exports.update = (userId, id, data) =>
  Loan.findOneAndUpdate({ _id: id, userId }, data, { new: true })

exports.remove = (userId, id) =>
  Loan.findOneAndDelete({ _id: id, userId })

exports.repay = async (userId, loanId, data) => {
  const loan = await Loan.findOne({ _id: loanId, userId })
  if (!loan) {
    const error = new Error('Loan not found')
    error.status = 404
    throw error
  }
  loan.paidAmount += data.amount
  loan.remainingBalance = Math.max(0, loan.amount - loan.paidAmount)
  if (loan.remainingBalance === 0) loan.status = 'closed'
  await loan.save()

  await Repayment.create({ loanId, ...data })
  return loan
}

exports.repayments = (loanId) =>
  Repayment.find({ loanId })
