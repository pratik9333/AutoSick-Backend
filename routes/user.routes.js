const { updateProfile, getProfile } = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/checkLoginStatus.middleware");
const router = require("express").Router();

router.put("/profile", isLoggedIn, updateProfile);
router.get("/profile", isLoggedIn, getProfile);

module.exports = router;
