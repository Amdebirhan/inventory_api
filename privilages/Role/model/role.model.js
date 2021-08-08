const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const roleSchema = new Schema({
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

module.exports.createRole = (roleData) => {
  const role = new Role(roleData);
  return role.save();
};

module.exports.findById = (id) => {
  return Role.findById(id).then((result) => {
      result = result.toJSON();
      delete result.__v;
      return result;
  });
};

module.exports.patchUser = (id, roleData) => {
  return Role.findOneAndUpdate({
    roleId: id
  }, roleData);
};


module.exports.list = (perPage, page) => {
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

module.exports.removeById = (roleId) => {
  return new Promise((resolve, reject) => {
      Role.deleteMany({roleId: roleId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

module.exports.findByName=(roleName)=>{
  return Role.findOne({name: new RegExp('^'+roleName+'$', "i")}).then((result) => {
    result = result.toJSON();
    delete result.__v;
    return result;
});
}