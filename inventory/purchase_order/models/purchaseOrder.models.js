const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const warehouseSchema = require('../../warehouse/models/warehouse.models');
const supplierSchema = require('../../supplier/models/supplier.models');
const itemSchema = require('../../item/models/item.models');
const branchSchema = require('../../branch/models/branch.models');
const statusSchema = require('../../status/models/status.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const purchaseorderSchema = new Schema({
  organizationalId: { type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
  supplierId: { type: Schema.Types.ObjectId, ref: supplierSchema },
  warehouseId: { type: Schema.Types.ObjectId, ref: warehouseSchema },
  branchId: { type: Schema.Types.ObjectId, ref: branchSchema },
  itemId:[{
    id:{type: Schema.Types.ObjectId, ref: itemSchema},
  }],
  purchase_order_date: { type: Date },
  expected_delivery_date: { type: Date },
  payment_term: { type: String },
  due_date: { type: String },
  shipment_type: { type: String },
  price: { type: String },
  quantity: { type: String },
  tax: { type: String },
  discount: { type: String },
  shipment_charge: { type: String },
  statusId: { type: Schema.Types.ObjectId, ref: statusSchema },
  recivedamount: { type: String },
  leftamount: { type: String }
},

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Purchaseorder = mongoose.model("purchase", purchaseorderSchema);
module.exports = Purchaseorder;


module.exports.createPurchaseorder = (userData) => {
  const purchaseorder = new Purchaseorder(userData);
  return purchaseorder.save();
};

exports.patchPO = (id, userData) => {
  return Purchaseorder.findOneAndUpdate({
      _id: id
  }, userData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Purchaseorder.find()
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

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    Purchaseorder.deleteMany({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findById = (id) => {
  return Purchaseorder.findById(id).then((result) => {
      result = result.toJSON();
      delete result.__v;
      return result;
  });
};