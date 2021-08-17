//convert invoice to pdf excell 
//print invoice
//send invoice to client

//convert an invoice to excell


//convert an invoice to pdf

//print an invoice

//send invoice to the client

const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');
const saleorderController = require('../../../saleorders/models/saleordermodel');
const invoiceController = require('../../../invoices/models/invoicemodel');

const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

//generate a pdf for invoice
module.exports.generatePdf = async (req, res, next) => {
        const html = fs.readFileSync(path.join(__dirname, '../../../helpers/templates/invoice-single.handlebars'), 'utf-8');
        const filename = Math.random() + '_doc' + '.pdf';
        let array = [];
        //get an invoice id then find a sale order id from the invoice id
        invoice= invoiceController.findById(req.body.invoiceId);
        if(invoice===null){
            res.status(500).json({
                error: true,
                message: "no such invoice in the database",
              });
        }else{
            //geting the invoice data from the database
            detas=saleorderController.findById(invoice.sale_order_ID);
        }
        

        //featch the items data from the database 
        detas.forEach(deta => {
            //data.item_ID = 
            const prod = {
                name: d.name,
                description: d.description,
                unit: d.unit,
                quantity: d.quantity,
                price: d.price,
                total: d.quantity * d.price,
                imgurl: d.imgurl
            }
            array.push(prod);
        });

        let subtotal = 0;
        array.forEach(i => {
            subtotal += i.total
        });
        const tax = (subtotal * 20) / 100;
        const grandtotal = subtotal - tax;
        const obj = {
            prodlist: array,
            subtotal: subtotal,
            tax: tax,
            gtotal: grandtotal
        }
        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './docs/' + filename
        }
        pdf.create(document, options)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
            const filepath = 'http://localhost:3000/docs/' + filename;

            res.render('download', {
                path: filepath
            });
}


module.exports = {
    homeview,
    generatePdf
}




// GET one Product and Export to PDF
router.get("/:id/exportToPDF", check.isValidId, check.rules, async (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    const name = req.body.name;
    const brand = req.body.brand;
    const category = req.body.category;
    const price = req.body.price;
    await product
        .getOneProductExportToPdf(id, description, name, brand, category, price)
        .then(pdfDoc =>{
            // Will get downloaded
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=product.pdf');
            pdfDoc.pipe(res);
            pdfDoc.end();
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

// GET One Product PDF Export
const getOneProductExportToPdf = (id, description, name, brand, category, price) => {
    return new Promise((resolve, reject) => {
        helper
            .mustBeInArray(products, id)
            .then(product => {
                const dd = {
                    content: [
                        { text: "Product Info", style: "header" },
                        { text: `${id}`, style: "subheader" },
                        { text: `${description}`, style: "subheader" },
                        { text: `${name}`, style: "subheader" },
                        { text: `${brand}`, style: "subheader" },
                        { text: `${category}`, style: "subheader" },
                        { text: `${price}`, style: "subheader" }
                    ]
                };

                var fonts = {
                    Roboto: {
                        normal: "Helvetica",
                        bold: "Helvetica-Bold",
                        italics: "Helvetica-Oblique",
                        bolditalics: "Helvetica-BoldOblique"
                    }
                };

                const printer = new PdfPrinter(fonts);

                const pdfDoc = printer.createPdfKitDocument(dd, {})

                resolve(pdfDoc);
            })
            .catch(err => reject(err));
    });
};