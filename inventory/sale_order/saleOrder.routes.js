const cleanBody = require("../common/middlewares/cleanbody");
const SOController = require("./controller/saleOrder.controller");
const { validateToken } = require("../../authorization/middlewares/validateToken");
const privilages = require("../../authorization/middlewares/verifyPrivilageRoutesAndRequests");
const express = require('express');
router = express.Router();

router.route('/insert-SO').post(function (req, res) {
    [
        cleanBody,
        // validateToken,
        // privilages.getPrivilages,
        SOController.insertSO
    ]
})

router.get(('/get-SO/:POId'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    SOController.getById
]);

router.get(('/list-SO'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    SOController.list
]);
router.get(('/convert-to-invoice/:SOId'), [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    SOController.convertSOToInvoice
]);

router.patch('/update-SO/:SOId',
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    SOController.updateSO,
);

router.delete('/remove-SO/:SOId', [
    cleanBody,
    // validateToken,
    // privilages.getPrivilages,
    SOController.removeById
]);



module.exports = router;

