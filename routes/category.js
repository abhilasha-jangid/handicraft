var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');


var categoryRoutes = express.Router();
categoryRoutes.use(bodyParser.json());



var Category = require('./models/categories');

categoryRoutes.get('/showCategories',  function(req, res)
{    
    Category.find({}, function(err , all_category)
    {
        if(err)
        {
          throw err;  
        }
        else
        {
            var arr=[];
            for(var i=0;i<all_category.length;i++)
            {
                arr.push(all_category[i].name);
            }
            res.json({
                "success" : true,
                "data" : arr
            });
        }
    })
});

categoryRoutes.post('/selectCategories',  function(req, res)
{    
    Category.find({'name' : req.body.name})
        .populate('product',{_id : 0,name:1,image_url : 1,price : 1})
        .exec( function(err , categoryProduct)
    {
        if(err)
        {
          throw err;  
        }
        else
        {
            res.json({
                "success" : true,
                "data" : categoryProduct[0].product
            });
        }
    })
});
categoryRoutes.post('/addCategory',authenticate.checkAdmin,function(req,res)
{
    Category.create(req.body,function(err,cate)
{
    if(err)
    {
        throw err;
    }
    else
    {
        res.send(cate);
    }
})
})


module.exports = categoryRoutes;