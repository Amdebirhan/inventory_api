//add modify delete
const branchModel = require("../models/branch.models");
const itemModel = require("../../item/models/item.models");

exports.insert = (req, res) => {
    branchModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };

 exports.getById = (req, res) => {
    branchModel.findById(req.params.branchId).then((result) => {
        res.status(200).send(result);
    });
 };

 exports.patchById = (req, res) => {
    branchModel.patchUser(req.params.branchId, req.body).then((result) => {
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
    branchModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };

 exports.removeById = (req, res) => {
    items=itemModel.findOne({branch_ID:req.body.branchId});

    if( items!== null){
        return res.status(400).json({
            error: true,
            message: "can't delete branch with items with it"
          });
    }else{
        branchModel.removeById(req.params.branchId)
        .then((result)=>{
            res.status(204).send({});
        });
    }
 };