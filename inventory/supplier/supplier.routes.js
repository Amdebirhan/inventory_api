
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const supplierController = require("./controller/supplier.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.Post(('/insert-supplier'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  supplierController.insert
]);

router.get('/get-supplier/:supplierId').post(function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    supplierController.getById
  ]
})

router.get(('/get-supplier/'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  supplierController.list
]);

router.patch(('/patch-supplier/:supplierId'), [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    supplierController.patchById
  ]);

  router.delete(('/remove-supplier/:supplierId'), [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    supplierController.delete
  ]);

module.exports = router;
