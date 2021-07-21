const TransactionModel = require('../models/transaction')

class TransactionService {

  static async findById(id) {
    return TransactionModel.findById(id)
  }

  static async findByCustomer(customer_id) {
    return TransactionModel.find({ $or: [{source: customer_id}, {receiver: customer_id}] })
  }

  static async findByAccountNumber(account_number) {
    return TransactionModel.find({ $or: [{source_string: account_number}, {receiver_string: account_number}] })
  }

  static async findAllWithdrawals(params = {}) {
    return TransactionModel.find(params)
  }
  
  static async findAllDeposits() {
    return TransactionModel.find({type: 'deposit'}).populate('source receiver').exec()
  }

  static async findAllWithdrawals() {
    return TransactionModel.find({type: 'withdrawal'}).populate('source').exec()
  }

  static async save(dao) {
    return TransactionModel.create(dao)
  }

  static async removeOne(id) {
    return TransactionModel.findByIdAndRemove(id)
  }

}

module.exports = TransactionService