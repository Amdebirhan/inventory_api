
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const POController = require("../purchase_order/controller/purchaseOrder.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.get('/print-bill/:billId', (req, res, next) => {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    POController.printBill
  ]
});

router.post("/send-bill",function (req, res) { [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  POController.sendBill
]});


router.get('/to-pdf/:billId', (req, res, next) => {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    POController.toPdf
  ]
});



module.exports = router;

