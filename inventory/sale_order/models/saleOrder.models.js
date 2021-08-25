const customerSchema = require('../../customer/models/customer.models');
const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const branchSchema = require('../../branch/models/branch.models');
const itemSchema = require('../../item/models/item.models');
const userSchema = require('../../users/models/users.model');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const { Double } = require('mongodb');

const saleorderSchema = new Schema({
    organization_ID:{type:Schema.Types.ObjectId,ref:organizationalProfileSchema},
    customer_ID:  { type: Schema.Types.ObjectId, ref: customerSchema },
    branch_ID: { type: Schema.Types.ObjectId, ref: branchSchema },
    item_ID:[{
      id:{type: Schema.Types.ObjectId, ref: itemSchema},
      price:{type: String},
      quantity: {type: String},
    }],
    sales_Person_ID: {type: Schema.Types.ObjectId, ref: userSchema},
    sale_order_date: { type: Date},
    delivery_date: { type: Date},
    payment_term: { type: String},
    shipment_date: { type: Date},
    due_date: { type: String},
    tax: { type: String},
    discount: { type: String},
    shipment_charge: { type: String},
    shippedamount: { type: String},
    leftamount: { type: String},
    status:{
      type: String,
      enum: ['Draft','Sent','Closed','Partly paid','Paid','Canceled'],
      default: 'Draft'
             },
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Saleorder = mongoose.model("sale", saleorderSchema);
module.exports = Saleorder;


module.exports.findById=(saleorderId)=>{
  return Saleorder.findOne({_id:saleorderId}).then((result) => {
    if(result === null){
      return result;
    }else{
      result = result.toJSON();
    delete result.url._id;
    delete result.__v;
    return result;
    }
});
}




module.exports.createSaleorder = (SOData) => {
  const Saleorder = new Purchaseorder(SOData);
  return Saleorder.save();
};

exports.patchSO = (id, SOData) => {
  return Saleorder.findOneAndUpdate({
      _id: id
  }, SOData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Saleorder.find()
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

exports.removeById = (SOId) => {
  return new Promise((resolve, reject) => {
    Saleorder.deleteMany({_id: SOId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};
