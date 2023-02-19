const { signout, loginSuccess } = require("../controllers/auth.controllers");
const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", loginSuccess);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/api/v1/auth/login",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/api/v1/auth/login",
    failureFlash: true,
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

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
  passport.authenticate("google", { successRedirect: "http://localhost:8000" })
);

module.exports = router;
