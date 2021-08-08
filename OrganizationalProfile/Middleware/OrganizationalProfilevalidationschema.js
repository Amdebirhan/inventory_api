const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    organization_ID: joi.string().required(),
    contact_first_name: joi.string().max(50).required(),
    contact_last_name: joi.string().max(50).required(),
    contact_email: joi.string().email().required(),
    contact_phone_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    country: joi.string().max(50).required(),
    }).unknown();


module.exports = validation_schema;