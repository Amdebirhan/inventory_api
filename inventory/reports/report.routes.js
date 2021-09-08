const cleanBody = require("../common/middlewares/cleanbody");
const POController = require("./controller/purchaseOrder.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.get(('/quantity-on-hand'), [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        POController.insertPO
    ]);

router.get(('/quantity-to-recive'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.getById
]);

router.get(('/saleorders'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.list
]);
router.get(('/invoices'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.convertPOToBill
]);

router.get(('/purchaseorders'),
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.updatePO,
);

router.get(('/bills'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.removeById
]);

router.get(('/specific-item-sale'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.removeById
]);

router.get(('/specific-item-purchase'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.removeById
]);

module.exports = router;

