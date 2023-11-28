const express = require('express')
const router = express.Router()
const { getCatalogItems, createCatalog } = require('../controllers/catalogController')

router.post('/getItems', getCatalogItems)
router.post('/createCatalogItems', createCatalog)

module.exports = router