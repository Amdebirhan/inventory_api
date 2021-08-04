const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const urlSchema = new Schema({
  resourceId: { type: String, unique: true},
  path:{ String},
  url: {String},
  
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
},
{ typeKey: '$type' }
);

const resourceSchema = new Schema({
    roleId: { type: String, unique: true},
    right:{
      url:{
        path: [String],
        name: [String],
      }
    },
    
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
  { typeKey: '$type' }
);

const Resources = mongoose.model("resource", resourceSchema);
module.exports = Resources;

module.exports.createResource = (resourceData) => {
  console.log(resourceData);
  const resource = new Resources(resourceData);
  return resource.save();
};

