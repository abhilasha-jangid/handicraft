var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var productRoutes = express.Router();
productRoutes.use(bodyParser.json());

var Category = require('./models/categories');
var Product = require('./models/products');

productRoutes.post('/addProduct',authenticate.checkAdmin, function(req, res)
{    
    Category.find({"name": req.body.category_name}, function(err , cat)
    {
        if(err)
        {
          throw err;  
        }
        else 
        {
            if(cat.length == 0)
            {
                res.send("no category exist");
            }
            else
            {
                Product.create(req.body ,function(err1,prod)
                {
                    if(err1)
                    {
                        throw err1;
                    }
                    else
                    {
                        cat[0].product.push(prod._id);
                        cat[0].save(function(err2)
                        {
                            if(err2)
                            {
                                throw err2;
                            }
                            else
                            {
                                res.send('product added sucessfully');
                            }
                        });
                    }
                })
            }
        }
    })
});


module.exports = productRoutes;