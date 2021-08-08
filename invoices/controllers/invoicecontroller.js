const { response } = require('express')
const invoicemodel = require('../models/invoicemodel')

// show the list of suppliers
exports.DisplayInvoice = async (req, res) => {
    invoicemodel.find()
    .then(response => {
        res.json({
            response
    })
})
    .catch(error => {
        res.json({
            message: 'An error Occurs!'
        })
    })
};

// search by ID (Show single supplier)
    exports.SearchInvoice = async (req, res) => {
    let invoice_ID = req.body.invoice_ID
    invoicemodel.findById(invoice_ID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurs!'
        })
    })
}

// Add data
exports.AddInvoice = async (req, res) => {
    const invoice = new invoicemodel({
        invoice_ID : req.body.invoice_ID,
        customer_ID: req.body.customer_ID,
        sales_person_ID: req.body.sales_person_ID,
        sale_order_ID: req.body.sale_order_ID,
        invoice_date : req.body.invoice_date,
        status_ID: req.body.status_ID,      

    });
  
    invoice.save()
    .then(data => {
        res.json(data)
        })
  
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        });
    }); 
}


// Update supplier using ID
    exports.UpdateInvoice = async (req, res) => {
    let invoice_ID = req.body.invoice_ID

    let InvoiceupdatedData = {
        invoice_ID : req.body.invoice_ID,
        customer_ID: req.body.customer_ID,
        sales_person_ID: req.body.sales_person_ID,
        sale_order_ID: req.body.sale_order_ID,
        invoice_date : req.body.invoice_date,
        status_ID: req.body.status_ID, 
    }

    invoicemodel.findByIdAndUpdate(invoice_ID, {$set: InvoiceupdatedData})
    .then(response => {
        res.json({
            message: 'Invoice Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Data
    exports.DeleteInvoice = async (req, res) => {
    let invoice_ID = req.body.invoice_ID
    invoicemodel.findByIdAndRemove(invoice_ID)
    .then(response => {
        res.json({
            message: 'Invoice Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

/* export functions
module.exports = {
    DisplaySupplier,AddSupplier,SearchSupplier,UpdateSupplier,DeleteSupplier
}*/











