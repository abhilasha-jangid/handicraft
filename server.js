var http = require("http");
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var port = process.env.PORT||8080;
var users = require('./routes/user');
var categories = require('./routes/category');
var products = require('./routes/product');
var carts = require('./routes/cart');
var orders = require('./routes/order');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user',users);
app.use('/category',categories);
app.use('/product',products);
app.use('/cart',carts);
app.use('/order',orders);



app.listen(port,function(err)
{
    if(err)
    {
        throw err;
    }
    console.log('app is running at ' + port);
})

mongoose.connect('mongodb://localhost/handicraft' , function(err,db)
{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("Connected Successfully to mongodb");
    }
});
process.on('uncaughtException',function(err)
{
    console.log('Caught Exception :'+err);
})
