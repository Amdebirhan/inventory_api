const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const OrganizationalProfileSchema = new Schema({
    logo: { data: Buffer, contentType: String },
    organization_Name: { type: String },
    buesiness_location: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    stret1: { type: String },
    contact_first_name: { type: String },
    contact_last_name: { type: String },
    zip_code: { type: String, unique: true },
    contact_email: { type: String, unique: true },
    contact_phone_no: { type: String, unique: true },
    delete_precondition: { type: Date, default: null },
    delete_precondition: { type: Date, default: null },
    active: { type: Boolean, default: true },
},

    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const OrganizationalProfile = mongoose.model("OrganizationalProfile", OrganizationalProfileSchema);
module.exports = OrganizationalProfile;

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

module.exports.findById=(itemId)=>{
    return OrganizationalProfile.findOne({_id:itemId}).then((result) => {
      if(result === null){
        return result;
      }else{
        result = result.toJSON();
      delete result.__v;
      return result;
      }
  });
  }

  exports.patchUser = (id, userData) => {
    return OrganizationalProfile.findOneAndUpdate({
        _id: id
    }, userData);
};


exports.removeById = (userId) => {
    branches=branchModel.findOne({organizational_ID:req.body.organizationId});
    items=itemModel.findOne({organization_ID:req.body.organizationId});
  return new Promise((resolve, reject) => {
    OrganizationalProfile.deleteMany({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};