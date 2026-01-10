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
      status,
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
      status,
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

// [GET] Chi tiết sản phẩm
// http://localhost:3001/api/product/detail/:id
module.exports.detailProduct = async (id) => {
  try {
    const find = {
      _id: id,
    };
    const product = await ProductModel.findOne(find);
    console.log(product);
    if (product) {
      return {
        status: "OK",
        product,
      };
    }
  } catch (e) {
    throw e;
  }
};

// [GET] Danh sách các sản phẩm
// http://localhost:3001/api/product/products?page....
module.exports.products = async (limit, page, sort, filter) => {
  try {
    // Sắp xếp
    // http://localhost:3001/api/product/products?page=0&sort=price:asc
    // console.log("sort: ", sort); //sort:   price:desc => dang string
    const sortArr = sort ? sort.split(":") : null; // chuyển sang mảng cắt từ dấu :
    // console.log(sortArr); // [ 'price', 'asc' ]

    // Sắp xếp
    if (sort) {
      const objSort = {};
      objSort[sortArr[0]] = sortArr[1]; // luc nay objSort : { price: 'desc' }
      const productsSort = await ProductModel.find({ deleted: false })
        .limit(limit)
        .skip(limit * page)
        .sort(objSort);
      return {
        status: "OK",
        message: "SUCCESS",
        productsSort,
      };
    }

    // Lọc
    // http://localhost:3001/api/product/products?page=0&filter=status:active
    const filterArr = filter ? filter.split(":") : null;
    if (filter) {
      const objFilter = {};
      objFilter[filterArr[0]] = filterArr[1];
      console.log(objFilter); //{ status: 'active' }

      const filterProducts = await ProductModel.find({
        deleted: false,
        ...objFilter,
      })
        .limit(limit)
        .skip(limit * page);

      return {
        status: "OK",
        message: "SUCCESS",
        filterProducts,
      };
    }

    const products = await ProductModel.find({ deleted: false })
      .limit(limit)
      .skip(limit * page)
      .sort({ title: 1 });

    // Tổng sản phẩm
    const totalProducts = await ProductModel.countDocuments({ deleted: false });
    if (products) {
      return {
        status: "OK",
        message: "SUCCESS",
        products,
        total: totalProducts,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProducts / limit),
      };
    }
  } catch (e) {
    throw e;
  }
};
