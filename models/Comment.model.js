const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    maxlength: [70, "Comment is too long"],
    required: [true, "Comment is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  replyingTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog",
  },
  forum: {
    type: mongoose.Schema.ObjectId,
    ref: "FAQ",
  },
});

module.exports = mongoose.model("Comment", commentSchema);

// sevaa250;
