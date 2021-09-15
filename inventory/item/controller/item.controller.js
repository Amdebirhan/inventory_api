const invoiceModel = require('../../invoice/models/invoice.models');
const User = require('../../users/models/users.model');
const itemModel = require('../models/item.models');
const historyModel = require('../models/itemHistory.models');
const token = require("../../../authorization/middlewares/decodeToken");

exports.insert =async(req, res) => {
console.log(req.body.data[0])

const decoded = await token.decodeToken(req.headers.authorization);
req.body.data[0].organizationalId=decoded.organizationalId;
var id;
    itemModel.createItem(req.body.data[0])
        .then((result) => {
            id= result._id;
            const values = [];
            values.push(result);
            res.status(201).send({values});
        });
        const history = {
            organizationalId:decoded.organizationalId,
            item_ID:id,
                changes: [{
                    quantity:req.body.quantity
            }]
        }
        historyModel.createHistory(history).then((result) => {
              const values = [];
            values.push(result);
            res.status(201).send({values});
        });
};



exports.getById = (req, res) => {
    itemModel.findById(req.params.itemId).then((result) => {
        res.status(200).send(result);
    });
};

exports.patchById = (req, res) => {
    console.log(req.body)
    itemModel.patchUser(req.params.itemId, req.body.data).then((result) => {
        const values = [];
        values.push(result);
        res.status(201).send({values});
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
    itemModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
};

exports.removeById = (req, res) => {
    itemModel.removeById(req.params.itemId)
        .then((result) => {
            res.status(204).send({});
        });
};