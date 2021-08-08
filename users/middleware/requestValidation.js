const Joi = require("joi");

const userSchema = Joi.object().keys({
  organizationalId:Joi.string().min(3).max(30),
  warehouseId:Joi.string().min(3).max(30),
  branchId:Joi.string().min(3).max(30),
  roleId: Joi.string().min(3).max(30),
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
    mobile_no: Joi.string(),
    address: Joi.string(),
    active: Joi.boolean(),
    password: Joi.number(),
  });
  module.exports = userSchema;
