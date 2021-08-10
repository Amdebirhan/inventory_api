const mongoose = require('../../../common/services/mongoose.service').mongoose;
const roleSchema = require('../../Role/model/role.model');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    roleId: { type: Schema.Types.ObjectId, ref:roleSchema},
    url:[{
      path:{type: String},
      right:{
  create: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
  deny: { type: Boolean, default: false },
      }
    }]
    
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
  //console.log(resourceData);
  const resource = new Resources(resourceData);
  return resource.save();
};

module.exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Resources.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, resources) {
              if (err) {
                  reject(err);
              } else {
                  resolve(resources);
              }
          })
  });
};

module.exports.findByRoleId=(roleId)=>{
  return Resources.findOne({roleId:roleId}).then((result) => {
    if(result === null){
      return result;
    }else{
      result = result.toJSON();
    delete result.url._id;
    delete result.__v;
    return result;
    }
});
}

module.exports.findById = (id) => {
  return Resources.findById(id).then((result) => {
      result = result.toJSON();
      console.log(result)
      delete result.__v;
      return result;
  });
};