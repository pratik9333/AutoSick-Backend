const { signout, loginSuccess } = require("../controllers/auth.controllers");
const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", loginSuccess);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "http://localhost:3001",
    failureMessage: "some error occured",
  })
);

router.get("/logout", signout);

router.get(
  "/google/callback",
  passport.authenticate("google", { successRedirect: "http://localhost:3001" })
);

module.exports = router;
