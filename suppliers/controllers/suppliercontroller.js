const { response } = require('express')
const suppliermodel = require('../models/suppliermodel')

// show the list of suppliers
exports.DisplaySupplier = async (req, res) => {
    suppliermodel.find()
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
    exports.SearchSupplier = async (req, res) => {
    let supplier_ID = req.body.supplier_ID
    suppliermodel.findById(supplier_ID)
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

// Add supplier
exports.AddSupplier = async (req, res) => {
//const AddSupplier = (req, res, next ) => {
    const supplier = new suppliermodel({
        upplier_ID: req.body.supplier_ID,
        organizational_ID: req.body.organizational_ID,
        company_Name: req.body.company_Name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        workPhone_no: req.workPhone_no,
        mobile_no: req.body.mobile_no,
        country:req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street
    });
  
    supplier.save()
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
    exports.UpdateSupplier = async (req, res) => {
    let supplier_ID = req.body.supplier_ID

    let SupplierupdatedData = {
        supplier_ID: req.body.supplier_ID,
        organizational_ID: req.body.organizational_ID,
        company_Name: req.body.company_Name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        workPhone_no: req.workPhone_no,
        mobile_no: req.body.mobile_no,
        country:req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street
    }

    suppliermodel.findByIdAndUpdate(supplier_ID, {$set: SupplierupdatedData})
    .then(response => {
        res.json({
            message: 'Supplier Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete Supplier
    exports.DeleteSupplier = async (req, res) => {
    let supplier_ID = req.body.supplier_ID
    suppliermodel.findByIdAndRemove(supplier_ID)
    .then(response => {
        res.json({
            message: 'Supplier Deleted Successfully!'
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






































