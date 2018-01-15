var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var orderRoutes = express.Router();
orderRoutes.use(bodyParser.json());

var Order = require('./models/orders');

orderRoutes.post('/orderd',authenticate.verifyUser, function(req, res)
{    
    
            
    Order.create(req.body ,function(err1,order_info)
    {
        if(err1)
        {
            throw err1;
        }
        else
        {
            order_info.user=req.user._id;

            for(var i =0;i<req.user.cart.length;i++)
            {
                order_info.product.push(req.user.cart[i]);
            }
            order_info.save(function(err)
            {
                if(err)
                {
                    throw err;
                }
                else
                {
                    res.send('cart added to order list sucessfully!!');
                    req.user.cart.splice(0,req.user.cart.length);
                    req.user.save();
                }
            });
        }
    })
    
        
});


module.exports = orderRoutes;