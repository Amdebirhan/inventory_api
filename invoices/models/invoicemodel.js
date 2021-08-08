<<<<<<< HEAD
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const invoiceSchema = new Schema({
    invoice_ID : { type: String, unique: true },
    customer_ID: { type: String },
    sales_person_ID: { type: String },
    sale_order_ID: { type: String},
    invoice_date:{type: date},
    status_ID: { type: String},  
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Invoice = mongoose.model("purchase", invoiceSchema);
module.exports = Invoice;

=======
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const invoiceSchema = new Schema({
    invoice_ID : { type: String, unique: true },
    customer_ID: { type: String },
    sales_person_ID: { type: String },
    sale_order_ID: { type: String},
    invoice_date:{type: date},
    status_ID: { type: String},  
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Invoice = mongoose.model("purchase", invoiceSchema);
module.exports = Invoice;

>>>>>>> 860a139a3950630af880fdffe5020984be954624
