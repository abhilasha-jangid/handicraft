var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var commentRoutes = express.Router();
commentRoutes.use(bodyParser.json());

var Product = require('./models/products');
var Comment = require('./models/comments');

commentRoutes.post('/addComment',authenticate.verifyUser, function(req, res)
{    
    Product.find({"name": req.body.product_name}, function(err , pro)
    {
        console.log('product is',pro);
        if(err)
        {
          throw err;  
        }
        else 
        {
            if(pro.length == 0)
            {
                res.send("no product exist");
            }
            else
            {
                Comment.create(req.body ,function(err1,comm)
                {
                    if(err1)
                    {
                        throw err1;
                    }
                    else
                    {

                        comm.user=req.user
                        comm.save();
                        pro[0].comment.push(comm);
                        pro[0].save(function(err2)
                        {
                            if(err2)
                            {
                                throw err2;
                            }
                            else
                            {
                                res.send('comment added sucessfully');
                            }
                        });
                    }
                })
            }
        }
    })
});



module.exports = commentRoutes;