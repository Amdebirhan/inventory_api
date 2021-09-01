const supplierModel = require("../models/supplier.models"); 

module.exports.insert = (req, res) => {
    supplierModel.createSupplier(req.body)
        .then((result) => {
            const values = [];
            values.push(result);
            res.status(201).send({values});
        });
 };


module.exports.getById = (req, res) => {
    supplierModel.findById(req.params.supplierId).then((result) => {
        res.status(200).send(result);
    });
 };

 exports.patchById = (req, res) => {
    supplierModel.patchCustomer(req.params.supplierId, req.body).then((result) => {
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
    supplierModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };

module.exports.removeById = (req, res) => {
    supplierModel.removeById(req.params.supplierId)
        .then((result)=>{
            const values = [];
            values.push(result);
            res.status(204).send({values});
        });
 };