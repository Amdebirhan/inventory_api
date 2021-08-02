const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const roleSchema = new Schema({
    role_ID: { type: String, required: true },
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