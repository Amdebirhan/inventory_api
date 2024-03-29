const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const invoiceSchema = new Schema({
    invoice_ID : { type: String, unique: true },
    customer_ID: { type: String },
    sales_person_ID: { type: String },
    sale_order_ID: { type: String},
    invoice_date:{ type: Date},
    status_ID: { type: String},  
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }

);
const Invoice = mongoose.model("invoice", invoiceSchema);
module.exports = Invoice;


module.exports.findById=(invoiceId)=>{
  return Saleorder.findOne({_id:invoiceId}).then((result) => {
    if(result === null){
      return result;
    }else{
      result = result.toJSON();
    delete result.url._id;
    delete result.__v;
    return result;
    }
});
}