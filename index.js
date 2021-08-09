
const config = require('./common/config/env.config');
const bodyParser = require('body-parser');
//const AuthorizationRouter = require('./authorization/routes.config')
const authRouter = require('./authorization/routes.config');
const userRouter = require('./users/routes.config');
const roleRouter = require('./privilages/Role/routes.config');
const resourceRouter = require('./privilages/Resource/routes.config');

//const authorizationRouter = require('./authorization/routes.config');
// const supplierRouter = require('./suppliers/routes/supplierroute');
// const purchaseorderRouter = require('./purchaseorders/routes/purchaseorderroute');
// const saleorderRouter = require('./saleorders/routes/saleorderroute');
// const billRouter = require('./bills/routes/billroute');
// const invoiceRouter = require('./invoices/routes/invoiceroute');
const express = require('express');
const app = express(); 

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
//authRouter.routesConfig(app);
app.use('/auth', authRouter); //register auth routes
app.use('/user', userRouter); //register users routes
app.use('/role', roleRouter); //register role routes
app.use('/resource', resourceRouter); //register resource routes


// app.use('/supplier', supplierRouter);
// app.use('/purchaseorder', purchaseorderRouter);
// app.use('/saleorder', saleorderRouter);
// app.use('/bill', billRouter);
// app.use('/invoice', invoiceRouter);

//AuthorizationRouter.routesConfig(app);
//userRouter.routesConfig(app);


app.listen(config.port,()=>{
    console.log('app listening on port ',config.port);
});
