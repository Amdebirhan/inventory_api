const customerModel = require("../models/customer.models"); 

module.exports.insert = (req, res) => {
    console.log(req.body.data[0].id)
    customerModel.createCustomer(req.body.data[0])
        .then((result) => {
            const values = [];
            values.push(result);
            res.status(201).send({values});
        });
 };

 module.exports.getById = (req, res) => {
    customerModel.findById(req.params.customerId).then((result) => {
        res.status(200).send(result);
    });
 };

 module.exports.patchById = (req, res) => {
    console.log(req.body.data)
    customerModel.patchCustomer(req.params.customerId, req.body.data).then((result) => {
        console.log(result)
        const values = [];
        values.push(result);
        res.status(201).send({values});
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
