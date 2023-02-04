const { updateUserMetadata, getUserMetadata } = require('../utils/auth.config');

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
		});	
};

export.

exports.postAppointment = (req, res, next) => {};

exports.getAppointment = (req, res, next) => {};
