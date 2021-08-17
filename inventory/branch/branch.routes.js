
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const branchController = require("./controller/branch.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.Post(('/insert-branch'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  branchController.insert
]);

router.get('/get-branch/:branchId').post(function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    branchController.getById
  ]
})

router.get(('/get-branchs/'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  branchController.list
]);

router.patch(('/patch-branch/:branchId'), [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    branchController.patchById
  ]);

  router.delete(('/remove-branch/:branchId'), [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    branchController.delete
  ]);

module.exports = router;
