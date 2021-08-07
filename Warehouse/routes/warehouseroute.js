const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const warehouseController = require('../controllers/warehousecontroller')
const ValidationCheck = require('../middleware/warehousevalidation')
const warehousemodel = require('../models/warehousemodel')
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', warehouseController.Displaywarehouse)

  router.post('/Searchwarehouse', warehouseController.Searchwarehouse); 

  router.post('/Addwarehouse', warehouseController.Addwarehouse)

  router.post('/Updatewarehouse', warehouseController.Updatewarehouse);

  router.post('/Deletewarehouse', warehouseController.Deletewarehouse);

  module.exports = router