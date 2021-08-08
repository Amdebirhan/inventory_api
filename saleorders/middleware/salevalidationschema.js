<<<<<<< HEAD
const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    sale_order_Id: joi.string().required(),
    customer_ID: joi.string().required(),
    branch_ID: joi.string().required(),
    price: joi.number().required(),
    quality: joi.number().required(),
    tax: joi.number().required(),
    total: joi.number().required(),
    }).unknown();


module.exports = validation_schema;


=======
const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    sale_order_Id: joi.string().required(),
    customer_ID: joi.string().required(),
    branch_ID: joi.string().required(),
    price: joi.number().required(),
    quality: joi.number().required(),
    tax: joi.number().required(),
    total: joi.number().required(),
    }).unknown();


module.exports = validation_schema;


>>>>>>> 860a139a3950630af880fdffe5020984be954624
