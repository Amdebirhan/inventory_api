const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const branchSchema = new Schema({

branch_ID: { type: String, unique: true},
warehouse_ID: { type: String, unique: true},
user_ID: { type: String, unique: true},
branch_name: {type: String},
email: { type: String, unique: true },
phone_no: { type: String, unique: true },
country: { type: String},
region: {type: String},
city: {type: String},
street: { type: String},
zip_code: { type: String, unique: true }
},

{
    timestamps: {
        createdAt: "creayedAt",
        updatedAt: "updatedAt",
    },
}
);
const branch = mongoose.model("branch", branchSchema);
module.exports = branch;