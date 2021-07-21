const router = require('express').Router()
const AccountController = require('../controllers/account')

router.get('/', AccountController.getAllAccountsPage)

router.get('/new', AccountController.createAccountPage)

router.post('/new', AccountController.createAccount)

router.get('/view/:account_id', AccountController.getAccountInfo)

router.get('/perform-transaction', AccountController.performTransactionPage)

router.get('/deposit', AccountController.depositPage)

router.post('/deposit', AccountController.handleDeposit)

router.get('/withdrawal', AccountController.withdrawalPage)

router.post('/withdrawal', AccountController.handleWithdrawal)

router.get('/transactions/deposits', AccountController.getAllDepositsTransactions)

router.get('/transactions/withdrawals', AccountController.getAllWithdrawalsTransactions)

router.get('/remove/:account_id', AccountController.removeAccount)

module.exports = router