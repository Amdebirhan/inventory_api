const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const statusSchema = new Schema({
    organization_ID: { type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
    name:{type: String},
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Status = mongoose.model("status", statusSchema);
module.exports = Status;


module.exports.findById=(statusId)=>{
  return Status.findOne({_id:statusId}).then((result) => {
    if(result === null){
      return result;
    }else{
      result = result.toJSON();
    delete result.__v;
    return result;
    }
});
}



exports.createStatus = (statusData) => {
  const status = new Supplier(statusData);
  return status.save();
};


exports.patchStatus = (id, statusData) => {
  return Status.findOneAndUpdate({
    _id: id
  }, statusData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Status.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      })
  });
};

exports.removeById = (statusId) => {
  return new Promise((resolve, reject) => {
    Status.deleteMany({ _id: statusId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};