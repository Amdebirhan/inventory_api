const cleanBody = require ("../common/middlewares/cleanbody");
const authController = require("./controllers/authorization.controller");
const { validateToken } = require("../authorization/middlewares/validateToken");
const express = require('express');
router = express.Router();
 
// exports.routesConfig = function (app) {
//     app.post('/users', [
//         userController.insert
//     ]);
//     app.get('/users/:userId', [
//         userController.getById
//     ]);
// };

  router.post("auth/signup", cleanBody, authController.Signup);
   

  router.post("auth/login", cleanBody, authController.login);
  
    router.get("auth/referred",validateToken,authController.login);

    router.patch("auth/activate",[ 
        cleanBody, 
        authController.activate
    ]);    
    router.patch("auth/forgot",[
        cleanBody,
        authController.forgetPassword
    ]);
    
    router.patch("auth/reset",[
        cleanBody,
        authController.resetPassword
    ]);

    router.patch("auth/logout",[
        cleanBody,
        authController.logout
    ]);

module.exports = router;