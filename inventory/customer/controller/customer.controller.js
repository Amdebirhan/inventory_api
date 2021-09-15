const customerModel = require("../models/customer.models"); 
const token= require("../../../authorization/middlewares/decodeToken");

module.exports.insert = async(req, res) => {
    const decoded = await token.decodeToken(req.headers.authorization);
    req.body.data[0].organization_ID=decoded.organizationalId;
    customerModel.createCustomer(req.body.data[0])
        .then((result) => {
            const values = [];
            values.push(result);
            res.status(201).send({values});
        });
 };

 module.exports.getById = (req, res) => {
    customerModel.findById(req.params.customerId).then((result) => {
        res.status(200).send(result);
    });
 };

 module.exports.patchById = (req, res) => {
    console.log(req.body.data)
    customerModel.patchCustomer(req.params.customerId, req.body.data).then((result) => {
        console.log(result)
        const values = [];
        values.push(result);
        res.status(201).send({values});
    });
 };

 module.exports.list = async(req, res) => {
    const decoded = await token.decodeToken(req.headers.authorization);
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    customerModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
 };


 module.exports.removeById = (req, res) => {
     
    customerModel.removeById(req.params.customerId)
        .then((result)=>{
            res.status(204).send({});
        });
 };
