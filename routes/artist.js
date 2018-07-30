var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var artistRoutes = express.Router();
artistRoutes.use(bodyParser.json());
var Artist = require('./models/artists');


artistRoutes.get('/artist', function(req, res)
{   
    Artist.find({"featured": req.query.featured })
    .then((artist)=>{
        if(artist.length == 0)
        {
            res.send("no product exist");
        }
        else
        {
                res.send(artist);
        }
    })
    .catch((err)=>

{       throw err;})
  
});

module.exports = artistRoutes;