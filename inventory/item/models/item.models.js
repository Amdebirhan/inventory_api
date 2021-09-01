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

},

    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const Item = mongoose.model("item", itemSchema);
module.exports = Item;

module.exports.createItem = (itemData) => {
  const item = new Item(itemData);
  return item.save();
};

module.exports.patchUser = (id, itemData) => {
  return Item.findOneAndUpdate({
      _id: id
  }, itemData);
};

module.exports.findById=(itemId)=>{
    return Item.findOne({_id:itemId}).then((result) => {
      if(result === null){
        return result;
      }else{
        result = result.toJSON();
      delete result.__v;
      return result;
      }
  });
  }

module.exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
      Item.find()
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


module.exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    Item.deleteMany({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};