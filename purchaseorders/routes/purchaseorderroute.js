const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const PurchaseOrderController = require('../controllers/purchaseordercontroller')
const ValidationCheck = require('../middleware/purchasevalidation')
//const { schema } = require('../middleware/purchasevalidation') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', PurchaseOrderController.DisplayPurchaseOrder)

  router.post('/SearchPurchaseOrder', PurchaseOrderController.SearchPurchaseOrder); 

  //router.post('/AddSupplier', ValidationCheck.datavalidation );

  router.post('/AddPurchaseOrder', PurchaseOrderController.AddPurchaseOrder)

  router.post('/UpdatePurchaseOrder', PurchaseOrderController.UpdatePurchaseOrder);

  router.post('/DeletePurchaseOrderr', PurchaseOrderController.DeletePurchaseOrder);


  module.exports = router
