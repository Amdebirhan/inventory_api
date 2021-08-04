const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const permissionSchema = new Schema({
  permissionId: { type: String, unique: true, required: true },
  userId: { type: String, unique: true, required: true },
  resorceId: { type: String, unique: true, required: true },
    rights:[{
      name: String,
      active: Boolean,
    }]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Permissions = mongoose.model("permission", permissionSchema);
module.exports = Permissions;

module.exports.createPermission = (permissionData) => {
  const permission = new Permissions(permissionData);
  return permission.save();
};

module.exports.patchUser = (id, permissionData) => {
  return Role.findOneAndUpdate({
    userId: id
  }, permissionData);
};