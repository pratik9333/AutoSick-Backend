const User = require("../models/User.model");
const { uploadPhotoAndReturnUrl } = require("../utils/uploadPhoto");

exports.updateProfile = async (req, res) => {
  try {
    if (req.files) {
      const photo = await uploadPhotoAndReturnUrl("users", req);
      req.body.photo = photo.url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
