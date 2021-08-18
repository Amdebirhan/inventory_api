const purchaseorderModel = require('../models/purchaseOrder.models');
const billModel = require('../../bill/models/bill.models');
const User = require('../../users/models/users.model');
const itemModel = require('../../item/models/item.models');
const historyModel = require('../../item/models/itemHistory.models');
const validateSchema = require('../middlewares/purchaseOrder.middleware');

exports.insertPO = async (req, res) => {
    try {
        result = validateSchema.datavalidation(req.body);
        userId = req.decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "account not found"
            })
        }

        const newpurchaseorder = new purchaseorderModel(result.value);
        await newpurchaseorder.save();

        return res.status(200).json({
            success: true,
            message: "purchaseorder saved Success",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't insert purchaseorder. Please try again later.",
        });
    }
}

//insert PO to bill
exports.convertPOToBill = async (req, res) => {
    try {
        result = validateSchema.datavalidation(req.body);
        const newbill = new billModel(result.value);
        await newbill.save();

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't convert to bill. Please try again later.",
        });
    }
}

//update the po table
exports.updatePO = async (req,res)=>{
    purchaseorderModel.patchPO(req.params.POId, req.body).then((result) => {
        res.status(204).send({});
});
}

//list all POs
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    purchaseorderModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };   

 //half recived po 
 exports.halfRecived = (req,res)=>{
    result=purchaseorderModel.findById(req.params.POId);
    for (let i = 0; i < result.itemId.length; i++) {
        const item = itemModel.findOne({ _id: itemId });
        recivedamount =  result.itemId[i].leftamount - req.body.item[i].recivedAmount;
        leftAmount = result.itemId[i].quantity - (result.itemId[i].recivedamount + recivedAmount ); 
        curentOnHand = item.quantity+req.body.item[i].recivedAmount;
        const history = {
            organization_ID: req.decoded.organizationalId,
            item_ID:itemId,
                changes: [{
                    quantity:curentOnHand
            }]
        }

        historyModel.createHistory(history)

        itemModel.updateMany({ "_id":result.itemId[i].id}, { "$set": { "quantity": curentOnHand } });
        purchaseorderModel.updateMany({ "_id":result._id}, { "$set": { "itemId[i].recivedamount": recivedamount,"itemId[i].leftamount": leftAmount, } });
    }
    
    purchaseorderModel.updateMany({ "_id":result._id}, { "$set": { "status": "half Received" } });

 }

  //fully received po 
  exports.Recived = (req,res)=>{
    result=purchaseorderModel.findById(req.params.POId);
    for (let i = 0; i < result.itemId.length; i++) {
        const item = itemModel.findOne({ _id: itemId });
        recivedamount =  result.itemId[i].quantity;
        leftAmount =recivedAmount - result.itemId[i].quantity; 
        curentOnHand = item.quantity+req.body.item[i].recivedAmount;
        const history = {
            organization_ID: req.decoded.organizationalId,
            item_ID:itemId,
                changes: [{
                    quantity:curentOnHand
            }]
        }

        historyModel.createHistory(history)

        itemModel.updateMany({ "_id":result.itemId[i].id}, { "$set": { "quantity": curentOnHand } });
        purchaseorderModel.updateMany({ "_id":result._id}, { "$set": { "itemId[i].recivedamount": recivedamount,"itemId[i].leftamount": leftAmount, } });
    }

     purchaseorderModel.updateMany({ "_id":result._id}, { "$set": { "status": "Received" } });

 }

 //cancelled PO
 exports.removeById = (req, res) => {
    purchaseorderModel.removeById(req.params.POId)
        .then((result)=>{
            res.status(204).send({});
        });
 };

 exports.getById = (req, res) => {
    purchaseorderModel.findById(req.params.POId).then((result) => {
        res.status(200).send(result);
    });
 };