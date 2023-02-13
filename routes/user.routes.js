const { updateProfile, getProfile } = require("../controllers/user.controller");
const router = require("express").Router();

router.put("/profile", updateProfile);
router.get("/profile", getProfile);

module.exports = router;
