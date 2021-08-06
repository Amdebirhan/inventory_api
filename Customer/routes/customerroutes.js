const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const customerController = require('../controllers/customercontroller')
const ValidationCheck = require('../middleware/customervalidation')
const customermodel = require('../models/customermodel')
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', customerController.Displaycustomer)

  router.post('/Searchcustomer', customerController.Searchcustomer); 

  router.post('/Addcustomer', customerController.Addcustomer)

  router.post('/Updatecustomer', customerController.Updatecustomer);

  router.post('/Deletecustomer', customerController.Deletecustomer);

  module.exports = router