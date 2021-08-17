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
    user_ID: { type: Schema.Types.ObjectId, ref: userSchema },
    active: { type: Boolean, default: true },
    branch_name: { type: String },
    email: { type: String, unique: true },
    phone_no: { type: String, unique: true },
    country: { type: String },
    region: { type: String },
    city: { type: String },
    street: { type: String },
    zip_code: { type: String, unique: true }
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

exports.createUser = (userData) => {
    const branchs = new branch(userData);
    return branchs.save();
};

exports.findById = (id) => {
    return branch.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchUser = (id, userData) => {
    return branch.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.list = (perPage, page) => {
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

exports.removeById = (userId) => {
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