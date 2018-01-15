var passport = require('passport');
var User = require('./routes/models/users')

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens



exports.getToken = function(user) {
    return jwt.sign(user, 'iamabhi',
        {expiresIn: 36000});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'iamabhi';

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.checkAdmin = function (req, res, next)
{
    var auth_header = req.headers.authorization;
    if (null == auth_header)
    {
        res.status(401)
        res.json({
            "data": {
                "error": "user not authenticated"
            }
        })
    }
    else
    {
        var auth = new Buffer(auth_header.split(' ')[1], 'base64').toString().split(':');
        var user_name = auth[0];
        var pass = auth[1];
        if (user_name == 'abhilasha' && pass == 'cute')
        {
            next();
        }
        else
        {
            res.status(401)
            res.json({
                "data": {
                    "error": "Wrong username or password"
                }
            })
        }
    }
};