<<<<<<< HEAD
const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const SupplierController = require('../controllers/suppliercontroller')
const ValidationCheck = require('../middleware/suppliervalidation')
//const { schema } = require('../middleware/suppliervalidationschema') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', SupplierController.DisplaySupplier)

  router.post('/SearchSupplier', SupplierController.SearchSupplier); 

  //router.post('/AddSupplier', ValidationCheck.datavalidation );

  router.post('/AddSupplier', SupplierController.AddSupplier)

  router.post('/UpdateSupplier', SupplierController.UpdateSupplier);

  router.post('/DeleteSupplier', SupplierController.DeleteSupplier);


  module.exports = router
=======
const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const SupplierController = require('../controllers/suppliercontroller')
const ValidationCheck = require('../middleware/suppliervalidation')
//const { schema } = require('../middleware/suppliervalidationschema') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', SupplierController.DisplaySupplier)

  router.post('/SearchSupplier', SupplierController.SearchSupplier); 

  //router.post('/AddSupplier', ValidationCheck.datavalidation );

  router.post('/AddSupplier', SupplierController.AddSupplier)

  router.post('/UpdateSupplier', SupplierController.UpdateSupplier);

  router.post('/DeleteSupplier', SupplierController.DeleteSupplier);


  module.exports = router
>>>>>>> 860a139a3950630af880fdffe5020984be954624
