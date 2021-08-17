const statusModel = require("../models/status.models"); 

exports.insert = (req, res) => {
    statusModel.createStatus(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };

 exports.getById = (req, res) => {
    statusModel.findById(req.params.statusId).then((result) => {
        res.status(200).send(result);
    });
 };

 exports.patchById = (req, res) => {
    statusModel.patchCustomer(req.params.statusId, req.body).then((result) => {
            res.status(204).send({});
    });
 };

 exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    statusModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };

 exports.removeById = (req, res) => {
    statusModel.removeById(req.params.statusId)
        .then((result)=>{
            res.status(204).send({});
        });
 };