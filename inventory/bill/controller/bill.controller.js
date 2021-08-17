const purchaseorderModel = require('../models/purchaseOrder.models');
const billModel = require('../../bill/models/bill.models');
const User = require('../../users/models/users.model');
const validateSchema = require('../middlewares/purchaseOrder.middleware');

//convert bill to pdf
exports.toPdf = async (req, res) => {
    try {
       
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't insert purchaseorder. Please try again later.",
        });
    }
}

//print bill
exports.printBill = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't convert to bill. Please try again later.",
        });
    }
}

//send bill to supplier
exports.sendBill = async (req,res)=>{
    purchaseorderModel.patchPO(req.params.userId, req.body).then((result) => {
        res.status(204).send({});
});
}

//list all bill
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    purchaseorderModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };   

 //delete bill
 exports.removeById = (req, res) => {
    purchaseorderModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
 };

 exports.getById = (req, res) => {
    purchaseorderModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
 };

















 var fs = require('fs');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');

app.post('/product/invoice', function (req, res) {
    var htmlPath = req.body.htmlPath;
    if (!htmlPath){
        res.status(400).send("Missing 'htmlPath'");
        return;
    }
    var html = fs.readFileSync(htmlPath, 'utf8');
    // you may want to change this path dynamically if you also wish to keep the generated PDFs
    var pdfFilePath = './businesscard.pdf';
    var options = { format: 'Letter' };

    pdf.create(html, options).toFile(pdfFilePath, function(err, res2) {
        if (err){
            console.log(err);
            res.status(500).send("Some kind of error...");
            return;
        }
        fs.readFile(pdfFilePath , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    });
});