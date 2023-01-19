const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

console.log('entro en passport')
passport.serializeUser(function(obj, done) {
    done(null, obj);
  });
  
  passport.deserializeUser(function(obj, done) {
      done(null,obj);
  });

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.CALLBACKURL
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log('***Valor profile ***',profile);
    return done(null,true);
  }

));

module.exports = passport;
