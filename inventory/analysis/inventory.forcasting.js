const saleorderModel = require('models/saleOrder.models');
const invoiceModel = require('../invoice/models/invoice.models');
const User = require('../users/models/users.model');
const itemModel = require('../item/models/item.models');
const sendEmail = require("../helpers/mailler");

exports.insertSO = async (req, res) => {
    try {
        
       
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

//deleteSO
exports.removeById = (req, res) => {
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

