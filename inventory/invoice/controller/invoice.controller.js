const fs = require('fs');
const path = require('path');
const http = require('http');
const pdf = require("pdf-creator-node");
const invoiceModel = require("../models/invoice.models");
const saleOrderModel = require("../../sale_order/models/saleOrder.models");
const itemModel = require("../../item/models/item.models");
const organizationalModel = require("../../organizational_profile/models/organizationalProfile.models");
const customerModel = require("../../customer/models/customer.models")


exports.getById = (req, res) => {
    invoiceModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
};

exports.generatePdf = async (req, res, next) => {
    const html = fs.readFileSync(path.join(__dirname, '../../helpers/templates/invoice-single.handlebars'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf';
    let array = [];

    //first get the invoice data from invoice model
    const invoice = invoiceModel.findById(req.params.userId);
    //get the sale orders
    const saleOrder = saleOrderModel.findById(invoice.sale_order_ID);
    //get all the items from item model 
    const datas = await itemModel.find({ '_id': { $in: saleOrder.item_ID } });
    //get company info
    const company = await organizationalModel.findById(saleOrder.organization_ID);
    //get customer information
    const customer = await customerModel.findById(saleOrder.customer_ID);

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
    const obj = {
        title:"invoice",
        company_logo:company.logo, 
        company_name:company.organization_Name,
        company_adress:company.city + company.stret1,
        company_phone_number:company.contact_phone_no,
        company_email:company.contact_email,
        customer_company_name:customer.company_Name,
        customer_company_phone_number :customer.work_phone_no,
        customer_email:customer.email,
        discount:saleOrder.discount,
        shipment_charge:saleOrder.shipment_charge,
        productlist: array,
        subtotal: subtotal,
        tax: tax,
        grandtotal: grandtotal
    }
    const document = {
        html: html,
        data: {
            products: obj
        },
        path: './' + filename,
        type: "stream",
    }
    pdf.create(document, options).toStream((err,res)=>{
        if (err) {

            console.error(err);
            res.status(500);
            res.end(JSON.stringify(err));
      
            return;
          }
      
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=test-file.pdf;');
      
          stream.pipe(res);
    })
}

exports.changeStatus = (req, res) => {
    saleorderModel.findById(req.params.invoiceId,req.params.statusId).then((result) => {
        res.status(200).send(result);
    });
};

//send pdf using email
fs.readFile("E:/syed/nodejs/tasks/mail/mailwithdb/sheet.pdf",function(err,data){
    var mailOptions={
    from:' <mail@gmail.com>',
    to:'mail@gmail.com',
    subject:'Sample mail',
    text:'Hello !!!!!!!!!!!!!',
    attachments:[
    {
        'filename':'sheet.pdf',
         'content': data,
         'contentType':'application/pdf'
    }]
    }
    transporter.sendMail(mailOptions,function(err,res){
    if(err){
        console.log('Error');
    }
    else{
    console.log('Email Sent');
    }
    })
    });