const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const warehouseSchema = require('../../warehouse/models/warehouse.models');
const branchSchema = require('../../branch/models/branch.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const itemSchema = new Schema({
    organization_ID: {type: Schema.Types.ObjectId, ref:organizationalProfileSchema},
    warehouse_ID:{type: Schema.Types.ObjectId, ref:warehouseSchema},
    branch_ID: {type: Schema.Types.ObjectId, ref:branchSchema},
    name: { type: String },
    suk: { type: String },
    unit: { type: String, unique: true },
    price: { type: String, unique: true },
    description: { type: String, unique: true },
    quantity: { type: String },
    available: { type: String },
    statusId: { type: String },
    productionDate: { type: String },
    expiryDate: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
    createdBy: { type: String },

},

    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const item = mongoose.model("item", itemSchema);
module.exports = item;

exports.createItem = (itemData) => {
  const item = new item(itemData);
  return item.save();
};

exports.patchUser = (id, itemData) => {
  return item.findOneAndUpdate({
      _id: id
  }, userData);
};

module.exports.findById=(itemId)=>{
    return item.findOne({_id:itemId}).then((result) => {
      if(result === null){
        return result;
      }else{
        result = result.toJSON();
      delete result.__v;
      return result;
      }
  });
  }

  exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
      item.find()
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
    item.deleteMany({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};