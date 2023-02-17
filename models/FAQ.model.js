const { default: mongoose } = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    maxlength: [70, "Question is too long"],
    required: [true, "Question is required"],
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  description: {
    type: String,
    maxlength: [150, "Description is too long"],
    required: [true, "Description is required"],
  },
  photo: { id: { type: String }, url: { type: String } },
  votes: {
    totalVotes: {
      type: Number,
      default: 0,
    },
    user: [],
  },
});

module.exports = mongoose.model("FAQ", FAQSchema);
