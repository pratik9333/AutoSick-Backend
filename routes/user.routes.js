const { updateProfile, getProfile } = require('../controllers/user.controller');
const { authorizeAccessToken } = require('../utils/auth.config');
const router = require('express').Router();

router.put('/profile', updateProfile);
router.get('/profile', authorizeAccessToken, getProfile);

module.exports = router;
