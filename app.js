require("dotenv").config();
const db = require("./utils/db");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");

const passportConfig = require("./passport/passport");
const passport = require("passport");
const cookieSession = require("cookie-session");

// middlewares
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// home route
app.get("/", (req, res) => {
  res.send("<h1> Welcome to our api! </h1>");
});

db.connect()
  .then(() => {
    console.log("Database connected!");
  })
  .catch(console.log);

// importing all routes
const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");
const authRoutes = require("./routes/auth.routes");

//router middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

module.exports = app;
