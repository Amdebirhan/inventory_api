const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const warehouseSchema = new Schema({

warehouse_ID: { type: String, unique: true},
organization_ID: { type: String, unique: true},
warehouse_name: {type: String},
email: { type: String, unique: true },
phone_no: { type: String, unique: true },
country: { type: String},
state: {type: String},
city: {type: String},
street: { type: String}
},

{
    timestamps: {
        createdAt: "creayedAt",
        updatedAt: "updatedAt",
    },
}
);
const warehouse = mongoose.model("warehouse", warehouseSchema);
module.exports = warehouse;