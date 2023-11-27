const express = require('express')
const router = express.Router()
const { getOrderHistory,checkoutOrder,oneClickBuy, verify } = require('../controllers/orderController')

router.post('/getOrderHistory', getOrderHistory)
router.post('/checkoutOrder', checkoutOrder)
router.post('/oneClickBuy', oneClickBuy)
router.post('/verify', verify)

module.exports = router