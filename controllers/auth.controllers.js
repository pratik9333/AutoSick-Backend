exports.signout = (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: "Logout successfull" });
  //res.redirect("http://localhost:8000/api/v1/auth/login");
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
