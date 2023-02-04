const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [70, "Question is too long"],
    required: [true, "Question is required"],
  },
  photo: { id: { type: String }, url: { type: String } },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  description: {
    type: String,
    maxlength: [150, "Description is too long"],
    required: [true, "Description is required"],
  },
  body: {
    type: String,
    required: [true, "Blog Body is required"],
  },
  likes: {
    type: Number,
    user: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    default: 0,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
