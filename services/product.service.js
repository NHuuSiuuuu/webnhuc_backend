const ProductModel = require("../models/product.model");
const AccountModel = require("../models/account.model");

// [CREATE] Thêm sản phẩm
// http://localhost:3001/api/product/create
module.exports.createProduct = async (data) => {
  try {
    let {
      title,
      description,
      price,
      discountPercentage,
      stock,
      thumbnail,
      featured,
      position,
      status,
      category_id,
    } = data;

    if (!position) {
      const countProduct = await ProductModel.countDocuments();
      position = countProduct + 1;
    }

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
      category_id,
    });

    console.log(data);

    return {
      status: "OK",
      message: "SUCCESS",
      data: newProduct,
    };
  } catch (e) {
    throw e;
  }
};

// [PATCH] Sửa sản phẩm
// http://localhost:3001/api/product/update/:id
module.exports.upDateProduct = async (id, data, idAccount) => {
  try {
    const checkProduct = await ProductModel.findById(id);

    if (!checkProduct) {
      return {
        status: "ERR",
        message: "The product is not defined",
      };
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...data,
        $push: {
          updatedBy: {
            account_id: idAccount,
            updatedAt: new Date(),
          },
        },
      },
      {
        new: true,
      },
    );
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
module.exports.deleteProduct = async (id) => {
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
      { new: true },
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
    const find = {
      deleted: false,
    };

    /* ======================
      Lọc (filter=status:active)
    ====================== */
    if (filter) {
      // Nếu chỉ có 1 filter
      if (typeof filter == "string") {
        // Dùng cú pháp destructuring
        const [field, value] = filter.split(":");
        find[field] = value;
      }

      // Nếu có nhiều filter - nhiều query param trùng tên sẽ trả về ARRAY
      if (Array.isArray(filter)) {
        filter.forEach((item) => {
          const [filed, value] = item.split(":");
          find[filed] = value;
        });
      }
    }

    /* ======================
      Sắp xếp (sort=price:asc)
    ====================== */
    let objSort = { title: 1 }; // Mặc định sắp xếp A-Z
    if (sort) {
      const [field, order] = sort.split(":"); // [price, asc]
      if (order === "asc") {
        objSort = { [field]: 1 }; // { price: 1 }
      } else {
        objSort = { [field]: -1 };
      }
    }

    // console.log(find);

    const products = await ProductModel.find(find)
      .populate("updatedBy.account_id", "fullName email") // Chỉ lấy fullName và email thôi
      .limit(limit)
      .skip(limit * page)
      .sort(objSort);

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
