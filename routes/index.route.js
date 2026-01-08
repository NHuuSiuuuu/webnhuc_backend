const productRoute = require("./products.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");

module.exports = (app) => {
  app.use("/api", productRoute);
  app.use("/api", accountRoute);

//   Auth
  app.use("/api", authRoute);
};
