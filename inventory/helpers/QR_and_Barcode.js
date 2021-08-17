import QRCode from 'qrcode';
import { PassThrough } from 'stream';
var Jimp = require("jimp");
var fs = require('fs')
var QrCode = require('qrcode-reader');

exports.QR_code_generator = (req, res) => {
    try {
        const content = req.params.id;
        const qrStream = new PassThrough();
        const res = await QRCode.toFileStream(qrStream, content,
            {
                type: 'png',
                width: 200,
                errorCorrectionLevel: 'H'
            }
        );

        qrStream.pipe(res);
    } catch (err) {
        console.error('Failed to return content', err);
    }
};

exports.bar_code_generator = (req, res) => {
    var canvas = document.createElement("canvas");
    jsBarcode(canvas, req.params.id, { format: "CODE39" });
    return canvas.toDataURL("image/png");
};




exports.QR_code_scanner = (req, res) => {
 
};

exports.bar_code_scanner = (req, res) => {
};
