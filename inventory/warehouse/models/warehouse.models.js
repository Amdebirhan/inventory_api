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
    phone_no: { type: String, unique: true },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String }
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

exports.createWarehouse = (WHData) => {
    const warehouses = new User(WHData);
    return warehouses.save();
  };

  exports.findById = (id) => {
    return warehouse.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchUser = (id, WHData) => {
    return warehouse.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.list = (perPage, page) => {
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

exports.removeById = (userId) => {
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