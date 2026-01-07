const productRoute = require("./products.route");

module.exports = (app) => {
  app.use("/", productRoute);
};
