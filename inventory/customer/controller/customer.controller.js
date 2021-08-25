const customerModel = require("../models/customer.models"); 

module.exports.insert = (req, res) => {
    customerModel.createCustomer(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };

 module.exports.getById = (req, res) => {
    customerModel.findById(req.params.customerId).then((result) => {
        res.status(200).send(result);
    });
 };

 module.exports.patchById = (req, res) => {
    customerModel.patchCustomer(req.params.customerId, req.body).then((result) => {
            res.status(204).send({});
    });
 };

 module.exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    customerModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };

 module.exports.removeById = (req, res) => {
    customerModel.removeById(req.params.customerId)
        .then((result)=>{
            res.status(204).send({});
        });
 };
