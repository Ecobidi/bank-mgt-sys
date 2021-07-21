const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  message: String,
  customer: String,
})

module.exports = mongoose.model('notification', NotificationSchema)