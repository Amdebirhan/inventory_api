const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const SaleOrderController = require('../controllers/saleordercontroller')
const ValidationCheck = require('../middleware/salevalidation')
//const { schema } = require('../middleware/salevalidation') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', SaleOrderController.DisplaySaleOrder)

  router.post('/SearchSaleOrder', SaleOrderController.SearchSaleOrder); 

  //router.post('/AddSaleOrder', ValidationCheck.datavalidation );

  router.post('/AddSaleOrder', SaleOrderController.AddSaleOrder)

  router.post('/UpdateSaleOrder', SaleOrderController.UpdateSaleOrder);

  router.post('/DeleteSaleOrderr', SaleOrderController.DeleteSaleOrder);


  module.exports = router
