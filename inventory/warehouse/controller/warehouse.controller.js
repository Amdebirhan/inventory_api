//add update delete
const warehouseModel = require("../models/warehouse.models");
const branchModel = require("../../branch/models/branch.models");
const itemModel = require("../../item/models/item.models");


exports.insert = (req, res) => {
    warehouseModel.createWarehouse(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };


 exports.getById = (req, res) => {
    warehouseModel.findById(req.params.warehouseId).then((result) => {
        res.status(200).send(result);
    });
 };

 exports.patchById = (req, res) => {
    warehouseModel.patchUser(req.params.warehouseId, req.body).then((result) => {
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
    warehouseModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };


 exports.removeById = (req, res) => {
    branches=branchModel.findOne({warehouse_ID:req.body.warehouseId});
    items=itemModel.findOne({warehouse_ID:req.body.warehouseId});

    if(branches!==null){
        return res.status(400).json({
            error: true,
            message: "can't delete warehouse with branch on it"
          });
        
    }else if( items!== null){
        return res.status(400).json({
            error: true,
            message: "can't delete warehouse with branches and items with it"
          });
    }else{
        warehouseModel.removeById(req.params.warehouseId)
        .then((result)=>{
            res.status(204).send({});
        });
    }
    
 };