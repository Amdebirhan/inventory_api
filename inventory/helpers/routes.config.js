const cleanBody = require ("../common/middlewares/cleanbody");
const QR_and_barcode= require('./QR_and_Barcode')
const express = require('express');
router = express.Router();



router.get('/barcode/:id', [
    cleanBody,
    QR_and_barcode.bar_code_generator
]);


router.get('/qrcode/:id', [
    cleanBody,
    QR_and_barcode.QR_code_generator
]);

module.exports = router;