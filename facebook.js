var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

console.log('entro en passport')
passport.serializeUser(function(obj, done) {
    done(null, obj);
  });
  
  passport.deserializeUser(function(id, done) {
      done(null,obj);
  });

passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:process.env.CALLBACKURL_FACEBOOK
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
