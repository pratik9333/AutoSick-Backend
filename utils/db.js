const mongoose = require("mongoose");

exports.connect = () => {
  let dbUrl;
  if (process.env.NODE_ENV === "development") {
    dbUrl = process.env.MONGODB_DEVELOPMENT_URL;
  }
  if (process.env.NODE_ENV === "test") {
    dbUrl = process.env.MONGODB_TEST_URL;
  }
  if (process.env.NODE_ENV === "production") {
    dbUrl = process.env.MONGODB_PROD_URL;
  }

  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
};
