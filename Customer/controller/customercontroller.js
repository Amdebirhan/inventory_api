const { response } = require('express')
const model = require('../models/customermodel')
exports.Displaycustomer = async (req, res) => {
    customermodel.find()
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
// search by ID (Show single customer)
exports.Searchcustomer = async (req, res) => {
    let customer_ID = req.body.customer_ID
    customermodel.findById(customer_ID)
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
// Add new customer
exports.Addcustomer = async (req, res) => {
        const customer = new customermodel({
            customer_ID: req.body.customer_ID,
            company_Name: req.body.company_Name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            country:req.body.country,
            state: req.body.state,
            city: req.body.city,
            street1: req.body.stret1,
            street2: req.body.stret2
        });
        customer.save()
        .then(data => {
            res.json(data)
            })
        .catch(error => {
            res.json({
                message: 'An error occurs!'
            });
        }); 
    }
    // Update the existing customers information using ID
  exports.Updatecustomer = async (req, res) => {
    let customer_ID = req.body.customer_ID
    let customerupdatedData = {
        customer_ID: req.body.customer_ID,
        company_Name: req.body.company_Name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        country:req.body.country,
        state: req.body.state,
        city: req.body.city,
        street1: req.body.stret1,
        street2: req.body.stret2
    }
    customermodel.findByIdAndUpdate(customer_ID, {$set: customerupdatedData})
    .then(response => {
        res.json({
            message: 'customer Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}     
// Delete customers 
    exports.Deletecustomer = async (req, res) => {
    let customer_ID = req.body.customer_ID
    customermodel.findByIdAndRemove(customer_ID)
    .then(response => {
        res.json({
            message: 'customer Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurs!'
        })
    })
}