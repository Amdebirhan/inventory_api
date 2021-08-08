const mongoose = require('../../common/services/mongoose.service').mongoose;
const role = require('../../privilages/Role/model/role.model');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  organizationalId: { type: String, },
  warehouseId: { type: String, },
  branchId: { type: String, },
  roleId: { type: String,},
  privilages: [{
    path: { type: String },
    right: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      deny: { type: Boolean, default: false },
    }
  }],
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  mobile_no: { type: String, unique: true },
  address: { type: String, unique: true },
  active: { type: Boolean, default: false },
  password: { type: String, },
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


module.exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.getById = (req, res) => {
  User.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};


exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate({
      _id: id,path
  }, userData);
};

// blog.findByIdAndUpdate(entityId, {$set: {'meta.favs': 56}}, function(err, doc) {
//   console.log(doc);
// });
