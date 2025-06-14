const express = require('express');
const app =express();
const bodyParser = require('body-parser');
const PORT = 9669;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const productCatgRoute = require("./admin/productcatg.route.js");
const cityRoute=require("./admin/cityRoute.js")//
const stateRoute =require("./admin/state.route.js");
const VenderRoute=require('./vender/vender.route.js');
const productRoute=require('./Product/product.route.js')
const customerRoute=require('./customer/customer.route.js');
const billRoute=require('./admin/bills/bill.route.js');
const paymentdetailsRoute=require('./admin/bills/paymentdetails.route.js');
const router = require('./payment.js');
const emailrouter=require('./emailmgt.js');
const emailactivationrouter=require('./emailactivation.js')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/productcatg',productCatgRoute);
app.use('/state',stateRoute);
app.use('/city',cityRoute) //
app.use('/vender',VenderRoute);
app.use('/product',productRoute)
app.use('/customer',customerRoute);
app.use('/bill',billRoute);
app.use('/paymentdetails',paymentdetailsRoute);
app.use('/payment',router);
app.use('/email',emailrouter);
app.use('/emailactivation',emailactivationrouter);

mongoose.connect(config.URL).then(
    ()=>{console.log('Database is connected'+config.URL) },
    err=>{console.log('can not connect to the database'+err)}
);
app.listen(PORT,()=>{
    console.log("server is running "+PORT)
})