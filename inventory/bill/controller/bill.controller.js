const purchaseorderModel = require('../../purchase_order/models/purchaseOrder.models');
const billModel = require('../../bill/models/bill.models');
const vendorModel = require('../../supplier/models/supplier.models');
const itemModel = require("../../item/models/item.models");
const organizationalModel = require("../../organizational_profile/models/organizationalProfile.models");

//list all bill
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    let organizationId = req.decoded.organizationId;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    billModel.list(limit, page,organizationId).then((result) => {
        res.status(200).send(result);
    })
 };   

exports.singleBill = async (req, res, next) => {
    //first get the invoice data from invoice model
    const bill = bill.findById(req.params.userId);
    //get the sale orders
    const purchaseorder = purchaseorderModel.findById(invoice.sale_order_ID);
    //get all the items from item model 
    const datas = await itemModel.find({ '_id': { $in: purchaseorder.item_ID } });
    //get company info
    const company = await organizationalModel.findById(purchaseorder.organization_ID);
    //get customer information
    const vendor = await vendorModel.findById(purchaseorder.customer_ID);

    let array = [];
    let item = 0;
    datas.forEach(data => {
        const product = {
            name: data.name,
            description: data.description,
            unit: data.unit,
            quantity:  saleOrder.quantity[item],
            price: saleOrder.price[item],
            total: data.quantity * d.price,
        }
        array.push(prod);
        item++;
    });

    let subtotal = 0;
    array.forEach(i => {
        subtotal += i.total
    });
    const tax = (subtotal * saleOrder.tax) / 100;
    const grandtotal = subtotal + tax + saleOrder.shipment_charge;
    const result = {
        title:"invoice",
        company_logo:company.logo, 
        company_name:company.organization_Name,
        company_adress:company.city + company.stret1,
        company_phone_number:company.contact_phone_no,
        company_email:company.contact_email,
        customer_company_name:vendor.company_Name,
        customer_company_phone_number :vendor.work_phone_no,
        customer_email:vendor.email,
        discount:purchaseorder.discount,
        shipment_charge:purchaseorder.shipment_charge,
        productlist: array,
        subtotal: subtotal,
        tax: tax,
        grandtotal: grandtotal
    }

      res.status(200).send(result);
}

exports.changeStatus = (req, res) => {
    bill.findById(req.params.billId,req.params.statusId).then((result) => {
        res.status(200).send(result);
    });
};








// //convert bill to pdf
// exports.toPdf = async (req, res) => {
//     try {
       
//     } catch (error) {
//         return res.status(500).json({
//             error: true,
//             message: "Couldn't insert purchaseorder. Please try again later.",
//         });
//     }
// }

// //print bill
// exports.printBill = async (req, res) => {
//     try {

//     } catch (error) {
//         return res.status(500).json({
//             error: true,
//             message: "Couldn't convert to bill. Please try again later.",
//         });
//     }
// }

// //send bill to supplier
// exports.sendBill = async (req,res)=>{
//     purchaseorderModel.patchPO(req.params.userId, req.body).then((result) => {
//         res.status(204).send({});
// });
// }




//  var fs = require('fs');
// var bodyParser = require('body-parser');
// var pdf = require('html-pdf');

// app.post('/product/invoice', function (req, res) {
//     var htmlPath = req.body.htmlPath;
//     if (!htmlPath){
//         res.status(400).send("Missing 'htmlPath'");
//         return;
//     }
//     var html = fs.readFileSync(htmlPath, 'utf8');
//     // you may want to change this path dynamically if you also wish to keep the generated PDFs
//     var pdfFilePath = './businesscard.pdf';
//     var options = { format: 'Letter' };

//     pdf.create(html, options).toFile(pdfFilePath, function(err, res2) {
//         if (err){
//             console.log(err);
//             res.status(500).send("Some kind of error...");
//             return;
//         }
//         fs.readFile(pdfFilePath , function (err,data){
//             res.contentType("application/pdf");
//             res.send(data);
//         });
//     });
// });