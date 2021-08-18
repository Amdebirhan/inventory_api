
//print bill send bill convert bill to pdf
const cleanBody = require("../common/middlewares/cleanbody");
const itemController = require("./../item/controller/item.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.post("/insert-item", [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  itemController.insert
]);



router.get('/get-item/:itemId', function (req, res) {
  [
    cleanBody,
    validateToken,
    privilages.getPrivilages,
    itemController.getById
  ]
})

router.get(('/get-items/'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  itemController.list
]);

router.patch(('/patch-item/:itemId'), [
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  itemController.patchById
]);

router.delete('/remove-item/:itemId', function (req, res) {[
  cleanBody,
  validateToken,
  privilages.getPrivilages,
  itemController.delete
]});


module.exports = router;
