const { updateProfile } = require('../controllers/user.controller');
const { authorizeAccessToken } = require('../utils/auth.config');
const router = require('express').Router();

router.put('/profile', updateProfile);

module.exports = router;
