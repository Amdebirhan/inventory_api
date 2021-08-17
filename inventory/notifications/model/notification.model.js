const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const userSchema = require('../../users/models/users.model');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const notificationSchema = new Schema({
    organization_ID: { type: Schema.Types.String, ref: organizationalProfileSchema },
    user_ID:[{ type: Schema.Types.String, ref: userSchema }],
    about:[{
        collection_name:{ type: String},
        id:{ type: String},
        note:{ type: String},
    }],
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Notification = mongoose.model("status", notificationSchema);
module.exports = Notification;


module.exports.findById=(data)=>{
  return Notification.findOne({_id:datavalidation.userId,organization_ID:data.organizationalId}).then((result) => {
    if(result === null){
      return result;
    }else{
      result = result.toJSON();
    delete result.__v;
    return result;
    }
});
}

exports.createNotification = (Data) => {
  const notification = new Notification(Data);
  return notification.save();
};


exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Notification.find({_id:datavalidation.userId,organization_ID:data.organizationalId})
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