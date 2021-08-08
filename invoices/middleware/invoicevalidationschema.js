const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    bill_Id: joi.string().required(),
    purchase_order_Id: joi.string().required(),
    supplier_ID: joi.string().required(),
    branch_ID: joi.string().required(),
    }).unknown();


module.exports = validation_schema;


