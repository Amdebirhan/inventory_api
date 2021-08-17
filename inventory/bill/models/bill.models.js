const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const saleOrderSchema = require('../../sale_order/models/saleOrder.models');
const supplierSchema = require('../../supplier/models/supplier.models');
const warehouseSchema = require('../../warehouse/models/warehouse.models');
const branchSchema = require('../../branch/models/branch.models');
const statusSchema = require('../../status/models/status.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Joi = require('joi');

const billSchema = new Schema({
    organizationId:{ type: Schema.Types.ObjectId, ref: organizationalProfileSchema },
    purchase_orderId:{ type: Schema.Types.ObjectId, ref: saleOrderSchema },
    supplierId:{ type: Schema.Types.ObjectId, ref: supplierSchema },
    warehouseId:{ type: Schema.Types.ObjectId, ref: warehouseSchema },
    branchId:{ type: Schema.Types.ObjectId, ref: branchSchema },
    statusId: { type: Schema.Types.ObjectId, ref: statusSchema },  
    bill_date:{ type: Date},
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

