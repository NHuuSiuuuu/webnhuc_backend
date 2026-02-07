const CartModel = require("../models/cart.model");

module.exports.createCart = async (data) => {
  try {
    const { cart_id, product_id, quantity, size_id } = data;
    // Kiem tra xem da co cart chua?
    let cart = await CartModel.findOne({ cart_id });

    if (!cart) {
      // Chua co thi tao
      const newCart = await CartModel.create({
        cart_id,
        products: [{ product_id, quantity, size_id }],
      });
      return {
        status: "OK",
        message: "SUCCESS",
        newCart,
      };
    }
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa? nếu có rồi thì chỉ tăng số lượng thôi
    const existProductInCart = cart.products.find(
      (item) => item.product_id.toString() === product_id,
    );

    // Thằng find nó sẽ trả về obj có cùng id
    console.log("existProductInCart", existProductInCart);
    if (existProductInCart) {
      existProductInCart.quantity += 1;
    } else {
      // Chưa tồn tại thì push vào mảng products thôi
      cart.products.push({ product_id, quantity, size_id });
    }
    await cart.save();

    console.log("existProductInCart", existProductInCart);
  } catch (e) {
    throw e;
  }
};

module.exports.getCart = async (cart_id) => {
  try {
    const cart = await CartModel.findOne({ cart_id }).populate(
      "products.product_id",
      " title price discountPercentage slug thumbnail sizes ",
    );

    return {
      status: "OK",
      message: "SUCCESS",
      cart,
    };
  } catch (e) {
    throw e;
  }
};

module.exports.deleteProductInCart = async (cart_id, product_id, size_id) => {
  try {
    const cart = await CartModel.updateOne(
      {
        cart_id: cart_id,
      },
      {
        // Loại bỏ obj này khỏi mảng products
        $pull: {
          products: { product_id: product_id, size_id: size_id },
        },
      },
    );
    return {
      status: "OK",
      message: "SUCCESS",
      cart,
    };
  } catch (e) {
    throw e;
  }
};

module.exports.updateProductInCart = async (
  cart_id,
  product_id,
  size_id,
  quantity,
) => {
  try {
    console.log("cart_id", cart_id);
    console.log("product_id", product_id);
    console.log("size_id", size_id);
    console.log("quantity", quantity);
    const cart = await CartModel.updateOne(
      {
        cart_id: cart_id,
        "products.product_id": product_id,
        "products.size_id": size_id,
      },
      {
        $set: {
          // Thằng $ là để tìm phần tử ĐẦU TIÊN trong mảng products thỏa mãn điều kiện query trên kia
          "products.$.quantity": quantity,
        },
      },
      {
        new: true,
      },
    );
    return {
      status: "OK",
      message: "SUCCESS",
      cart,
    };
  } catch (e) {
    throw e;
  }
};
