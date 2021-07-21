const AccountService = require('../services/account')
const CustomerService = require('../services/customer')
const TransactionService = require('../services/transaction')

class AccountController {
  static async getAllAccountsPage(req, res) {
    let accounts
    accounts = await AccountService.findAll()
    res.render('accounts', { accounts })
  }

  static async getAllDepositsTransactions(req, res) {
    let transactions = await TransactionService.findAllDeposits()
    res.render('deposit-transactions', {transactions})
  }

  static async getAllWithdrawalsTransactions(req, res) {
    let transactions = await TransactionService.findAllWithdrawals()
    res.render('withdrawal-transactions', {transactions})
  }

  static async createAccountPage(req, res) {
    let customers = await CustomerService.findAll()
    res.render('accounts-new', { customers })
  }

  static async createAccount(req, res) {
    try {
      let customer_id = req.body.customer
      let customer = await CustomerService.findById(customer_id)
      if (!customer) throw new Error ('No user found')
      let accountNumber = (new Date()).getTime()
      let dao = {
        account_holder_name: customer.surname + " " + customer.first_name + " " + customer.middle_name,
        account_type: req.body.account_type,
        account_number: accountNumber,
        account_balance: req.body.account_balance,
        status: 'active',
        customer: customer._id,
      }
      console.log(dao)
      await AccountService.save(dao)
      console.log('new account created')
      req.flash('success_msg', 'Success: New Account Number is ' + accountNumber)
      res.redirect('/accounts/new')
    } catch (error) {
      console.log('Error Creating Account: ', error)
      req.flash('error_msg', 'Error createing account')
      res.redirect('/accounts/new')
    }
  }

  static async getAccountInfo(req, res) {
    let account = await AccountService.findByCustomerId(req.params.customer_id)
    res.render('account-info', {account})
  }

  static async getAccountStatements(req, res) {
    let transactions = await TransactionService.findByCustomer(req.params.customer_id)
    res.render('account-statements', { transactions })
  }

  static async performTransactionPage(req, res) {
    try {
      let account = await AccountService.findByAccountNumber(req.query.account_number)
      if (account) {
        let transactions = await TransactionService.findByAccountNumber(req.query.account_number)
        res.render('perform-transaction', { account, account_found: true, transactions })
      } else {
        res.render('perform-transaction', { account_found: false })
      }
    } catch (error) {
      req.flash('error_msg', 'Invalid Account Number')
      res.redirect('/accounts/perform-transaction')
    }
    
  }

  static async depositPage(req, res) {
    try {
      let account = await AccountService.findByAccountNumber(req.query.account_number)
      if (account) {
        let transactions = await TransactionService.findByAccountNumber(req.query.account_number)
        res.render('account-deposit', { account, account_found: true, transactions })
      } else {
        res.render('account-deposit', { account_found: false })
      }
    } catch (error) {
      req.flash('error_msg', 'Invalid Account Number')
      res.redirect('/accounts/deposit')
    }
    
  }

  static async withdrawalPage(req, res) {
    
    try {
      let account = await AccountService.findByAccountNumber(req.query.account_number)
    if (account) {
      let transactions = await TransactionService.findByAccountNumber(req.query.account_number)
      res.render('account-withdrawal', { account, account_found: true, transactions })
    } else {
      res.render('account-withdrawal', { account_found: false })
    }
    } catch (error) {
      req.flash('error_msg', 'Invalid Account Number')
      res.redirect('/accounts/withdrawal')
    }
  }

  static async handleDeposit(req, res) {
    let { source_string, source_account_number, source, receiver, amount } = req.body
    let dao = req.body 
    amount = Number(amount)
    dao.amount = amount
    try {
      let receiver_account = await AccountService.findByAccountNumber(receiver)
      let source_account = await AccountService.findById(source)
 
      if (! receiver_account) throw new Error('Failuire: Incorrect Receiver Account Number')
      if (source_account.account_balance < amount) throw new Error('Failure: Insufficient Account Balance To Complete Transaction')

      dao.receiver = receiver_account._id
      dao.receiver_string = receiver_account._id
      dao.receiver_account_number = receiver.account_number

      source_account.account_balance = source_account.account_balance - amount
      receiver_account.account_balance = receiver_account.account_balance + amount

      await source_account.save()
      await receiver_account.save()
      await TransactionService.save(dao)
      req.flash('success_msg', `NGN ${amount} successfully deposited to ${receiver_account.account_number} with account name ${receiver_account.account_holder_name}.` )
      res.redirect('/accounts/deposit?account_number=' + source_account_number)
    
    } catch (error) {
      req.flash('error_msg', error.message)
      console.log(error)
      res.redirect('/accounts/deposit?account_number=' + source_account_number)
    }
  }

  static async handleWithdrawal(req, res) {
    console.log(req.body)
    let { source_string, source_account_number, source, receiver, amount, type } = req.body
    let dao = req.body 
    amount = Number(amount)
    dao.amount = amount
    try {
      let source_account = await AccountService.findById(source)

      if (source_account.account_balance < amount) throw new Error('Failure: Insufficient Account Balance To Complete Transaction')

      source_account.account_balance = source_account.account_balance - amount

      console.log(source_account)

      await source_account.save()
      await TransactionService.save(dao)
      req.flash('success_msg', `${amount} successfully withdrawn by ${source_account.account_number} with account name ${source_account.account_holder_name}.` )
      res.redirect('/accounts/withdrawal?account_number=' + source_account_number)
    
    } catch (error) {
      req.flash('error_msg', error.message)
      console.log(error)
      res.redirect('/accounts/withdrawal?account_number=' + source_account_number)
    }
  }

  static async removeAccount(req, res) {
    try {
      await AccountService.removeOne(req.params.account_id)
      res.redirect('/accounts')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/accounts')
    }
  }

}

module.exports = AccountController