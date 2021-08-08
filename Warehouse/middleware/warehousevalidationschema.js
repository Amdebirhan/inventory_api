const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    warehouse_ID: joi.string().required(),
    warehouse_name: joi.string().max(50).required(),
    email: joi.string().email().required(),
    phone_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    country: joi.string().max(50).required(),
    state: joi.string().max(50).required(),
    city: joi.string().max(50).required(),
    }).unknown();


module.exports = validation_schema;