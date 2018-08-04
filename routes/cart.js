var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var cartRoutes = express.Router();
cartRoutes.use(bodyParser.json());

var User = require('./models/users');
var Product = require('./models/products');

cartRoutes.post('/addCart', authenticate.verifyUser, function (req, res) {
    Product.findById(req.body.product_id, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result == null) {
                res.json({
                    "success": false,
                    "data": "product is not exist."

                })
            }
            else {
                var is_product = false;
                for (var i = 0; i < req.user.cart.length; i++) {
                    if (req.user.cart[i].product == req.body.product_id) {
                        req.user.cart[i].quantity += 1;
                        is_product = true;
                    }
                }

                if (is_product == false) {
                    var obj = {};
                    obj.product = req.body.product_id;
                    obj.quantity = 1;
                    req.user.cart.push(obj);
                }
                req.user.save((err) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.json(
                            {
                                "success": true,
                                "data": "cart updated succesfully"
                            }
                        )
                    }

                })
            }
        }
    })



});

cartRoutes.get('/showCart', authenticate.verifyUser, function (req, res) {
    User.find({ "_id": req.user._id })
        .populate("cart.product")
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
                            "success": true,
                            "data": prod[0].cart
                        });
                }
            }
        })
})


cartRoutes.post('/removeProductFromCart', authenticate.verifyUser, function (req, res) {
    var is_product = false;
    for(var i=0;i<req.user.cart.length;i++)
    {
        if(req.user.cart[i].product == req.body.product_id)
        {
            if(req.user.cart[i].quantity == 1)
            {
                is_product = true;
                req.user.cart.splice(i,1);
            }
            else
            {
                is_product = true;
                req.user.cart[i].quantity -= 1;
            }
        }
    }
    if(is_product == false)
    {
        res.json({
            "success" : false,
            "data" : "product is not exist."
        })
    }
    else
    {
        req.user.save((err) => {
            if (err) {
                throw err;
            }
            else {
                res.json(
                    {
                        "success": true,
                        "data": "product remove from cart succesfully"
                    }
                )
            }

        })
    }
})
module.exports = cartRoutes;