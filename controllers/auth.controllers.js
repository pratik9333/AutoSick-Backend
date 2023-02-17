exports.signout = (req, res) => {
  req.logout();
  res.redirect("http://localhost:3001");
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
