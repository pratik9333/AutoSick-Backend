const { loginWithGoogle, signOut } = require("../controllers/user.controller");
const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  loginWithGoogle
);

router.get("/logout", signOut);

router.get("/google/callback", passport.authenticate("google"));

module.exports = router;

module.exports = router;
