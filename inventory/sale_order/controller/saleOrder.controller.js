const saleorderModel = require('../models/saleOrder.models');
const invoiceModel = require('../../invoice/models/invoice.models');
const User = require('../../users/models/users.model');
const itemModel = require('../../item/models/item.models');
const historyModel = require('../../item/models/itemHistory.models');
const sendEmail = require("../../helpers/mailler");
const validateSchema = require('../middlewares/saleOrder.middleware');

exports.insertSO = async (req, res) => {
    console.log(req.body.data)
    try {
        //grab every item id and decrease there quantity from the db then create SO
        //result = validateSchema.datavalidation(req.body);

        for (let i = 0; i < result.value.itemId.length; i++) {
            const item = itemModel.findOne({ _id: itemId });
            itemQuantity = item.quantity - result.value.itemId[i].quantity;
            const history = {
                organization_ID: req.decoded.organizationalId,
                item_ID:itemId,
                    changes: [{
                        quantity:itemQuantity
                }]
            }

            historyModel.createHistory(history)

            itemModel.updateMany({ "_id": result.value.itemId[i].id }, { "$set": { "quantity": itemQuantity } }, callback);
        }

        
        

        
        //check for notification to do that we need to check every thing 
        userId = req.decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "account not found"
            })
        }

        const newSO = new saleorderModel(result.value);
        await newSO.save();

        return res.status(200).json({
            success: true,
            message: "purchaseorder saved Success",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't insert saleorder. Please try again later.",
        });
    }
}

//insert SO to bill
exports.convertSOToInvoice = async (req, res) => {
    try {
        result = validateSchema.datavalidation(req.body);
        const newinvoice = new invoiceModel(result.value);
        await newinvoice.save();

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't convert to invoice. Please try again later.",
        });
    }
}

//update the SO table
exports.updateSO = async (req, res) => {
    saleorderModel.patchSO(req.params.SOId, req.body).then((result) => {
        res.status(204).send({});
    });
}

//list all SOs
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    saleorderModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
};

//can not delete a SO only make the status cancelled

exports.removeById = (req, res) => {
    //first get the so
    //loop and update the item,history and status
    result = saleorderModel.findById(req.body.SOId);
    for (let i = 0; i < result.itemId.length; i++) {
        const item = itemModel.findOne({ _id: itemId });
        itemQuantity = item.quantity + result.value.itemId[i].quantity;
        const history = {
            organization_ID: req.decoded.organizationalId,
            item_ID:itemId,
                changes: [{
                    quantity:itemQuantity
            }]
        }

        historyModel.createHistory(history)

        itemModel.updateMany({ "_id": req.body.SOId }, { "$set": { "quantity": itemQuantity } }, callback);
    }
    saleorderModel.updateMany({ "_id": result.value.itemId[i].id }, { "$set": { "status": "cancelled" } });
    saleorderModel.removeById(req.params.SOId)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.getById = (req, res) => {
    saleorderModel.findById(req.params.SOId).then((result) => {
        res.status(200).send(result);
    });
};

