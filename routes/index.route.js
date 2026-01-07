const productRoute = require("./products.route");
const accountRoute = require("./account.route");

module.exports = (app) => {
  app.use("/api", productRoute);
  app.use("/api", accountRoute);
};
