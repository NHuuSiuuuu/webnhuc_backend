const ProductCategoryService = require("../services/product-category.service");

// [CREATE] Tạo danh mục sản phẩm
// http://localhost:3001/api/category-product/create
module.exports.create = async (req, res) => {
  try {
    const { title, description, thumbnail, status, position } = req.body;
    if (!title || !description || !thumbnail || !status || !position) {
      return res.status(400).json({
        message: "The input is required",
      });
    }
    const result = await ProductCategoryService.create(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// [PATCH] Sửa danh mục sản phẩm
// http://localhost:3001/api/category-product/update/:id
module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      res.status(400).json({
        message: "The idCategory is required",
      });
    }
    const result = await ProductCategoryService.update(id, data);
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: e.message || e,
    });
  }
};

// [PATCH] Xóa danh mục sản phẩm
// http://localhost:3001/api/category-product/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: "The idCategory is required",
      });
    }
    const result = await ProductCategoryService.delete(id);
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: e.message || e,
    });
  }
};

// [GET] Chi tiết danh mục sản phẩm
// http://localhost:3001/api/category-product/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "The id is required",
      });
    }
    const result = await ProductCategoryService.detailProductCategory(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
    });
  }
};

// [GET] Danh sách các danh mục sản phẩm
// http://localhost:3001/api/category-product/productCategories?page=1
module.exports.productCategories = async (req, res) => {
  try {
    const { limit = 2, page=0 } = req.query;
    const result = await ProductCategoryService.productCategories(
      Number(limit) || 2,
      Number(page) || 0
    );
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
    });
  }
};
