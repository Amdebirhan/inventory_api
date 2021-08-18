const saleorderModel = require('models/saleOrder.models');
const invoiceModel = require('../invoice/models/invoice.models');
const User = require('../users/models/users.model');
const itemModel = require('../item/models/item.models');
const sendEmail = require("../helpers/mailler");


//quantity on hand
//quantity to be recived
//quantity to be shipped
//low stock item
//all item
//to be expired items
//top selling items (years,month,weeks,days)
//purchase orders (month,days,weeks)
//sale orders (month,day,weeks)
//sale order summary


exports.quantityOnHand = async (req, res) => {
    try {
        //count noumber of items in the organization
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't make an inventory turnoves. Please try again later.",
        });
    }
}