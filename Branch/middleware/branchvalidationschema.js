const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    branch_ID: joi.string().required(),
    warehouse_ID: joi.string().required(),
    user_ID: joi.string().required(),
    branch_name: joi.string().max(50).required(),
    email: joi.string().email().required(),
    phone_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    country: joi.string().max(50).required(),
    region: joi.string().max(50).required(),
    city: joi.string().max(50).required(),
    zip_code: joi.string().required(),
    }).unknown();


module.exports = validation_schema;