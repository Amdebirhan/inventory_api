const cleanBody = require ("../common/middlewares/cleanbody");
const userController = require("./controllers/authorization.controller")
const express = require('express');
app = express.Router();
 
        app.post('/signup', function(req, res){
            cleanBody,
         userController.signup
          }); 

        app.post('/login', function(req, res){
            cleanBody, 
         userController.login
          });  
    app.patch("/activate",[ 
        cleanBody, 
        userController.activate
    ]);    
    app.patch("/forgot",[
        cleanBody,
        userController.forgetPassword
    ]);
    
    app.patch("/reset",[
        cleanBody,
        userController.resetPassword
    ]);

    app.patch("/logout",[
        cleanBody,
        userController.logout
    ]);

module.exports = app;