const Reminder = require('../models/Reminder.model')

exports.list = async (userId, query) => {
  const { page = 1, limit = 20, status, type } = query
  const filter = { userId }

  if (status) filter.status = status
  if (type) filter.type = type

  const items = await Reminder.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })

  const total = await Reminder.countDocuments(filter)
  return {
    success: true,
    data: items,
    total,
    page: parseInt(page),
    limit: parseInt(limit)
  }
}

exports.getDashboard = async (userId) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const reminders = await Reminder.find({
    userId,
    status: 'ACTIVE',
    startDate: { $lte: today },
    endDate: { $gte: today },
    reminderDay: today.getDate()
  })

  return {
    success: true,
    data: reminders.map(reminder => ({
      id: reminder._id,
      title: reminder.title,
      type: reminder.type,
      amount: reminder.amount,
      dueDate: reminder.reminderDay
    }))
  }
}

exports.create = async (userId, data) => {
  const reminder = await Reminder.create({ ...data, userId })
  return {
    success: true,
    message: 'Reminder created successfully',
    data: {
      id: reminder._id,
      status: reminder.status
    }
  }
}

exports.getById = (userId, id) =>
  Reminder.findOne({ _id: id, userId })

exports.update = async (userId, id, data) => {
  const reminder = await Reminder.findOneAndUpdate({ _id: id, userId }, data, { new: true })
  return {
    success: true,
    message: 'Reminder updated successfully',
    data: reminder
  }
}

exports.updateStatus = async (userId, id, status) => {
  const reminder = await Reminder.findOneAndUpdate(
    { _id: id, userId },
    { status },
    { new: true }
  )
  return {
    success: true,
    message: `Reminder ${status.toLowerCase()}`
  }
}

exports.remove = async (userId, id) => {
  const reminder = await Reminder.findOneAndDelete({ _id: id, userId })
  return {
    success: true,
    message: 'Reminder deleted successfully'
  }
}
