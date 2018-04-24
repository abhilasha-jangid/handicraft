var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');



var userRoutes = express.Router();
userRoutes.use(bodyParser.json());



var User = require('./models/users');

userRoutes.post('/login',function(req, res)
{    
    User.find({'phone' : req.body.phone , 'password' : req.body.password}, function(err , old_user)
    {
        console.log("phone",req.body.phone);
        console.log("password",req.body.password);
        if(old_user.length != 0)
        {
            var token = authenticate.getToken({_id: old_user[0]._id});
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});
        }
        else
        {
            res.json({success: false, status: 'username password invalid do signup first'});
        }
    })
});

userRoutes.post('/signUp', function(req, res)
{    
    console.log(req.body.phone);
    User.find({'phone' : req.body.phone},function(err,user)
    {
        console.log(user);
        if(user.length == 0)
        {
            User.create(req.body , function(err,new_user)
            {
                console.log(new_user);
                if (err)
                {
                    throw err;
                }
                else
                {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'You are successfully registered in!'});
                }
                
                
            })
        }
        else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'phone no alredy exist'});
        }
    });
});

module.exports = userRoutes;