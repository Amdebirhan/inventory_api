const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const saleorderSchema = new Schema({
    sale_order_ID: { type: String, unique: true },
    customer_ID: { type: String},
    branch_ID: { type: String },
    item_ID: { type: String},
    sales_Person_ID: { type: String},
    sale_order_date: { type: Date},
    delivery_date: { type: Date},
    payment_term: { type: String},
    shipment_date: { type: Date},
    due_date: { type: String},
    price: { type: String},
    quality: { type: String},
    tax: { type: String},
    discount: { type: String},
    shipment_charge: { type: String},
    total: { type: String},
    shippedamount: { type: String},
    leftamount: { type: String}
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Saleorder = mongoose.model("sale", saleorderSchema);
module.exports = Saleorder;

