const cleanBody = require("../common/middlewares/cleanbody");
const billController = require("./controller/bill.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

//list all invoices

router.get('/insert-bill', function(req, res) {
  billController.list
});


//get a single invoice

router.get('/get-single-bill/:id', function(req, res) {
  billController.singleBill
});

router.patch('/change-status/:id', function(req, res) {
  billController.changeStatus
});


module.exports = router;

