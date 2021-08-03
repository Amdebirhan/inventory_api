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

  router.post("/signup", cleanBody, authController.Signup);
   

  router.post("/login", cleanBody, authController.login);
  
    router.get("/referred",validateToken,authController.login);

    router.patch("/activate",[ 
        cleanBody, 
        authController.activate
    ]);    
    router.patch("/forgot",[
        cleanBody,
        authController.forgetPassword
    ]);
    
    router.patch("/reset",[
        cleanBody,
        authController.resetPassword
    ]);

    router.patch("/logout",[
        cleanBody,
        authController.logout
    ]);

module.exports = router;