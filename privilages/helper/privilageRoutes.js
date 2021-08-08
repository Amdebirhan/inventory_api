const defaultroutes = require('./registerdUrls');

module.exports.admulUrls = [...defaultroutes.simple, ...defaultroutes.admin,...defaultroutes.warehouseManager,...defaultroutes.branchManager,...defaultroutes.salesPerson];
module.exports.warehouseManagerUrls = [...defaultroutes.simple, ...defaultroutes.admin];
module.exports.branchManagerUrls = [...defaultroutes.simple, ...defaultroutes.admin];
module.exports.salesPersonUrls = [...defaultroutes.simple, ...defaultroutes.admin];
