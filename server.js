const app = require("./app");
const cloudinary = require("cloudinary");

//cloudinary config goes here
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App started on PORT: ${PORT}`);
});
