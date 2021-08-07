const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const supplierSchema = new Schema({
    supplier_ID: { type: String, unique: true },
    organizational_ID: { type: String},
    company_Name: { type: String },
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String, unique: true },
    workPhone_no: { type: String, unique: true },
    mobile_no: { type: String,  unique: true },
    country: { type: String,  required: true },
    state: { type: String,  },
    city: { type: String,  },
    street: { type: String,}
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Supplier = mongoose.model("supplier", supplierSchema);
module.exports = Supplier;

