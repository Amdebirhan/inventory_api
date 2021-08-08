const { response } = require('express')
const purchaseordermodel = require('../models/purchaseordermodel')

// show the list of suppliers
exports.DisplayPurchaseOrder = async (req, res) => {
    purchaseordermodel.find()
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
    exports.SearchPurchaseOrder = async (req, res) => {
    let purchase_order_ID = req.body.purchase_order_ID
    purchaseordermodel.findById(purchase_order_ID)
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
exports.AddPurchaseOrder = async (req, res) => {
    const purchaseorder = new purchaseordermodel({
        purchase_order_ID: req.body.purchase_order_ID,
        supplier_ID: req.body.supplier_ID,
        warehouse_ID: req.body.warehouse_ID,
        purchase_order_date: req.body.purchase_order_date,
        expected_delivery_date: req.body.expected_delivery_date,
        payment_term: req.body.payment_term,
        due_date: req.body.due_date,
        shipment_type: req.body.shipment_type,
        item_detail: req.body.item_detail,
        price: req.body.price,
        quality: req.body.quality,
        tax: req.body.tax,
        discount: req.body.discount,
        shipment_charge: req.body.shipment_charge,
        total: req.body.total,
        status_ID: req.body.status_ID,
        receivedamount: req.body.recivedamount,
        leftamount: req.body.leftamount,
        
    });
  
    purchaseorder.save()
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
    exports.UpdatePurchaseOrder = async (req, res) => {
    let purchase_order_ID = req.body.purchase_order_ID

    let PurchaseorderupdatedData = {
        purchase_order_ID: req.body.purchase_order_ID,
        supplier_ID: req.body.supplier_ID,
        warehouse_ID: req.body.warehouse_ID,
        purchase_order_date: req.body.purchase_order_date,
        expected_delivery_date: req.body.expected_delivery_date,
        payment_term: req.body.payment_term,
        due_date: req.body.due_date,
        shipment_type: req.body.shipment_type,
        item_detail: req.body.item_detail,
        price: req.body.price,
        quality: req.body.quality,
        tax: req.body.tax,
        discount: req.body.discount,
        shipment_charge: req.body.shipment_charge,
        total: req.body.total,
        status_ID: req.body.status_ID,
        receivedamount: req.body.recivedamount,
        leftamount: (req.body.leftamount)
    }

    purchaseordermodel.findByIdAndUpdate(purchase_order_ID, {$set: PurchaseorderupdatedData})
    .then(response => {
        res.json({
            message: 'Purchase Order Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Data
    exports.DeletePurchaseOrder = async (req, res) => {
    let purchase_order_ID = req.body.purchase_order_ID
    purchaseordermodel.findByIdAndRemove(purchase_order_ID)
    .then(response => {
        res.json({
            message: 'Purchase Order Deleted Successfully!'
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











