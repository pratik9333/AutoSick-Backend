require("dotenv").config();
const db = require("./utils/db");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");

const passport = require("passport");
const cookieSession = require("cookie-session");

require("./passport/passport");

// middlewares
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY],
  })
);

app.set("view engine", "ejs");

app.set("trust proxy", 1);

// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

const IPWhitelist = [
  process.env.APP_URL,
  process.env.SERVER_URL,
  "http://localhost:3001/",
];
const corsOptions = {
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: function (origin, callback) {
    if (IPWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
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
const { isLoggedIn } = require("./middlewares/checkLoginStatus.middleware");

//router middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/forum", forumRoutes);

app.get("/", isLoggedIn, (req, res) => {
  res.render("Home");
});
module.exports = app;
