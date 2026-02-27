const { default: mongoose } = require("mongoose");
const OrderService = require("../services/order.service");
module.exports.createOrder = async (req, res) => {
  try {
    const result = await OrderService.createOrder(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.index = async (req, res) => {
  try {
    const result = await OrderService.index();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.detailOrder = async (req, res) => {
  try {
    const result = await OrderService.detailOrder();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.successOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await OrderService.successOrder(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.tracking = async (req, res) => {
  try {
    const { phone, orderId } = req.body;
    if (!phone && !orderId) {
      return res.status(400).json({
        message: "Vui lòng nhập mã đơn hoặc số điện thoại",
      });
    } else if (orderId && !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "ID không hợp lệ. Vui lòng kiểm tra lại định dạng.",
      });
    } else if (phone && !/^(0|\+84)[0-9]{9}$/.test(phone)) {
      return res.status(400).json({
        message: "Số điện thoại không đúng định dạng Việt Nam",
      });
    }

    const result = await OrderService.tracking(phone, orderId);
    return res.status(200).json({
      message: "Tra  cứu thành công!",
      data: result,
    });
  } catch (e) {
      return res.status(e.status || 500).json({
      message: e.message || "Lỗi server",
    });

  }
};
