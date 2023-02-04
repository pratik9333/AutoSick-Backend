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
  body: {
    type: String,
    required: [true, "FAQ Body is required"],
  },
  tags: [{ type: mongoose.Schema.ObjectId, ref: "Tag" }],
  upvotes: { type: Number, default: 0, select: false },
  downvotes: { type: Number, default: 0, select: false },
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
