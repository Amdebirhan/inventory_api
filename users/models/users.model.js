const mongoose = require('../../common/services/mongoose.service').mongoose;
const resource = require('../../privilages/Resource/model/resource.model');
const permission = require('../../privilages/Permission/model/permission.model');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    user_ID: { type: String, unique: true, required: true },
    organizational_ID: { type: String, required: true },
    warehouse_ID: { type: String, required: true },
    branch_ID: { type: String, required: true },
    role_ID: { type: String, required: true },
    privilages: [
      {
      resource:[resource],
      permission:[permission]
      }
    ],
    firstName: { type: String, required: true },
    lastName: { type: String},
    email: { type: String, required: true, unique: true },
    mobile_no: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    active: { type: Boolean, default: false },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    emailToken: { type: String, default: null }, 
    emailTokenExpires: { type: Date, default: null },
    accessToken: { type: String, default: null }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const User = mongoose.model("user", userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // 10 rounds
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};
