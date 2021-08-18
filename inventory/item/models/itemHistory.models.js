const organizationalProfileSchema = require('../../organizational_profile/models/organizationalProfile.models');
const warehouseSchema = require('../../warehouse/models/warehouse.models');
const branchSchema = require('../../branch/models/branch.models');
const itemSchema = require('../../item/models/item.models');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const historySchema = new Schema({
    organization_ID: {type: Schema.Types.ObjectId, ref:organizationalProfileSchema},
    item_ID: {type: Schema.Types.ObjectId, ref:itemSchema},
    changes:[{
        date:{ type: Date, required: true, default: Date.now },
        quantity:{type:String}
    }]
},
    {
        timestamps: {
            createdAt: "creayedAt",
            updatedAt: "updatedAt",
        },
    }
);
const History = mongoose.model("history", historySchema);
module.exports = History;

exports.createHistory = (HistoryData) => {
    const history = new History(HistoryData);
    return history.save();
  };