const joi = require("@hapi/joi")

const schema = {

    user: joi.object({
    
    firstName: joi.string().max(50).required(),
    lastName: joi.string().max(50).required(),
    email: joi.string().email().required(),
    workPhone_no: joi.number().integer().min(100000000).message("Invalid Phone Number!").max(9999999999).message("Invalid Phone Number"),
    mobile_no: joi.number().integer().min(100000000).message("Invalid Phone Number!").max(9999999999).message("Invalid Phone Number").required(),
    country: joi.string().max(50).required(),
    
    }) 



}