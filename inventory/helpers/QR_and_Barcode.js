const { PassThrough }=require('stream');
var Jimp = require("jimp");
var fs = require('fs')
var qrCode = require('qrcode-reader');
var BarcodeScanner= require ("native-barcode-scanner");

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
    // Read the image and create a buffer
    // (Here image.png is our QR code)
    var buffer = fs.readFileSync(__dirname + '/image.png');

    // Parse the image using Jimp.read() method
    Jimp.read(buffer, function (err, image) {
        if (err) {
            console.error(err);
        }
        // Creating an instance of qrcode-reader module
        let qrcode = new qrCode();
        qrcode.callback = function (err, value) {
            if (err) {
                console.error(err);
            }
            // Printing the decrypted value
            console.log(value.result);
        };
        // Decoding the QR code
        qrcode.decode(image.bitmap);
    });

};

exports.bar_code_scanner = (req, res) => {
    

const options = {...foo}

const scanner = BarcodeScanner(options);

// Add a global listener
scanner.on('code', code => {
  console.log(code);
});

// Remove the listener
scanner.off();
};
