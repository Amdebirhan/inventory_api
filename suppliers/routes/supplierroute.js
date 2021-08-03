const express = require('express')
const router  = express.Router()

const SupplierController = require('../controllers/suppliercontroller')

router.get('/', SupplierController.DisplaySuplier)
router.post('/SearchSupplier', SupplierController.SearchSupplier)
router.post('/AddSupplie', SupplierController.AddSupplier)
router.post('/UpdateSupplier', SupplierController.UpdateSupplier)
router.post('/DeleteSupplier', SupplierController.DeleteSupplier)

module.exports = router