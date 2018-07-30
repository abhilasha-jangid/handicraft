var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var promotionRoutes = express.Router();
promotionRoutes.use(bodyParser.json());

var Category = require('./models/categories');
var Promotion = require('./models/promotions');
var User = require('./models/users');


promotionRoutes.get('/promotion', function(req, res)
{   
    Promotion.find({"featured": req.query.featured })
    .then((promo)=>{
        if(promo.length == 0)
        {
            res.send("no product exist");
        }
        else
        {
                res.send(promo);
        }
    })
    .catch((err)=>

{       throw err;})
  
});




module.exports = promotionRoutes;