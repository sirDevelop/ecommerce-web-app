const express = require('express')
const router = express.Router()
const { getCatalogItems } = require('../controllers/catalogController')

router.post('/getAllItems', getCatalogItems)

module.exports = router