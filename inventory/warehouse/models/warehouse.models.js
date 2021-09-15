const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;


const Joi = require('joi');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const warehouseSchema = new Schema({
    organization_ID: { type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
    warehouse_name: { type: String },
    active: { type: Boolean, default: true },
    email: { type: String, unique: true },
    mobile_phone_no: { type: String, unique: true },
    country: { type: String },
    state: { type: String },
    city: { type: String },
},

    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const warehouse = mongoose.model("warehouse", warehouseSchema);
module.exports = warehouse;

module.exports.createWarehouse = (WHData) => {
    const warehouses = new warehouse(WHData);
    return warehouses.save();
  };

module.exports.findById = (itemId) => {
    return warehouse.findOne({ _id: itemId }).then((result) => {
      if (result === null) {
        return result;
      } else {
        result = result.toJSON();
        delete result.__v;
        return result;
      }
    });
  }

module.exports.patchUser = (id, WHData) => {
    return warehouse.findOneAndUpdate({
        _id: id
    }, WHData);
};

module.exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        warehouse.find()
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
        warehouse.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};