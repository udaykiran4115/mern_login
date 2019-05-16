var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../database/models/User");

passport.use(
  new FacebookStrategy(
    {
      clientID: "2470920089606305",
      clientSecret: "e8deb6a2979472b78fe1dabb2a34ec0d",
      callbackURL: "http://localhost/passport/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { name: profile.displayName },
        { name: profile.displayName, userid: profile.id },
        function(err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);

module.exports = passport;
