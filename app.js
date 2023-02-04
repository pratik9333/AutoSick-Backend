require("dotenv").config();
const db = require("./utils/db");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");

// middlewares
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

//router middleware
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

module.exports = app;
