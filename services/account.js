const AccountModel = require('../models/account')

class AccountService {

  static async findByCustomerName(customer_name) {
    return AccountModel.find({account_holder_name: new RegExp(customer_name, 'ig')}).populate('customer').exec()
  }

  static async findByAccountNumber(account_number) {
    return AccountModel.findOne({account_number}).populate('customer').exec()
  }

  static async findByCustomerId(customer_id) {
    return AccountModel.findOne({customer: customer_id}).populate('customer').exec()
  }

  static async findById(id) {
    return AccountModel.findById(id).populate('customer')
  }
  
  static async findAll() {
    return AccountModel.find().populate('customer')
  }

  static async save(dao) {
    return AccountModel.create(dao)
  }

  static async withdraw(account_id, amount) {
    return AccountModel.findByIdAndUpdate(account_id, {$inc: { account_number: - (amount) }})
  }

  static async deposit(account_id, amount) {
    return AccountModel.findByIdAndUpdate(account_id, {$inc: { account_number: amount }})
  }

  static async removeOne(id) {
    return AccountModel.findByIdAndRemove(id)
  }

}

module.exports = AccountService