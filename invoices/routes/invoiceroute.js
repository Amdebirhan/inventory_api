<<<<<<< HEAD
const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const InvoiceController = require('../controllers/invoicecontroller')
const ValidationCheck = require('../middleware/invoicevalidation')
//const { schema } = require('../middleware/purchasevalidation') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', InvoiceController.DisplayInvoice)

  router.post('/SearchInvoice', InvoiceController.SearchInvoice); 

  //router.post('/AddInvoice', ValidationCheck.datavalidation );

  router.post('/AddInvoice', InvoiceController.AddInvoice)

  router.post('/UpdateInvoice', InvoiceController.UpdateInvoice);

  router.post('/DeleteInvoice', InvoiceController.DeleteInvoice);


  module.exports = router
=======
const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const InvoiceController = require('../controllers/invoicecontroller')
const ValidationCheck = require('../middleware/invoicevalidation')
//const { schema } = require('../middleware/purchasevalidation') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', InvoiceController.DisplayInvoice)

  router.post('/SearchInvoice', InvoiceController.SearchInvoice); 

  //router.post('/AddInvoice', ValidationCheck.datavalidation );

  router.post('/AddInvoice', InvoiceController.AddInvoice)

  router.post('/UpdateInvoice', InvoiceController.UpdateInvoice);

  router.post('/DeleteInvoice', InvoiceController.DeleteInvoice);


  module.exports = router
>>>>>>> 860a139a3950630af880fdffe5020984be954624
