const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const roleSchema = new Schema({
  role_ID: { type: String, unique: true, required: true},
  createdBy: { type: String, required: true},
  roleName: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Role = mongoose.model("role", roleSchema);
module.exports = Role;

exports.createRole = (roleData) => {
  const Role = new Role(roleData);
  return Role.save();
};

exports.findById = (id) => {
  return Role.findById(id).then((result) => {
      result = result.toJSON();
      delete result.__v;
      return result;
  });
};

exports.patchUser = (id, roleData) => {
  return Role.findOneAndUpdate({
    role_ID: id
  }, roleData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Role.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, roles) {
              if (err) {
                  reject(err);
              } else {
                  resolve(roles);
              }
          })
  });
};

exports.removeById = (roleId) => {
  return new Promise((resolve, reject) => {
      Role.deleteMany({role_ID: roleId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};