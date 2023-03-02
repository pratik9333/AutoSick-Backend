const passport = require("passport");
const User = require("../models/User.model");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

let domainUrl;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  domainUrl = "http://localhost:8000/api/v1";
} else {
  domainUrl = "https://auto-sick-backend.vercel.app/api/v1";
}

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

// login
passport.use(
  new LocalStrategy(async (email, password, next) => {
    try {
      const user = await User.find({ email });
      if (user.length > 0) {
        const result = await bcrypt.compare(password, user[0].password);
        if (!result) {
          return next("Password incorrect", false);
        }
        return next(null, user[0]);
      } else {
        return next("Email not found", false);
      }
    } catch (error) {
      return next("Server Error, Please try again", false);
    }
  })
);

// google login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${domainUrl}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        const user = await User.findOne({ email: profile._json.email });
        if (user) {
          return next(null, user);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
            photo: profile._json.picture,
          });
          next(null, newUser);
        }
      } catch (error) {
        return next("Server Error, please try again", false);
      }
    }
  )
);
