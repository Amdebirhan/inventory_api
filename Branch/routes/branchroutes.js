const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const branchController = require('../controllers/branchcontroller')
const ValidationCheck = require('../middleware/branchvalidation')
const branchmodel = require('../models/branchmodel')
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', branchController.Displaybranch)

  router.post('/Searchbranch', branchController.Searchbranch); 

  router.post('/Addbranch', branchController.Addbranch)

  router.post('/Updatebranch', branchController.Updatebranch);

  router.post('/Deletebranch', branchController.Deletebranch);

  module.exports = router