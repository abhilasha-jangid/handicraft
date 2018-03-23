var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var cartRoutes = express.Router();
cartRoutes.use(bodyParser.json());

var User = require('./models/users');
var Product = require('./models/products');

cartRoutes.post('/addCart',authenticate.verifyUser, function(req, res)
{                
            Product.find({"name" : req.body.product_name} ,function(err1,product_info)
            {
                if(err1)
                {
                    throw err1;
                }
                else
                {
                    req.user.cart.push(product_info[0]._id);
                    req.user.save(function(err2)
                    {
                        if(err2)
                        {
                            throw err2;
                        }
                        else
                        {
                            res.send('product added to cart sucessfully');
                        }
                    });
                }
            })
        
});
module.exports = cartRoutes;