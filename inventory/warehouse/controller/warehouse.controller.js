//add update delete
const warehouseModel = require("../models/warehouse.models");
const branchModel = require("../../branch/models/branch.models");
const itemModel = require("../../item/models/item.models");


module.exports.insert = (req, res) => {
    console.log(req.body)
    warehouseModel.createWarehouse(req.body.data[0])
        .then((result) => {
            const values = [];
            values.push(result);
            res.status(201).send({values});
        });
 };


module.exports.getById = (req, res) => {
    warehouseModel.findById(req.params.warehouseId).then((result) => {
        res.status(200).send(result);
    });
 };

module.exports.patchById = (req, res) => {
    warehouseModel.patchUser(req.params.warehouseId, req.body.data).then((result) => {
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
    warehouseModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };


module.exports.removeById = (req, res) => {
    branches=branchModel.findOne({warehouse_ID:req.body.warehouseId});
    items=itemModel.findOne({warehouse_ID:req.body.warehouseId});

    if(branches){
        return res.status(400).json({
            error: true,
            message: "can't delete warehouse with branch on it"
          });
        
    }else if(items){
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