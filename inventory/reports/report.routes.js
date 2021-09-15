const cleanBody = require("../common/middlewares/cleanbody");
const inventoryReport = require("../reports/inventory.reports");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();


 router.get(('/quantity-on-hand'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    inventoryReport.insertPO
]);
router.get('/quantity-to-recive',function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.quantityToRecive
    ]
} );

router.get('/saleorders', function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.saleorders
    ]
});
router.get('/invoices', function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.invoices
    ]
});

router.get('/purchaseorders', function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.purchaseorders,
    ]
});

router.get('/bills', function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.bills
    ]
});

router.get('/specific-item-sale',  function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.specificItemSale
    ]
});

router.get('/specific-item-purchase', function(req, res){
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        inventoryReport.specificItemPurchase
    ]
} );

module.exports = router;

