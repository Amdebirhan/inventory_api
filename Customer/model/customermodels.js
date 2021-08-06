const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const customerSchema = new Schema({

customer_ID: { type: String, unique: true},
organization_ID: { type: String, unique: true},
first_name: {type: String},
last_name: {type: String},
email: { type: String, unique: true },
phone_no: { type: String, unique: true },
company_Name: { type: String},
//buesiness_location: { type: String},
country: { type: String},
state: {type: String},
city: {type: String},
street1: {type: String},
street2: {type: String},
//zip_code: { type: String, unique: true },



},

{
    timestamps: {
        createdAt: "creayedAt",
        updatedAt: "updatedAt",
    },
}
);
const customer = mongoose.model("customer", customerSchema);
module.exports = customer;