const ProductService = require("../services/product.service");

module.exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const result = await ProductService.createProduct();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
