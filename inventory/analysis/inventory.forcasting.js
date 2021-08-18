const saleorderModel = require('models/saleOrder.models');
const invoiceModel = require('../invoice/models/invoice.models');
const User = require('../users/models/users.model');
const itemModel = require('../item/models/item.models');
const sendEmail = require("../helpers/mailler");


exports.Inventoryturnover = async (req, res) => {
    try {
        //Inventory turnover measures the number of times a company has sold and replaced inventoryover a given time period:
        //calculate inventory turnover based on the date that a user inters
        //Average inventory = (Beginning inventory + Ending inventory) / Months in the period
        //BeginningInventory means inventory we want for a specific time 
        //BeginningInventory = quantity of each item in there warehouse

        req.decoded.organizationalId;
        //goto item search item with the bigining of the month
        inventoryTurnover = costofgoodsold/averageInventory;

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't make an inventory turnoves. Please try again later.",
        });
    }
}