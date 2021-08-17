
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const POController = require("./controller/purchaseOrder.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.Post(('/send-bill'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  POController.sendBill
]);

router.get('/print-bill/:billId').post(function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    POController.printBill
  ]
})

router.get(('/to-pdf/:billId'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  POController.toPdf
]);


module.exports = router;

