const passport = require("passport");
const User = require("../models/User.model");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "771957118144-dqvpeq591b4c6993sjt334cqf0un5m4v.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      console.log("MY PROFILE", profile._json.email);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("User already exits in DB", user);
          next(null, user);
          // cookietoken()
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("New User", user);
              next(null, user);
              // cookietoken()
            })
            .catch((err) => console.log(err));
        }
      });

      //   next();
    }
  )
);
