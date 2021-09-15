const defaultroutes = require('./registerdUrls');

module.exports.admulUrls = [...defaultroutes.simple, ...defaultroutes.admin];
module.exports.warehouseManagerUrls = [...defaultroutes.simple, ...defaultroutes.warehouseManager];
module.exports.branchManagerUrls = [...defaultroutes.simple, ...defaultroutes.branchManager];
module.exports.salesPersonUrls = [...defaultroutes.simple, ...defaultroutes.salesPerson];
