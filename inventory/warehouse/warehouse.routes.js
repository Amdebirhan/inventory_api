
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const warehouseController = require("./controller/warehouse.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.post("/insert-warehouse", [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  warehouseController.insert
]);



router.get('/get-warehouse/:warehouseId', function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    warehouseController.getById
  ]
})

router.get(('/get-warehouse/'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  warehouseController.list
]);

router.patch(('/patch-warehouse/:warehouseId'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  warehouseController.patchById
]);

router.delete('/remove-warehouse/:warehouseId', function (req, res) {[
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  warehouseController.delete
]});


module.exports = router;
