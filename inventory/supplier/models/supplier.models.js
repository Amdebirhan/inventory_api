const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const supplierSchema = new Schema({
  organization_ID: { type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
  company_Name: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  work_phone_no: { type: String, unique: true },
  mobile_phone_no: { type: String, unique: true },
  country: { type: String},
  state: { type: String, },
  city: { type: String, },
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


module.exports.createSupplier = (supplierData) => {
  const supplier = new Supplier(supplierData);
  return supplier.save();
};

module.exports.findById = (itemId) => {
  return Supplier.findOne({ _id: itemId }).then((result) => {
    if (result === null) {
      return result;
    } else {
      result = result.toJSON();
      delete result.__v;
      return result;
    }
  });
}

module.exports.patchCustomer = (id, supplierData) => {
  return Supplier.findOneAndUpdate({
    _id: id
  }, supplierData);
};

module.exports.list = (perPage, page) => {
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

module.exports.removeById = (supplierId) => {
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