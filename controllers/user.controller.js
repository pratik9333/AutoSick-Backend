const { updateUserMetadata, getUserMetadata, createUser, signInUser, signOutUser } = require('../utils/auth.config');
const { createAppointment, getAppointmentsByUser, getAppointment } = require('../utils/db');
var axios = require('axios').default;
exports.updateProfile = async (req, res, next) => {
	const { user_id, metadata } = req.body;

	updateUserMetadata(user_id, metadata)
		.then(() => {
			res.json({
				success: true,
				message: 'User updated successfully!',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProfile = (req, res, next) => {
	const { user_id } = req.body;
	getUserMetadata(user_id)
		.then((user) => {
			res.json({
				success: true,
				user: user,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);	
};

exports.signUp = (req, res, next) => {
	  const { email, password, role } = req.body;
	  createUser(email, password, role)
	    .then((user) => {
			res.json({
				success: true,
				user: user,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);
};

exports.signIn = (req, res, next) => {
	const { email, password } = req.body;
	signInUser(email, password)
		.then((user) => {
			res.json({
				success: true,
				user: user,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);
};

exports.signOut = (req, res, next) => {
	const { refreshToken } = req.body;
	signOutUser(refreshToken)
		.then((user) => {
			res.json({
				success: true,
				user: user,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);
};

exports.postAppointment = (req, res, next) => {
	const { appointment } = req.body;
	createAppointment(appointment)
		.then((appointment) => {
			res.json({
				success: true,
				appointment: appointment,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);
};

exports.getAppointments = (req, res, next) => {
	const { user_id } = req.body;
	getAppointmentsByUser(user_id)
		.then((appointments) => {
			res.json({
				success: true,
				appointments: appointments,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);
};

exports.getAppointment = (req, res, next) => {
	const { appointment_id } = req.body;
	getAppointmentById(appointment_id)
		.then((appointment) => {
			res.json({
				success: true,
				appointment: appointment,
			});
		})
		.catch((err) => {
			console.log(err);
		}
	);
};