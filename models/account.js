const mongoose = require('mongoose')

let AccountSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    unique: true,
  },
  account_holder_name: {
    type: String,
  },
  account_type: {
    type: String,
    required: true,
  },
  account_balance: {
    type: Number,
    required: true,
  },
  account_number: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
})

module.exports = mongoose.model('account', AccountSchema)