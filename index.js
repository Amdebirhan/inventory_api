<<<<<<< HEAD
const express = require('express');
=======

>>>>>>> 860a139a3950630af880fdffe5020984be954624
const config = require('./common/config/env.config');
const cleanBody = require ("./common/middlewares/cleanbody");
const bodyParser = require('body-parser');
<<<<<<< HEAD

const authorizationRouter = require('./authorization/routes.config');
=======
//const AuthorizationRouter = require('./authorization/routes.config')
const authRouter = require('./authorization/routes.config');
const userRouter = require('./users/routes.config');
const roleRouter = require('./privilages/Role/routes.config');
const resourceRouter = require('./privilages/Resource/routes.config');
const rightRouter = require('./privilages/Resource/routes.config');
//const authorizationRouter = require('./authorization/routes.config');
>>>>>>> 860a139a3950630af880fdffe5020984be954624
const supplierRouter = require('./suppliers/routes/supplierroute');
const purchaseorderRouter = require('./purchaseorders/routes/purchaseorderroute');
const saleorderRouter = require('./saleorders/routes/saleorderroute');
const billRouter = require('./bills/routes/billroute');
const invoiceRouter = require('./invoices/routes/invoiceroute');
<<<<<<< HEAD

=======
const express = require('express');
>>>>>>> 860a139a3950630af880fdffe5020984be954624
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
<<<<<<< HEAD

=======
//authRouter.routesConfig(app);
app.use('/auth', authRouter); //register auth routes
app.use('/user', userRouter); //register users routes
app.use('/role', roleRouter); //register role routes
app.use('/resource', resourceRouter); //register resource routes
app.use('/right', rightRouter); //register resource routes

app.use('/supplier', supplierRouter);
app.use('/purchaseorder', purchaseorderRouter);
app.use('/saleorder', saleorderRouter);
app.use('/bill', billRouter);
app.use('/invoice', invoiceRouter);

//AuthorizationRouter.routesConfig(app);
//userRouter.routesConfig(app);
>>>>>>> 860a139a3950630af880fdffe5020984be954624

app.use('/auth', authorizationRouter); //register users routes
app.use('/supplier', supplierRouter);
app.use('/purchaseorder', purchaseorderRouter);
app.use('/saleorder', saleorderRouter);
app.use('/bill', billRouter);
app.use('/invoice', invoiceRouter);

app.listen(config.port,()=> {
    console.log('app listening on port ',config.port);
});
<<<<<<< HEAD

=======
>>>>>>> 860a139a3950630af880fdffe5020984be954624
