const {
  updateProfile,
  getProfile,
  getAllProfiles,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/checkLoginStatus.middleware");
const router = require("express").Router();

router.get("/", isLoggedIn, getAllProfiles);

router.put("/", isLoggedIn, updateProfile);
router.get("/profile", isLoggedIn, getProfile);

module.exports = router;
