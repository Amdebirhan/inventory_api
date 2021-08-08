<<<<<<< HEAD
const { response } = require('express')
const saleordermodel = require('../models/saleordermodel')

// show the list of suppliers
exports.DisplaySaleOrder = async (req, res) => {
    saleordermodel.find()
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
    exports.SearchSaleeOrder = async (req, res) => {
    let sale_order_ID = req.body.sale_order_ID
    saleordermodel.findById(sale_order_ID)
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
exports.AddSaleOrder = async (req, res) => {
    const saleorder = new saleordermodel({
        sale_order_ID: req.body.sale_order_ID,
        customer_ID: req.body.customer_ID,
        branch_ID: req.body.branch_ID,
        item_ID: req.body.item_ID,
        sales_Person_ID: req.body.sales_Person_ID,
        sale_order_date: req.body.sale_order_date,
        delivery_date: req.body.delivery_date,
        payment_term: req.body.payment_term,
        shipment_date: req.body.shipment_date,
        due_date: req.body.due_date,
        price: req.body.price,
        quality: req.body.quality,
        tax: req.body.tax,
        discount: req.body.discount,
        shipment_charge: req.body.shipment_charge,
        total: req.body.total,
        status_ID: req.body.status_ID,
        shippedamount: req.body.shippedamount,
        leftamount: req.body.leftamount

    });
  
    saleorder.save()
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
    exports.SaleOrder = async (req, res) => {
    let sale_order_ID = req.body.sale_order_ID

    let SaleorderupdatedData = {
        sale_order_ID: req.body.sale_order_ID,
        customer_ID: req.body.customer_ID,
        branch_ID: req.body.branch_ID,
        item_ID: req.body.item_ID,
        sales_Person_ID: req.body.sales_Person_ID,
        sale_order_date: req.body.sale_order_date,
        delivery_date: req.body.delivery_date,
        payment_term: req.body.payment_term,
        shipment_date: req.body.shipment_date,
        due_date: req.body.due_date,
        price: req.body.price,
        quality: req.body.quality,
        tax: req.body.tax,
        discount: req.body.discount,
        shipment_charge: req.body.shipment_charge,
        total: req.body.total,
        status_ID: req.body.status_ID,
        shippedamount: req.body.shippedamount,
        leftamount: req.body.leftamount
    }

    saleordermodel.findByIdAndUpdate(sale_order_ID, {$set: SaleorderupdatedData})
    .then(response => {
        res.json({
            message: 'Sale Order Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Data
    exports.SaleOrder = async (req, res) => {
    let sale_order_ID = req.body.sale_order_ID
    saleordermodel.findByIdAndRemove(sale_order_ID)
    .then(response => {
        res.json({
            message: 'Sale Order Deleted Successfully!'
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











=======
const { response } = require('express')
const saleordermodel = require('../models/saleordermodel')

// show the list of suppliers
exports.DisplaySaleOrder = async (req, res) => {
    saleordermodel.find()
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
    exports.SearchSaleeOrder = async (req, res) => {
    let sale_order_ID = req.body.sale_order_ID
    saleordermodel.findById(sale_order_ID)
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
exports.AddSaleOrder = async (req, res) => {
    const saleorder = new saleordermodel({
        sale_order_ID: req.body.sale_order_ID,
        customer_ID: req.body.customer_ID,
        branch_ID: req.body.branch_ID,
        item_ID: req.body.item_ID,
        sales_Person_ID: req.body.sales_Person_ID,
        sale_order_date: req.body.sale_order_date,
        delivery_date: req.body.delivery_date,
        payment_term: req.body.payment_term,
        shipment_date: req.body.shipment_date,
        due_date: req.body.due_date,
        price: req.body.price,
        quality: req.body.quality,
        tax: req.body.tax,
        discount: req.body.discount,
        shipment_charge: req.body.shipment_charge,
        total: req.body.total,
        status_ID: req.body.status_ID,
        shippedamount: req.body.shippedamount,
        leftamount: req.body.leftamount

    });
  
    saleorder.save()
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
    exports.SaleOrder = async (req, res) => {
    let sale_order_ID = req.body.sale_order_ID

    let SaleorderupdatedData = {
        sale_order_ID: req.body.sale_order_ID,
        customer_ID: req.body.customer_ID,
        branch_ID: req.body.branch_ID,
        item_ID: req.body.item_ID,
        sales_Person_ID: req.body.sales_Person_ID,
        sale_order_date: req.body.sale_order_date,
        delivery_date: req.body.delivery_date,
        payment_term: req.body.payment_term,
        shipment_date: req.body.shipment_date,
        due_date: req.body.due_date,
        price: req.body.price,
        quality: req.body.quality,
        tax: req.body.tax,
        discount: req.body.discount,
        shipment_charge: req.body.shipment_charge,
        total: req.body.total,
        status_ID: req.body.status_ID,
        shippedamount: req.body.shippedamount,
        leftamount: req.body.leftamount
    }

    saleordermodel.findByIdAndUpdate(sale_order_ID, {$set: SaleorderupdatedData})
    .then(response => {
        res.json({
            message: 'Sale Order Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Data
    exports.SaleOrder = async (req, res) => {
    let sale_order_ID = req.body.sale_order_ID
    saleordermodel.findByIdAndRemove(sale_order_ID)
    .then(response => {
        res.json({
            message: 'Sale Order Deleted Successfully!'
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











>>>>>>> 860a139a3950630af880fdffe5020984be954624
