const ProductModel = require("../models/product.model");

// [CREATE] Thêm sản phẩm
// http://localhost:3001/api/product/create
module.exports.createProduct = async (data) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      stock,
      thumbnail,
      featured,
      position,
    } = data;

    // Tạo sản phẩm
    const newProduct = await ProductModel.create({
      title,
      description,
      price,
      discountPercentage,
      stock,
      thumbnail,
      featured,
      position,
    });

    if (newProduct) {
      return {
        status: "OK",
        message: "SUCCESS",
        data: newProduct,
      };
    }
  } catch (e) {
    throw e;
  }
};

// [PATCH] Sửa sản phẩm
// http://localhost:3001/api/product/update/:id
module.exports.upDateProduct = async (id, data) => {
  try {
    const checkProduct = await ProductModel.findById(id);

    if (!checkProduct) {
      return {
        status: "ERR",
        message: "The product is not defined",
      };
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "OK",
      message: "SUCCESS",
      updateProduct,
    };
  } catch (e) {
    throw e;
  }
};

// [PATCH] Xóa sản phẩm (xóa mềm)
// http://localhost:3001/api/product/delete/:id
module.exports.deleteProduct = async () => {
  try {
    const checkProduct = await ProductModel.findById(id);

    if (!checkProduct) {
      return {
        status: "ERR",
        message: "The product is not defined",
      };
    }
    const deleteProduct = await ProductModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    return {
      status: "OK",
      message: "DELETE USER SUCCESS",
    };
  } catch (e) {
    throw e;
  }
};
