const mongoose = require('../../common/services/mongoose.service').mongoose;
const resource = require('../../privilages/Resource/model/resource.model');
const permission = require('../../privilages/Permission/model/permission.model');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    user_ID: { type: String, unique: true, },
    organizational_ID: { type: String,},
    warehouse_ID: { type: String,},
    branch_ID: { type: String,},
    role_ID: { type: String,},
    privilages: [
      { type: Schema.Types.ObjectId, ref:resource },
      { type: Schema.Types.ObjectId, ref: permission },
    ],
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String, unique: true },
    mobile_no: { type: String,unique: true },
    address: { type: String, unique: true },
    active: { type: Boolean, default: false },
    password: { type: String,},
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

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Comparison failed", error);
  }
};


exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.getById = (req, res) => {
  User.findById(req.params.userId).then((result) => {
      res.status(200).send(result);
  });
};