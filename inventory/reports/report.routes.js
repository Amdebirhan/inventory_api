const cleanBody = require("../common/middlewares/cleanbody");
const reportController = require("./inventory.reports");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.get(('/quantity-on-hand'), [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        reportController.quantityOnHand
    ]);

router.get(('/quantity-to-recive'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.quantityToRecive
]);

router.get(('/saleorders'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.saleorders
]);
router.get(('/invoices'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.invoices
]);

router.get(('/purchaseorders'),
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.purchaseorders,
);

router.get(('/bills'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.bills
]);

router.get(('/specific-item-sale'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.specificItemSale
]);

router.get(('/specific-item-purchase'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    reportController.specificItemPurchase
]);

module.exports = router;

