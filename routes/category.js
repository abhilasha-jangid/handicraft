var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');


var categoryRoutes = express.Router();
categoryRoutes.use(bodyParser.json());



var Category = require('./models/categories');

categoryRoutes.get('/showCategories', function (req, res) {
    Category.find({}, function (err, all_category) {
        if (err) {
            throw err;
        }
        else {
            res.json({
                "success": true,
                "data": all_category
            });
        }
    })
});

categoryRoutes.post('/selectCategories', function (req, res) {
    Category.find({ '_id': req.body.inId })
        .populate('product', { name: 1, image_url: 1, price: 1 })
        .exec(function (err, categoryProduct) {
            if (err) {
                throw err;
            }
            else {
                res.json({
                    "success": true,
                    "data": categoryProduct[0].product
                });
            }
        })
});
categoryRoutes.post('/addCategory', authenticate.checkAdmin, function (req, res) {
    Category.create(req.body, function (err, cate) {
        if (err) {
            throw err;
        }
        else {
            res.send(cate);
        }
    })
})


module.exports = categoryRoutes;