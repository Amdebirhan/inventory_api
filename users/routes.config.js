const cleanBody = require("../common/middlewares/cleanbody");
const userController = require("./controllers/users.controller");
const { validateToken } = require("../authorization/middlewares/validateToken");
const privilages = require("../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
const url = require("url");
router = express.Router();

router.route('/').post([
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  userController.insert
]).get([
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    userController.getById
  ]);
router.get('/get',
  privilages.getPrivilages,
);


module.exports = router;

