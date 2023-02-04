const mongoose = require('mongoose');
const Appointment = require('../models/Apointment.model');

exports.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(process.env.MONGO_URL)
			.then(() => {
				resolve();
			})
			.catch(reject);
	});
};

exports.createAppointment = (appointment) => {
	return new Promise((resolve, reject) => {
		Appointment.create(appointment)
			.then(resolve)
			.catch(reject);
	});
}

exports.getAppointmentsByUser = (user) => {
	return new Promise((resolve, reject) => {
		Appointment.find({ recipient: user })
			.then(resolve)
			.catch(reject);
	});
}

exports.getAppointment = (appointment_id) => {
	return new Promise((resolve, reject) => {
		Appointment.findById(appointment_id)
			.then(resolve)
			.catch(reject);
	});
}