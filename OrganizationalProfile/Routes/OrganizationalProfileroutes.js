const express = require('express')
const cleanBody = require ("../../common/middlewares/cleanbody");
const OrganizationalProfileController = require('../controllers/OrganizationalProfilecontroller')
const ValidationCheck = require('../middleware/OrganizationalProfilevalidation')
const OrganizationalProfilemodel = require('../models/OrganizationalProfilemodel')
//const { schema } = require('../middleware/OrganizationalProfilevalidationschema') 
const joi = require("@hapi/joi")

router  = express.Router()

  router.get('/', OrganizationalProfileController.DisplayOrganizationalProfile)

  router.post('/SearchOrganizationalProfile', OrganizationalProfileController.SearchOrganizationalProfile); 

  //router.post('/AddOrganizationalProfile', ValidationCheck.datavalidation );

  router.post('/AddOrganizationalProfile', OrganizationalProfileController.AddOrganizationalProfile)

  router.post('/UpdateOrganizationalProfile', OrganizationalProfileController.UpdateOrganizationalProfile);

  router.post('/DeleteOrganizationalProfile', OrganizationalProfileController.DeleteOrganizationalProfile);


  module.exports = router