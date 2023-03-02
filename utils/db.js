const mongoose = require("mongoose");
const Appointment = require("../models/Apointment.model");

exports.connect = () => {
  let dbUrl = "";

  if (process.env.NODE_ENV === "development") {
    dbUrl = process.env.MONGODB_DEVELOPMENT_URL;
  } else if (process.env.NODE_ENV === "test") {
    dbUrl = process.env.MONGODB_TEST_URL;
  } else if (process.env.NODE_ENV === "production") {
    dbUrl = process.env.MONGODB_PROD_URL;
  } else {
    dbUrl = process.env.MONGODB_URL;
  }

  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
};

exports.createAppointment = (appointment) => {
  return new Promise((resolve, reject) => {
    Appointment.create(appointment).then(resolve).catch(reject);
  });
};

exports.getAppointmentsByUser = (user) => {
  return new Promise((resolve, reject) => {
    Appointment.find({ recipient: user }).then(resolve).catch(reject);
  });
};

exports.getAppointment = (appointment_id) => {
  return new Promise((resolve, reject) => {
    Appointment.findById(appointment_id).then(resolve).catch(reject);
  });
};

exports.createAppointment = (appointment) => {
  return new Promise((resolve, reject) => {
    Appointment.create(appointment).then(resolve).catch(reject);
  });
};

exports.getAppointmentsByUser = (user) => {
  return new Promise((resolve, reject) => {
    Appointment.find({ recipient: user }).then(resolve).catch(reject);
  });
};

exports.getAppointment = (appointment_id) => {
  return new Promise((resolve, reject) => {
    Appointment.findById(appointment_id).then(resolve).catch(reject);
  });
};
