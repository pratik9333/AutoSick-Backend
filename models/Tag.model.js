const { default: mongoose } = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [10, "Tag name is too long"],
    required: [true, "Tag name is required"],
  },
});

module.exports = mongoose.model("Tag", tagSchema);
