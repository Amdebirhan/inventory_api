const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const OrganizationalProfileSchema = new Schema({

organization_ID: { type: String, unique: true},
organization_Name: { type: String},
buesiness_location: { type: String},
country: { type: String},
state: {type: String},
city: {type: String},
stret1: {type: String},
contact_first_name: {type: String},
contact_last_name: {type: String},
zip_code: { type: String, unique: true },
contact_email: { type: String, unique: true },
contact_phone_no: { type: String, unique: true },


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