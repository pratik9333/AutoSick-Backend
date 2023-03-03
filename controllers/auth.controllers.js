const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.signout = (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: "Logout successfull" });
  //res.redirect("http://localhost:8000/api/v1/auth/login");
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.find({ email });
    if (user.length !== 0) {
      return res
        .status(400)
        .json({ error: "Email is in use, please use different email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // logging in the user
    req.login(newUser, function (err) {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Login success" });
      } else {
        return res
          .status(500)
          .json({ error: "login failed, please try again" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Signup failed, please try again" });
  }
};

exports.loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
};
