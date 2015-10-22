var router = require("express").Router();
var User = require('../api/users/user.model');
var passport = require("passport");

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
    new GoogleStrategy({
        clientID: '214579254548-k5fd5gdnfn73muikqgn8k3f88p7hlg42.apps.googleusercontent.com',
        clientSecret: '4u_gL7UgvxS2D8RsaP4J4Gx9',
        callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
    },
    // google will send back the token and profile
    function (token, refreshToken, profile, done) {
    	console.log( token, profile)
        User.findOne({ 'google.id' : profile.id }).exec()
        .then(function(user) {
                if (user) done(null, user);
        })
        // , function(err, done){
        //     if(err) return done(err);

        //     if(user){
        //         return done(null, user);
    }));
                 else {
                var newUser = new User();
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                newUser.email = newUser.google.email;
                newUser.name = newUser.google.name;
                newUser.photo = profile.photos[0].value;

                newUser.save(function(err){
                    if(err){ 
                        done(err)
                    } else {
                        done(null, newUser);
                    }
                })
            }    
        })
    })
);

//google authentication and login 
router.get('/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/home',
    failureRedirect : '/'
  }));


module.exports = router;