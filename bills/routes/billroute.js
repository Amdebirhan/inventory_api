const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const BillController = require('../controllers/billcontroller')
const ValidationCheck = require('../middleware/billvalidation')
//const { schema } = require('../middleware/purchasevalidation') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', BillController.DisplayBill)

  router.post('/SearchBill', BillController.SearchBill); 

  //router.post('/AddBill', ValidationCheck.datavalidation );

  router.post('/AddBill', BillController.AddBill)

  router.post('/UpdateBill', BillController.UpdateBill);

  router.post('/DeleteBill', BillController.DeleteBill);


  module.exports = router
