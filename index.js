const express = require('express');
const config = require('./common/config/env.config');
const cleanBody = require ("./common/middlewares/cleanbody");
const bodyParser = require('body-parser');

const authorizationRouter = require('./authorization/routes.config');
const supplierRouter = require('./suppliers/routes/supplierroute');
const purchaseorderRouter = require('./purchaseorders/routes/purchaseorderroute');
const saleorderRouter = require('./saleorders/routes/saleorderroute');
const billRouter = require('./bills/routes/billroute');
const invoiceRouter = require('./invoices/routes/invoiceroute');

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


app.use('/auth', authorizationRouter); //register users routes
app.use('/supplier', supplierRouter);
app.use('/purchaseorder', purchaseorderRouter);
app.use('/saleorder', saleorderRouter);
app.use('/bill', billRouter);
app.use('/invoice', invoiceRouter);

app.listen(config.port,()=> {
    console.log('app listening on port ',config.port);
});

