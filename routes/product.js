var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var productRoutes = express.Router();
productRoutes.use(bodyParser.json());

var Category = require('./models/categories');
var Product = require('./models/products');
var User = require('./models/users');

productRoutes.post('/addProduct', authenticate.checkAdmin, function (req, res) {
    Category.find({ "name": req.body.category_name }, function (err, cat) {
        if (err) {
            throw err;
        }
        else {
            if (cat.length == 0) {
                res.send("no category exist");
            }
            else {
                Product.create(req.body, function (err1, prod) {
                    if (err1) {
                        throw err1;
                    }
                    else {
                        cat[0].product.push(prod._id);
                        cat[0].save(function (err2) {
                            if (err2) {
                                throw err2;
                            }
                            else {
                                res.send('product added sucessfully');
                            }
                        });
                    }
                })
            }
        }
    })
});


productRoutes.post('/productDetail', function (req, res) {
    Product.find({ "name": req.body.product_name }, { _id: 0, featured: 0, __v: 0 })
        .populate('comment', { _id: 0, __v: 0, updatedAt: 0 })
        .exec(function (err, prod) {
            if (err) {
                throw err;
            }
            else {
                if (prod.length == 0) {
                    res.send("no product exist");
                }
                else {
                    res.send(prod);
                }
            }
        })
});

productRoutes.post('/productDetails', function (req, res) {
    Product.find({ "_id": req.body.inId }, { featured: 0, __v: 0 })
        .populate({
            path: "comment",
            populate: {
                path: "user",
                model: "User"
            }
        })
        .exec(function (err, prod) {
            if (err) {
                throw err;
            }
            else {
                if (prod.length == 0) {
                    res.send("no product exist");
                }
                else {
                    res.json(
                        {
                            "success" : true,
                            "data" : prod[0]
                        });
                }
            }
        })
});


productRoutes.get('/product', function (req, res) {
    Product.find({ "featured": req.query.featured })
        .then((prod) => {
            if (prod.length == 0) {
                res.send("no product exist");
            }
            else {
                res.send(prod);
            }
        })
        .catch((err) => { throw err; })

});




module.exports = productRoutes;