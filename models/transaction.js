const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['tranfer', 'deposit', 'withdrawal']
  },
  amount: {
    type: Number,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: false,
  },
  receiver_string: String,
  receiver_account_number: String,
  receiver_name: String,
  source_string: String,
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: false,
  },

}, {timestamps: {createdAt: true}})

module.exports = mongoose.model('transaction', TransactionSchema)