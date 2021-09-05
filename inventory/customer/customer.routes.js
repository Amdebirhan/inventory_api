
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const customerController = require("./controller/customer.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.post("/insert-customer", [
  cleanBody,
  // validateToken,
  // privilages.getPrivilages,
  customerController.insert

])




router.get(('/get-customer/:customerId'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    customerController.getById
  ]);

router.get(('/get-customers'), [
  cleanBody,
  // validateToken,
  // privilages.getPrivilages,
  customerController.list
]);

router.patch(('/patch-customer/:customerId'), [
  cleanBody,
  // validateToken,
  // privilages.getPrivilages,
  customerController.patchById
]);

router.delete(('/remove-customer/:customerId'),[
  cleanBody,
  // validateToken,
  // privilages.getPrivilages,
  customerController.removeById
]);


module.exports = router;
