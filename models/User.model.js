const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [40, "User name is too long"],
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  photo: { id: { type: String }, url: { type: String } },
  location: String,
  bio: {
    type: String,
    maxlength: 100,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  expertiseIn: String,
  role: {
    type: String,
    enum: ["user", "expert"],
  },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
