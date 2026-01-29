const productRoute = require("./products.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const productCategoryRoute = require("./product-category.route");
const roleRoute = require("./role.route");
const { authMiddleWare } = require("../middleware/auth.middleware");

module.exports = (app) => {
  // Product
  app.use("/api/product", authMiddleWare, productRoute);

  // Product Category
  app.use("/api/category-product", authMiddleWare, productCategoryRoute);

  app.use("/api/account", authMiddleWare, accountRoute);

  //   Auth
  app.use("/api", authRoute);

  // Roles
  app.use("/api/roles", authMiddleWare, roleRoute);
};
