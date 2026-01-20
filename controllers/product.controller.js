const ProductService = require("../services/product.service");

// [CREATE] Thêm sản phẩm
// http://localhost:3001/api/product/create
module.exports.createProduct = async (req, res) => {
  try {
    const { title, price, discountPercentage, stock, category_id } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (price === undefined || isNaN(price)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    if (discountPercentage === undefined || isNaN(discountPercentage)) {
      return res
        .status(400)
        .json({ message: "Discount percentage must be a number" });
    }

    if (stock === undefined || isNaN(stock)) {
      return res.status(400).json({ message: "Stock must be a number" });
    }

    const result = await ProductService.createProduct(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
    });
  }
};

// [PATCH] Sửa sản phẩm
// http://localhost:3001/api/product/update/:id
module.exports.updateProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const data = req.body;
    if (!idProduct) {
      return res.status(400).json({
        message: "The idProduct is required",
      });
    }

    const result = await ProductService.upDateProduct(idProduct, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
    });
  }
};

// [PATCH] Xóa sản phẩm (xóa mềm)
// http://localhost:3001/api/product/delete/:id
module.exports.deleteProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    if (!idProduct) {
      return res.status(400).json({
        message: "The productID is required",
      });
    }

    const result = await ProductService.deleteProduct(idProduct);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
    });
  }
};

// [GET] Chi tiết sản phẩm
// http://localhost:3001/api/product/detail/:id
module.exports.detailProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    if (!idProduct) {
      res.status(400).json({
        status: "ERR",
        message: "The idProduct is required",
      });
    }
    const result = await ProductService.detailProduct(idProduct);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: message.e || e,
    });
  }
};

// [GET] Danh sách các sản phẩm
// http://localhost:3001/api/product/products
module.exports.products = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    // Lấy sort trên url:sort=price:asc từ dạng string ==> mảng ==> obj rồi sử dụng truy vấn với sort

    const result = await ProductService.products(
      Number(limit) || 5,
      Number(page) || 0,
      sort,
      filter,
    );

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
