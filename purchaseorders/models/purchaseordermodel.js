const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const purchaseorderSchema = new Schema({
    purchase_order_ID: { type: String, unique: true },
    supplier_ID: { type: String},
    warehouse_ID: { type: String },
    purchase_order_date: { type: Date},
    expected_delivery_date: { type: Date},
    payment_term: { type: String},
    due_date: { type: String},
    shipment_type: { type: String},
    item_detail: { type: String},
    price: { type: String},
    quality: { type: String},
    tax: { type: String},
    discount: { type: String},
    shipment_charge: { type: String},
    total: { type: String},
    status_ID: { type: String},
    recivedamount: { type: String},
    leftamount: { type: String}
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Purchaseorder = mongoose.model("purchase", purchaseorderSchema);
module.exports = Purchaseorder;

