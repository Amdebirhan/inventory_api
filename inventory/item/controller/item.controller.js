const invoiceModel = require('../../invoice/models/invoice.models');
const User = require('../../users/models/users.model');
const itemModel = require('../models/item.models');
const historyModel = require('../models/itemHistory.models');

exports.insert = (req, res) => {

    itemModel.createItem(req.body)
        .then((result) => {
            id: result._id;
        });

        const history = {
            organizationalId: req.decoded.organizationalId,
            item_ID:id,
                changes: [{
                    quantity:req.body.quantity
            }]
        }
        historyModel.createHistory(history).then((result) => {
            return res.status(201).send({});
        });
};



exports.getById = (req, res) => {
    itemModel.findById(req.params.itemId).then((result) => {
        res.status(200).send(result);
    });
};

exports.patchById = (req, res) => {
    itemModel.patchUser(req.params.itemId, req.body).then((result) => {
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