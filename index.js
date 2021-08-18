const config = require('./inventory/common/config/env.config');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server,{cors:{origin:"*"}});

const authRouter = require('./authorization/routes.config');
const userRouter = require('./inventory/users/routes.config');
const roleRouter = require('./inventory/privilages/Role/routes.config');
const resourceRouter = require('./inventory/privilages/Resource/routes.config');
const rightRouter = require('./inventory/privilages/Resource/routes.config');
var invoicesRouter = require('./inventory/invoice/invoice.routes');
var branchRouter = require('./inventory/branch/branch.routes');
var billRouter = require('./inventory/bill/bill.routes');
var customerRouter = require('./inventory/customer/customer.routes');
var itemRouter = require('./inventory/item/item.routes');
var organizationalProfileRouter = require('./inventory/organizational_profile/organizationalProfile.routes');
var purchaseOrderRouter = require('./inventory/purchase_order/purchaseOrder.routes');
var saleOrderRouter = require('./inventory/sale_order/saleOrder.routes');
var warehouseRouter = require('./inventory/warehouse/warehouse.routes');


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  } else {
      return next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/auth', authRouter); //register auth routes
app.use('/user', userRouter); //register users routes
app.use('/role', roleRouter); //register role routes
app.use('/resource', resourceRouter); //register resource routes
app.use('/invoice', invoicesRouter); //register invoice routes  
app.use('/branch', branchRouter); //register branch routes  
app.use('/bill', billRouter); //register bill routes  
app.use('/customer', customerRouter); //register customer routes  
app.use('/item', itemRouter); //register item routes   
app.use('/organization', organizationalProfileRouter); //register organizational Profile routes  
app.use('/purchase-order', purchaseOrderRouter); //register PO routes  
app.use('/sale-order', saleOrderRouter); //register sale-order routes  
app.use('/warehouse', warehouseRouter); //register warehouse routes  


server.listen(config.port,()=> {
    console.log('app listening on port ',config.port);
});

io.on('connection', function (socket) {
    socket.on('get notifications', function(data){
        users[data.user_id]=socket;
      notifications.getNotifications(data, function(response){
          socket.emit('notification data', response.data);
          users[data.user_id].emit('notification', response.data);
      });
    });
  
  });