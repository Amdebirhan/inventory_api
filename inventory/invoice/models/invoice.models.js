const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const customerSchema = require('../../customer/models/customer.models');
const userSchema = require('../../users/models/users.model');
const saleOrderSchema = require('../../sale_order/models/saleOrder.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const invoiceSchema = new Schema({
    organizational_ID:{ type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
    customer_ID:{ type: Schema.Types.ObjectId, ref: customerSchema },
    sales_person_ID:{ type: Schema.Types.ObjectId, ref: userSchema },
    sale_order_ID:{ type: Schema.Types.ObjectId, ref: saleOrderSchema },
    status: { type:String}, 
    invoice_date:{ type: Date}, 
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
  return Invoice.findOne({_id:invoiceId}).then((result) => {
    if(result === null){
      return result;
    }else{
      result = result.toJSON();
    delete result.__v;
    return result;
    }
});
}

module.exports.changeStatus=(invoiceId,statusId)=>{
  Invoice.updateMany({ _id: invoiceId},{$set: {
            "status_ID": statusId,
         }
    }
)
}