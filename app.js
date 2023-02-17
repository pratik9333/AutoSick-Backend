require("dotenv").config();
const db = require("./utils/db");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");

const passport = require("passport");
const cookieSession = require("cookie-session");

const { isLoggedIn } = require("./middlewares/checkLoginStatus.middleware");

require("./passport/passport");

// middlewares
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY],
  })
);


// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3001", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

db.connect()
  .then(() => {
    console.log("Database connected!");
  })
  .catch(console.log);


// importing all routes
const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");
const authRoutes = require("./routes/auth.routes");
const forumRoutes = require("./routes/faq.routes");

//router middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/forum", forumRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from our api" });
});
module.exports = app;
