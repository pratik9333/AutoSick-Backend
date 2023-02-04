const { updateProfile, getProfile, signUp, signIn, signOut, postAppointment, getAppointments, getAppointment } = require('../controllers/user.controller');
const { authorizeAccessToken } = require('../utils/auth.config');
const router = require('express').Router();

router.put('/profile', updateProfile);
router.get('/profile', authorizeAccessToken, getProfile);
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);
router.post('/create-appointment', postAppointment);
router.get('/appointments', authorizeAccessToken, getAppointments);
router.get('/appointment/:appointment_id', authorizeAccessToken, getAppointment);

module.exports = router;
