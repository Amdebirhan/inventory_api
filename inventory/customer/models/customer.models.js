const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;


const customerSchema = new Schema({
    organization_ID:  {type: Schema.Types.ObjectId, ref:organizationalProfileSchema},
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    work_phone_no: { type: String, unique: true },
    mobile_phone_no: { type: String, unique: true },
    company_Name: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street1: { type: String },
    street2: { type: String },
},

    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const customer = mongoose.model("customer", customerSchema);
module.exports = customer;


exports.createUser = (customerData) => {
  const customers = new customer(customerData);
  return customers.save();
};

exports.findById = (id) => {
  return customer.findById(id).then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
  });
};

exports.patchCustomer = (id, customerData) => {
  return customer.findOneAndUpdate({
      _id: id
  }, customerData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    customer.find()
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

exports.removeById = (customerId) => {
  return new Promise((resolve, reject) => {
    customer.deleteMany({_id: customerId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};