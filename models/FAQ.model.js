const { default: mongoose } = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    maxlength: [70, "Question is too long"],
    required: [true, "Question is required"],
  },
  description: {
    type: String,
    maxlength: [150, "Description is too long"],
    required: [true, "Description is required"],
  },
  photo: { id: { type: String }, url: { type: String } },
  votes: { type: Number, default: 0, select: false },
  comments: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
      comment: {
        type: String,
        required: [true, "Comment is required"],
      },
    },
  ],
});

module.exports = mongoose.model("FAQ", FAQSchema);
