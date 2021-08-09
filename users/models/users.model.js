const mongoose = require('../../common/services/mongoose.service').mongoose;
const role = require('../../privilages/Role/model/role.model');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  organizationalId: { type: String, },
  warehouseId: { type: String, },
  branchId: { type: String, },
  roleId: { type: String, },
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

exports.findById = (id) => {
  return User.findById(id)
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    });
};

module.exports.findByName = (pathName) => {
  console.log(pathName)
  return User.findOne({ "privilages.path": pathName }).then((result) => {
    return result;
  });
}
module.exports.function = {
  removePermission: function (arr, right, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i].right.deny === value) {
        arr.splice(i, 1);

      }
    }
    console.log(arr);
    //return arr;
  }
}


module.exports.updatePrivilage = (id, privilages) => {

  db.test.update(
    { _id: "777" },
    { $pull: { "someArray.$[elem]": { deny: true } } },
    { arrayFilters: [{ "elem.name": "name1" }] }
  )



  //   User.updateMany({
  //     _id: id
  //   }, {
  //     $pull: {
  //       "privilages.$[privilage]": {"right.deny":true},
  //     },
  //   }, {arrayFilters:[{ "privilage.right.deny": true}], multi: true, upsert: true }, function (err, updatec) {
  //     if (err) {
  //       console.log(err); 
  //     }
  //     else {
  //       console.log("permission updated");
  //     }
  //   })


}



module.exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate({
    _id: id, path
  }, userData);
};

// blog.findByIdAndUpdate(entityId, {$set: {'meta.favs': 56}}, function(err, doc) {
//   console.log(doc);
// });
