<<<<<<< HEAD
const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    supplier_Id: joi.string().required(),
    firstName: joi.string().max(50).required(),
    lastName: joi.string().max(50).required(),
    email: joi.string().email().required(),
    workPhone_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    mobile_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    country: joi.string().max(50).required(),
    }).unknown();


=======
const joi = require("@hapi/joi")

const validation_schema = joi.object({
    
    supplier_Id: joi.string().required(),
    firstName: joi.string().max(50).required(),
    lastName: joi.string().max(50).required(),
    email: joi.string().email().required(),
    workPhone_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    mobile_no: joi.number().integer().min(0000000000).message("Invalid Phone Number!").required(),
    country: joi.string().max(50).required(),
    }).unknown();


>>>>>>> 860a139a3950630af880fdffe5020984be954624
module.exports = validation_schema;