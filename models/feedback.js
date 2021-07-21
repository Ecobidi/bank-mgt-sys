const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
  from: String,
  sender_name: String,
  from_account_number: String,
  contact_phone: String,
  message: String,
})

module.exports = new mongoose.model('feedback', FeedbackSchema)