const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const billSchema = new Schema({
    bill_ID : { type: String, unique: true },
    purchase_order_ID: { type: String },
    supplier_ID: { type: String},
    warehouse_ID: { type: String },
    bill_date:{ type: Date},
    status_ID: { type: String},  
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Bill = mongoose.model("bill", billSchema);
module.exports = Bill;

