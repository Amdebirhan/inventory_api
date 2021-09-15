const saleorderModel = require('../sale_order/models/saleOrder.models');
const purchaseorderModel = require('../purchase_order/models/purchaseOrder.models');
const invoiceModel = require('../invoice/models/invoice.models');
const  billModel= require('../bill/models/bill.models');
const User = require('../users/models/users.model');
const itemModel = require('../item/models/item.models');
const sendEmail = require("../helpers/mailler");
billModel

//quantity on hand//
//quantity to be recived//
//quantity to be shipped//
//low stock item//
//all item//
//to be expired items//
//top selling items (years,month,weeks,days)//
//purchase orders (month,days,weeks)
//sale orders (month,day,weeks)
//sale order summary


exports.quantityOnHand = async (req, res) => {
    try {
        //count noumber of items in the organization
        organizationId = body.decoded.organizationId;
        itemModel.find({ organization_ID: organizationId }, 'quantity', function (error, data) {
            if (error) {
                return res.status(500).send({
                    msg: 'Error while finding records',
                    data: []
                })
            } else {
                for (var i = 0; i < data.length; i++) {
                    quantityOnHand += data.quantity;
                }
                return res.status(200).send({
                    data: quantityOnHand,
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error while finding records. Please try again later.",
        });
    }
}

exports.quantityToRecive = async (req, res) => {
}

//all sale orders sale orders by status , sale orders by customers and sale order by date
exports.saleorders = async function (req, res) {
    let aggregate_options = [];

    let { startDate, endDate } = req.query;
        const limit = +req.query.limit || 10
        const page = +req.query.page || 1
        const skip =(page - 1) * limit
       //const search = req.query.search || ''
    //FILTERING
    let match = {
        organizationalId:req.decoded.organizationId,
    };

    //filter by date
    if (startDate && endDate) {
        match.createdAt =  {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
        };
    }if(req.query.status){
        match.status = req.query.status;
    }if(req.query.customerId){
        match.customer_ID=req.query.customerId;
    }
    aggregate_options.push({ $match: match });

    //GROUPING -- SECOND STAGE
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        let group = {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group By Expression
            data: { $push: "$$ROOT" }
        };

        aggregate_options.push({ $group: group });
    }

    aggregate_options.push({$limit: skip + limit});
    aggregate_options.push({$skip: skip});

    //SORTING -- THIRD STAGE
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;
    aggregate_options.push({ $sort: { "data.createdAt": sortOrder } });

    //LOOKUP/JOIN -- FOURTH STAGE
    // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

    // Set up the aggregation
    const result =await saleorderModel.aggregate(aggregate_options);
    return res.status(200).json(result);
};
//all invoice orders invoice by status , invoice by customers and sale order by date
exports.invoices = async function (req, res) {
    let aggregate_options = [];

    let { startDate, endDate } = req.query;
        const limit = +req.query.limit || 10
        const page = +req.query.page || 1
        const skip =(page - 1) * limit
       //const search = req.query.search || ''
    //FILTERING
    let match = {
        organizationalId:req.decoded.organizationId,
    };
    
    //filter by date
    if (startDate && endDate) {
        match.createdAt =  {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
        };
    }if(req.query.status){
        match.status = req.query.status;
    }if(req.query.customerId){
        match.supplierId=req.query.customerId;
    }
    aggregate_options.push({ $match: match });

    //GROUPING -- SECOND STAGE
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        let group = {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group By Expression
            data: { $push: "$$ROOT" }
        };

        aggregate_options.push({ $group: group });
    }

    aggregate_options.push({$limit: skip + limit});
    aggregate_options.push({$skip: skip});

    //SORTING -- THIRD STAGE
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;
    aggregate_options.push({ $sort: { "data.createdAt": sortOrder } });

    //LOOKUP/JOIN -- FOURTH STAGE
    // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

    // Set up the aggregation
    const result =await invoiceModel.aggregate(aggregate_options);
    return res.status(200).json(result);
};
//all purchase orders sale orders by status , sale orders by customers and sale order by date
exports.purchaseorders = async function (req, res) {
    let aggregate_options = [];

    let { startDate, endDate } = req.query;
        const limit = +req.query.limit || 10
        const page = +req.query.page || 1
        const skip =(page - 1) * limit
       //const search = req.query.search || ''
    //FILTERING
    let match = {
        organizationalId:req.decoded.organizationId,
    };
    
    //filter by date
    if (startDate && endDate) {
        match.createdAt =  {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
        };
    }if(req.query.status){
        match.status = req.query.status;
    }if(req.query.customerId){
        match.supplierId=req.query.customerId;
    }
    aggregate_options.push({ $match: match });

    //GROUPING -- SECOND STAGE
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        let group = {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group By Expression
            data: { $push: "$$ROOT" }
        };

        aggregate_options.push({ $group: group });
    }

    aggregate_options.push({$limit: skip + limit});
    aggregate_options.push({$skip: skip});

    //SORTING -- THIRD STAGE
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;
    aggregate_options.push({ $sort: { "data.createdAt": sortOrder } });

    //LOOKUP/JOIN -- FOURTH STAGE
    // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

    // Set up the aggregation
    const result =await purchaseorderModel.aggregate(aggregate_options);
    return res.status(200).json(result);
};
//all bill orders sale orders by status , sale orders by customers and sale order by date
exports.bills = async function (req, res) {
    let aggregate_options = [];

    let { startDate, endDate } = req.query;
        const limit = +req.query.limit || 10
        const page = +req.query.page || 1
        const skip =(page - 1) * limit
       //const search = req.query.search || ''
    //FILTERING
    let match = {
        organizationalId:req.decoded.organizationId,
    };
    
    //filter by date
    if (startDate && endDate) {
        match.createdAt =  {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
        };
    }if(req.query.status){
        match.status = req.query.status;
    }if(req.query.customerId){
        match.supplierId=req.query.customerId;
    }
    aggregate_options.push({ $match: match });

    //GROUPING -- SECOND STAGE
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        let group = {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group By Expression
            data: { $push: "$$ROOT" }
        };

        aggregate_options.push({ $group: group });
    }

    aggregate_options.push({$limit: skip + limit});
    aggregate_options.push({$skip: skip});

    //SORTING -- THIRD STAGE
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;
    aggregate_options.push({ $sort: { "data.createdAt": sortOrder } });

    //LOOKUP/JOIN -- FOURTH STAGE
    // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

    // Set up the aggregation
    const result =await billModel.aggregate(aggregate_options);
    return res.status(200).json(result);
};

//specific item sale within a given period of time
exports.specificItemSale = async (req, res) => {
    let { startDate, endDate } = req.query;
    //1. check that date is not empty
    if (startDate === '' || endDate === '') {
        endDate = new Date();
        startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 1);
        // return res.status(400).json({
        //     status: 'failure',
        //     message: 'Please ensure you pick two dates'
        // })
    }
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    saleorderModel.aggregate([
        {
            $match: {
                productId: req.params.productId,
                created_at: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: { "year_month": { $substrCP: ["$createdAt", 0, 7] } },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.year_month": 1 }
        },
        {
            $project: {
                _id: 0,
                count: 1,
                month_year: {
                    $concat: [
                        { $arrayElemAt: [monthsArray, { $subtract: [{ $toInt: { $substrCP: ["$_id.year_month", 5, 2] } }, 1] }] },
                        "-",
                        { $substrCP: ["$_id.year_month", 0, 4] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                data: { $push: { k: "$month_year", v: "$count" } }
            }
        },
        {
            $project: {
                data: { $arrayToObject: "$data" },
                _id: 0
            }
        }
    ])
}

// //all saleorders within a specific period of time
// exports.saleorders = async (req, res) => {
//     try {
//         let { startDate, endDate } = req.query;
//         const limit = +req.query.limit || 10
//         const page = +req.query.page || 1
//         const search = req.query.search || ''
//         let date = new Date(req.query.date);
//         let status = req.query.status;
//         let customer = req.query.customerId;
//         //1. check that date is not empty
//         if (startDate === '' || endDate === '') {
//             endDate = new Date();
//             startDate = new Date(endDate);
//             endDate.setDate(startDate.getDate() - 30);//myFutureDate is now 8 days in the future
//             // return res.status(400).json({
//             //     status: 'failure',
//             //     message: 'Please ensure you pick two dates'
//             // })
//         }
//         //2. Query database using Mongoose
//         const transactions = saleorderModel.find({
//             createdAt: {
//                 $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
//                 $lt: new Date(new Date(endDate).setHours(23, 59, 59))
//             }
//         }).sort({ createdAt: 'asc' })

//         if (!transactions) {
//             return res.status(404).json({
//                 status: 'failure',
//                 message: 'Could not retrieve transactions'
//             })
//         }


//         res.status(200).json({
//             status: 'success',
//             data: transactions
//         })

//     } catch (error) {
//         return res.status(500).json({
//             status: 'failure',
//             error: error.message
//         })
//     }
// }

// //all purchase orders within a specific period of time
// exports.purchaseorders = async (req, res) => {
//     try {
//         let { startDate, endDate } = req.query;
//         //1. check that date is not empty
//         if (startDate === '' || endDate === '') {
//             var startDate = new Date();
//             var endDate = new Date(myCurrentDate);
//             endDate.setDate(endDate.getDate() - 30);//myFutureDate is now 8 days in the future
//             // return res.status(400).json({
//             //     status: 'failure',
//             //     message: 'Please ensure you pick two dates'
//             // })
//         }
//         //2. Query database using Mongoose
//         const transactions = purchaseorderModel.find({
//             createdAt: {
//                 $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
//                 $lt: new Date(new Date(endDate).setHours(23, 59, 59))
//             }
//         }).sort({ createdAt: 'asc' })

//         if (!transactions) {
//             return res.status(404).json({
//                 status: 'failure',
//                 message: 'Could not retrieve transactions'
//             })
//         }


//         res.status(200).json({
//             status: 'success',
//             data: transactions
//         })

//     } catch (error) {
//         return res.status(500).json({
//             status: 'failure',
//             error: error.message
//         })
//     }
// }



//specific item purchase within a given period of time
exports.specificItemPurchase = async (req, res) => {

    organizationalId = req.decoded.organizationId;

    let { startDate, endDate } = req.query;
    //1. check that date is not empty
    if (startDate === '' || endDate === '') {
        endDate = new Date();
        startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 1);
        // return res.status(400).json({
        //     status: 'failure',
        //     message: 'Please ensure you pick two dates'
        // })
    }
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    purchaseorderModel.aggregate([
        {
            $match: {
                organizationalId: organizationalId,
                item_ID: { id: { "$in": [req.params.productId,] } },
                created_at: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: { "year_month": { $substrCP: ["$created_at", 0, 7] } },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.year_month": 1 }
        },
        {
            $project: {
                _id: 0,
                count: 1,
                month_year: {
                    $concat: [
                        { $arrayElemAt: [monthsArray, { $subtract: [{ $toInt: { $substrCP: ["$_id.year_month", 5, 2] } }, 1] }] },
                        "-",
                        { $substrCP: ["$_id.year_month", 0, 4] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                data: { $push: { k: "$month_year", v: "$count" } }
            }
        },
        {
            $project: {
                data: { $arrayToObject: "$data" },
                _id: 0
            }
        }
    ])
}

// exports.purchaseorders = async (req, res) => {
//     try {
//         let { startDate, endDate } = req.query;
//         //1. check that date is not empty
//         if (startDate === '' || endDate === '') {
//             var startDate = new Date();
//             var endDate = new Date(myCurrentDate);
//             endDate.setDate(endDate.getDate() - 30);//myFutureDate is now 8 days in the future
//             // return res.status(400).json({
//             //     status: 'failure',
//             //     message: 'Please ensure you pick two dates'
//             // })
//         }
//         //2. Query database using Mongoose
//         const transactions = purchaseorderModel.find({
//             createdAt: {
//                 $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
//                 $lt: new Date(new Date(endDate).setHours(23, 59, 59))
//             }
//         }).sort({ createdAt: 'asc' })

//         if (!transactions) {
//             return res.status(404).json({
//                 status: 'failure',
//                 message: 'Could not retrieve transactions'
//             })
//         }


//         res.status(200).json({
//             status: 'success',
//             data: transactions
//         })

//     } catch (error) {
//         return res.status(500).json({
//             status: 'failure',
//             error: error.message
//         })
//     }
// }





