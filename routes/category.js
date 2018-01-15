var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');


var categoryRoutes = express.Router();
categoryRoutes.use(bodyParser.json());



var Category = require('./models/categories');

categoryRoutes.get('/showCategories', authenticate.verifyUser, function(req, res)
{    
    Category.find({}, function(err , all_category)
    {
        if(err)
        {
          throw err;  
        }
        else
        {
            res.json(all_category);
        }
    })
});

categoryRoutes.post('/selectCategories', authenticate.verifyUser, function(req, res)
{    
    Category.find({'name' : req.body.name}, function(err , categoryProduct)
    {
        if(err)
        {
          throw err;  
        }
        else
        {
            res.json(categoryProduct);
        }
    })
});


module.exports = categoryRoutes;