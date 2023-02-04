const { default: mongoose } = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: { type: Number, required: true },
  description: {
    type: String,
    maxlength: [150, "Description is too long"],
    required: [true, "Description is required"],
  },
  receptor: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  status: { type: Boolean, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
