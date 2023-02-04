const router = require("express").Router();
const { updateProfile } = require("../controllers/user.controller");
const { authorizeAccessToken } = require("../utils/auth.config");

router.put("/profile", updateProfile);

module.exports = router;
