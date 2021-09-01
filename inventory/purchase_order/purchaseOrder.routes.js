const cleanBody = require("../common/middlewares/cleanbody");
const POController = require("./controller/purchaseOrder.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.post(('/insert-PO'), [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        POController.insertPO
    ]);

router.get(('/get-PO/:POId'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.getById
]);

router.get(('/list-PO'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.list
]);
router.get(('/convert-to-bill/:POId'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.convertPOToBill
]);

router.patch(('/update-PO/:POId'),
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.updatePO,
);

router.delete(('/remove-PO/:POId'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    POController.removeById
]);



module.exports = router;

