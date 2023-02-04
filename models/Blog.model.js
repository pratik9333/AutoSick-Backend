const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [70, "Question is too long"],
    required: [true, "Question is required"],
  },
  photo: { id: { type: String }, url: { type: String } },
  description: {
    type: String,
    maxlength: [150, "Description is too long"],
    required: [true, "Description is required"],
  },
  body: {
    type: String,
    required: [true, "Blog Body is required"],
  },
  tags: [{ type: mongoose.Schema.ObjectId, ref: "Tag" }],
  likes: { type: Number, default: 0 },
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

module.exports = mongoose.model("Blog", blogSchema);
