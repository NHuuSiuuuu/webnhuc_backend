const productRoute = require("./products.route");
// const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const productCategoryRoute = require("./product-category.route");


module.exports = (app) => {

  // Product
  app.use("/api/product", productRoute);

  // Product Category
  app.use("/api/category-product",productCategoryRoute)

  // app.use("/api/account", accountRoute);

//   Auth
  app.use("/api", authRoute);
};
