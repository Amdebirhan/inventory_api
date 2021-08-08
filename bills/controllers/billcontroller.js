<<<<<<< HEAD
const { response } = require('express')
const billmodel = require('../models/billmodel')

// show the list of suppliers
exports.DisplayBill = async (req, res) => {
    billmodel.find()
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
    exports.SearchBill = async (req, res) => {
    let bill_ID = req.body.bill_ID
    billmodel.findById(bill_ID)
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
exports.AddBill = async (req, res) => {
    const bill = new billmodel({
        bill_ID : req.body.bill_ID,
        purchase_order_ID: req.body.purchase_order_ID,
        supplier_ID: req.body.supplier_ID,
        warehouse_ID: req.body.warehouse_ID,
        bill_date : req.body.bill_date,
        status_ID: req.body.status_ID
        
    });
  
    bill.save()
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
    exports.UpdateBill = async (req, res) => {
    let bill_ID = req.body.bill_ID

    let BillupdatedData = {
        bill_ID : req.body.bill_ID,
        purchase_order_ID: req.body.purchase_order_ID,
        supplier_ID: req.body.supplier_ID,
        warehouse_ID: req.body.warehouse_ID,
        status_ID: req.body.status_ID,
        bill_date : req.body.bill_date
    }

    billmodel.findByIdAndUpdate(bill_ID, {$set: BillupdatedData})
    .then(response => {
        res.json({
            message: 'Bill Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Data
    exports.DeleteBill = async (req, res) => {
    let bill_ID = req.body.bill_ID
    billmodel.findByIdAndRemove(bill_ID)
    .then(response => {
        res.json({
            message: 'Bill Deleted Successfully!'
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
const billmodel = require('../models/billmodel')

// show the list of suppliers
exports.DisplayBill = async (req, res) => {
    billmodel.find()
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
    exports.SearchBill = async (req, res) => {
    let bill_ID = req.body.bill_ID
    billmodel.findById(bill_ID)
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
exports.AddBill = async (req, res) => {
    const bill = new billmodel({
        bill_ID : req.body.bill_ID,
        purchase_order_ID: req.body.purchase_order_ID,
        supplier_ID: req.body.supplier_ID,
        warehouse_ID: req.body.warehouse_ID,
        bill_date : req.body.bill_date,
        status_ID: req.body.status_ID
        
    });
  
    bill.save()
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
    exports.UpdateBill = async (req, res) => {
    let bill_ID = req.body.bill_ID

    let BillupdatedData = {
        bill_ID : req.body.bill_ID,
        purchase_order_ID: req.body.purchase_order_ID,
        supplier_ID: req.body.supplier_ID,
        warehouse_ID: req.body.warehouse_ID,
        status_ID: req.body.status_ID,
        bill_date : req.body.bill_date
    }

    billmodel.findByIdAndUpdate(bill_ID, {$set: BillupdatedData})
    .then(response => {
        res.json({
            message: 'Bill Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Data
    exports.DeleteBill = async (req, res) => {
    let bill_ID = req.body.bill_ID
    billmodel.findByIdAndRemove(bill_ID)
    .then(response => {
        res.json({
            message: 'Bill Deleted Successfully!'
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
