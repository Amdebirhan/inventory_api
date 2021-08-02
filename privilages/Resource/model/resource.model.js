const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    resource_ID: { type: String, unique: true, required: true },
    resourceName: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Resources = mongoose.model("resource", resourceSchema);
module.exports = Resources;
