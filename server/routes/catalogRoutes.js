const express = require('express')
const router = express.Router()
const { getCatalogItems, createCatalog, editCatalogItem, deleteCatalogItem, deleteAllItems, addCatalogItem } = require('../controllers/catalogController')

router.post('/getItems', getCatalogItems)
router.post('/createCatalogItems', createCatalog)
router.post('/editCatalogItem', editCatalogItem)
router.post('/deleteCatalogItem', deleteCatalogItem)
router.post('/deleteAllItems', deleteAllItems)
router.post('/addCatalogItem', addCatalogItem)

module.exports = router