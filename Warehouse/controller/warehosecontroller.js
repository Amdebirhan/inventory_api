const { response } = require('express')
const suppliermodel = require('../models/warehousemodel')


exports.Displaywarehouse = async (req, res) => {
    warehousemodel.find()
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

// search by ID (Show single warehouse)
    exports.Searchwarehouse = async (req, res) => {
    let warehouse_ID = req.body.warehouse_ID
    warehousemodel.findById(warehouse_ID)
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

// Add warehouses
exports.Addwarehouse = async (req, res) => {
//const Addwarehouse = (req, res, next ) => {
    const warehouse = new warehousemodel({
        warehouse_ID: req.body.warehouse_ID,
        organizational_ID: req.body.organizational_ID,
        warehouse_name: req.body.warehouse_name,
        email: req.body.email,
        phone_no: req.phone_no,
        country:req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street
    });
  
    warehouse.save()
    .then(data => {
        res.json(data)
        })
  
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        });
    }); 
}


// Update warehouse using unique warehouse ID
    exports.Updatewarehouse = async (req, res) => {
    let warehouse_ID = req.body.warehouse_ID

    let warehouseupdatedData = {
        warehouse_ID: req.body.warehouse_ID,
        organizational_ID: req.body.organizational_ID,
        warehouse_Name: req.body.warehouse_Name,
        email: req.body.email,
        phone_no: req.phone_no,
        country:req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street
    }

    warehousemodel.findByIdAndUpdate(warehouse_ID, {$set: warehouseupdatedData})
    .then(response => {
        res.json({
            message: 'warehouse Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}

// Delete a specific warehouse
    exports.Deletewarehouse = async (req, res) => {
    let swarehouse_ID = req.body.warehouse_ID
    warehousemodel.findByIdAndRemove(warehouse_ID)
    .then(response => {
        res.json({
            message: 'warehouse Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}
