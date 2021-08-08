const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    purchase_order_Id: joi.string().required(),
    supplier_ID: joi.string().required(),
    warehouse_ID: joi.string().required(),
    price: joi.number().required(),
    quality: joi.number().required(),
    tax: joi.number().required(),
    total: joi.number().required(),
    }).unknown();


module.exports = validation_schema;


