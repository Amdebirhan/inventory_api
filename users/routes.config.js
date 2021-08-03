const cleanBody = require ("../common/middlewares/cleanbody");
const userController = require("./controllers/users.controller")
const express = require('express');
router = express.Router();
 
router.post('/', function(req, res){
    cleanBody,
    userController.insert
  }); 
  router.get('/:userId', function(req, res){
    cleanBody,
    userController.getById
  }); 
  
  module.exports = router;

