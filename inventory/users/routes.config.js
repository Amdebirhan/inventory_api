const cleanBody = require("../common/middlewares/cleanbody");
const userController = require("./controllers/users.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
const url = require("url");
router = express.Router();

router.route('/').post(function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    userController.insert
  ]
})

router.get(('/:userId'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  userController.getById
]);

router.get(('/list-users'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  userController.list
]);

router.patch('/assignPrivilages',
  userController.assignPrivilage,
);

router.delete('/users/:userId', [
  userController.removeById
]);



module.exports = router;

