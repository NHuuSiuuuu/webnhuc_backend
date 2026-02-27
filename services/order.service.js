const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const OrderModel = require("../models/order.model");
const ShippingMethodModel = require("../models/shippingMethod.model");

module.exports.createOrder = async (data) => {
  try {
    const { cart_id, customer } = data;
    const orderProducts = [];

    // Kiem tra xem da co cart chua?
    let cart = await CartModel.findOne({ cart_id });
    // console.log("cart", cart);
    let totalPrice = 0;
    let totalQuantity = 0;
    // lấy mảng id sản phẩm
    const productIds = cart.products.map((p) => p.product_id);
    // Lấy ra tất cả sản phẩm cùng 1 lúc - Mảng chứa tất cả sản phẩm
    const productsDB = await ProductModel.find({
      _id: { $in: productIds },
    });

    for (const item of cart.products) {
      const product = productsDB.find(
        (p) => p._id.toString() === item.product_id.toString(),
      );
      const priceAfterDiscount =
        product.price * (1 - Number(product.discountPercentage || 0) / 100);

      totalPrice += priceAfterDiscount * item.quantity;

      totalQuantity += item.quantity;

      orderProducts.push({
        product_id: item.product_id,
        size_id: item.size_id,
        quantity: item.quantity,
        price: priceAfterDiscount,
      });
      // console.log("product:", priceAfterDiscount);
    }
    // console.log(totalQuantity);

    // Phương thức vận chuyển: Đơn hàng mà có giá đạt ngưỡng free shiping
    const shipping = await ShippingMethodModel.findOne({
      code: customer.shippingMethod,
    });
    let shippingFee = shipping.fee;
    if (totalPrice >= shipping.freeThreshold) {
      shippingFee = 0;
    }
    const finalPrice = totalPrice + shippingFee;
    // console.log("Shipping", finalPrice);

    const shippingMethod = await ShippingMethodModel.findOne({
      code: customer.shippingMethod,
    });
    console.log("shippingMethod", orderProducts);
    // Tạo order
    const order = await OrderModel.create({
      cart_id: cart_id,
      customer: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        note: customer.note,
        address: {
          detail: customer.address.detail,
          ward: customer.address.ward,
          district: customer.address.district,
          province: customer.address.province,
        },
      },
      items: orderProducts,
      shippingMethod: shippingMethod._id,

      paymentMethod: customer.paymentMethod,
      totalPrice,

      finalPrice,
      shippingFee,
      totalQuantity,
      orderStatus: "pending",
      orderTimeLine: [
        {
          status: "pending",
          time: new Date(),
        },
      ],
    });

    // // Sau khi tạo thành công order thì trừ số lượng của sản phẩm đã đặt hàng trong database
    // for (const item of cart.products) {
    //   const product = productsDB.find(
    //     (p) => p._id.toString() === item.product_id.toString(),
    //   );

    //   const size = product.sizes.find(
    //     (s) => s._id.toString() === item.size_id.toString(),
    //   );
    //   size.stock = size.stock - item.quantity;
    //   await product.save();
    // }

    // update lại giỏ hàng
    // await CartModel.updateOne({ cart_id }, { products: [] });

    return {
      status: "OK",
      message: "success",
      order,
    };
  } catch (e) {
    throw e;
  }
};

module.exports.index = async () => {
  try {
    const orders = await OrderModel.find().populate(
      "items.product_id",
      "title",
    );
    return {
      status: "OK",
      message: "success",
      orders,
    };
  } catch (e) {
    throw e;
  }
};

module.exports.detailOrder = async () => {
  try {
    return {
      status: "OK",
      message: "success",
    };
  } catch (e) {
    throw e;
  }
};

module.exports.successOrder = async (id) => {
  try {
    const order = await OrderModel.findById(id).populate(
      "items.product_id",
      "title thumbnail sizes",
    );
    console.log(order);

    return {
      status: "OK",
      message: "success",
      order,
    };
  } catch (e) {
    throw e;
  }
};

// Tra cứu đơn hàng
module.exports.tracking = async (phone, orderId) => {
  try {
    if (phone && orderId) {
      const phoneExist = await OrderModel.exists({ "customer.phone": phone });
      if (!phoneExist) {
        throw {
          status: 404,
          message: "Số điện thoại không tồn tại!",
        };
      }
      const orderExist = await OrderModel.findOne({ _id: orderId });

      if (!orderExist) {
        return {
          status: "ERROR",
          message: "Đơn hàng không tồn tại!",
        };
      }
      const order = await OrderModel.find({
        "customer.phone": phone,
        _id: orderId,
      });

      return {
        message: "success",
        order,
      };
    } else if (phone) {
      const order = await OrderModel.find({ "customer.phone": phone });
      if (order.length === 0) {
        throw {
          status: 404,
          message: "Số điện thoại này không tồn tại.",
        };
      }
      return {
        message: "success",
        order,
      };
    } else if (orderId) {
      const order = await OrderModel.find({ _id: orderId });
      if (order.length === 0) {
        throw {
          status: 404,
          message: "Mã đơn hàng không tồn tại.",
        };
      }
      return {
        message: "success",
        order,
      };
    }
  } catch (e) {
    throw e;
  }
};

// module.exports.deleteProductInCart = async (cart_id, product_id, size_id) => {
//   try {
//     const cart = await CartModel.updateOne(
//       {
//         cart_id: cart_id,
//       },
//       {
//         // Loại bỏ obj này khỏi mảng products
//         $pull: {
//           products: { product_id: product_id, size_id: size_id },
//         },
//       },
//     );
//     return {
//       status: "OK",
//       message: "SUCCESS",
//       cart,
//     };
//   } catch (e) {
//     throw e;
//   }
// };

// module.exports.updateProductInCart = async (
//   cart_id,
//   product_id,
//   size_id,
//   quantity,
// ) => {
//   try {
//     console.log("cart_id", cart_id);
//     console.log("product_id", product_id);
//     console.log("size_id", size_id);
//     console.log("quantity", quantity);
//     const cart = await CartModel.updateOne(
//       {
//         cart_id: cart_id,
//         "products.product_id": product_id,
//         "products.size_id": size_id,
//       },
//       {
//         $set: {
//           // Thằng $ là để tìm phần tử ĐẦU TIÊN trong mảng products thỏa mãn điều kiện query trên kia
//           "products.$.quantity": quantity,
//         },
//       },
//       {
//         new: true,
//       },
//     );
//     return {
//       status: "OK",
//       message: "SUCCESS",
//       cart,
//     };
//   } catch (e) {
//     throw e;
//   }
// };
