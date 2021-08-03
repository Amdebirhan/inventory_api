const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');


const supplierSchema = new Schema({
    supplier_ID: { type: String, unique: true, required: true },
    organizational_ID: { type: String, required: true },
    company_Name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String},
    email: { type: String, required: true, unique: true },
    workPhone_no: { type: String, required: true, unique: true },
    mobile_no: { type: String, required: true, unique: true },
    country: { type: String, required: true, unique: true },
    state: { type: String, required: true, unique: true },
    city: { type: String, required: true, unique: true },
    street: { type: String, required: true, unique: true }
  },

  { timestamps:true}

);
const Supplier = mongoose.model("supplier", supplierSchema);
module.exports = Supplier;

