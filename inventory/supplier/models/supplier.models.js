const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const supplierSchema = new Schema({
  organization_ID: { type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
  company_Name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  workPhone_no: { type: String, unique: true },
  mobile_no: { type: String, unique: true },
  country: { type: String, required: true },
  state: { type: String, },
  city: { type: String, },
  street: { type: String, }
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


exports.createSupplier = (supplierData) => {
  const supplier = new Supplier(supplierData);
  return supplier.save();
};

exports.findById = (id) => {
  return Supplier.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.patchCustomer = (id, supplierData) => {
  return Supplier.findOneAndUpdate({
    _id: id
  }, customerData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Supplier.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      })
  });
};

exports.removeById = (supplierId) => {
  return new Promise((resolve, reject) => {
    Supplier.deleteMany({ _id: supplierId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};