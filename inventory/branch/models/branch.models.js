const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const warehouseSchema = require('../../warehouse/models/warehouse.models');
const userSchema = require('../../users/models/users.model');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const branchSchema = new Schema({
    organizational_ID:{ type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
    warehouse_ID:{ type: Schema.Types.ObjectId, ref: warehouseSchema },
    active: { type: Boolean, default: true },
    branch_name: { type: String },
    email: { type: String, unique: true },
    phone_no: { type: String, unique: true },
    country: { type: String },
    city: { type: String },
    street: { type: String },
},

    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const branch = mongoose.model("branch", branchSchema);
module.exports = branch;

module.exports.createUser = (userData) => {
    const branchs = new branch(userData);
    return branchs.save();
};


module.exports.findById = (itemId) => {
    return branch.findOne({ _id: itemId }).then((result) => {
      if (result === null) {
        return result;
      } else {
        result = result.toJSON();
        delete result.__v;
        return result;
      }
    });
  }

module.exports.patchUser = (id, userData) => {
    return branch.findOneAndUpdate({
        _id: id
    }, userData);
};


module.exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        branch.find()
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
        branch.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};