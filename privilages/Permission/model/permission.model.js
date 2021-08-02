const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const permissionSchema = new Schema({
    permission_ID: { type: String, unique: true, required: true },
    permissionName: { type: String, required: true },
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
