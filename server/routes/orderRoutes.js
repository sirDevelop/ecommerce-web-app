const express = require('express')
const router = express.Router()
const { getOrderHistory,checkoutOrder } = require('../controllers/orderController')

router.post('/getOrderHistory', getOrderHistory)
router.post('/checkoutOrder', checkoutOrder)

module.exports = router