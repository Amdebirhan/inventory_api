const cleanBody = require ("../common/middlewares/cleanbody");
const userController = require("./controllers/users.controller")
const express = require('express');
router = express.Router();
 
router.post('/users', function(req, res){
    cleanBody,
    userController.insert
  }); 
  router.get('/users/:userId', function(req, res){
    cleanBody,
    userController.getById
  }); 
  
  module.exports = router;

