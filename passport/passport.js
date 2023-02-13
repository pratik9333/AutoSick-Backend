const passport = require("passport");
const User = require("../models/User.model");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        const user = await User.findOne({ email: profile._json.email });
        if (user) {
          return next(null, user);
        } else {
          const user = await User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
            photo: profile._json.picture,
          });
          console.log("New User", user);
          next(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
//   next();
