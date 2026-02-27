const express = require("express");
const {
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
} = require("vnpay");
const router = express.Router();

router.post("/create-qr", async (req, res) => {
  const vnpay = new VNPay({
    // ⚡ Cấu hình bắt buộc
    tmnCode: "IXC3X9T7",
    secureSecret: "W2AUFNXCL9S6JFD001FR42MKSENMHO6K",
    vnpayHost: "https://sandbox.vnpayment.vn",

    // 🔧 Cấu hình tùy chọn
    testMode: true, // Chế độ test
    hashAlgorithm: "SHA512", // Thuật toán mã hóa
    // enableLog: true, // Bật/tắt log
    loggerFn: ignoreLogger, // Custom logger

    // // 🔧 Custom endpoints
    // endpoints: {
    //   paymentEndpoint: "paymentv2/vpcpay.html",
    //   queryDrRefundEndpoint: "merchant_webapi/api/transaction",
    //   getBankListEndpoint: "qrpayauth/api/merchant/get_bank_list",
    // },
  });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const vnpayResponse = await vnpay.buildPaymentUrl({
    vnp_Amount: 100000, // 100,000 VND
    vnp_IpAddr: req.ip,
    vnp_TxnRef: "ORDER_123",
    vnp_OrderInfo: "Thanh toán đơn hàng #123",
    vnp_ReturnUrl: "http://localhost:3001/api/check-payment-vnpay",
    vnp_Locale: VnpLocale.VN,
    vnp_CreateDate: dateFormat(new Date()),
    vnp_ExpireDate: dateFormat(tomorrow),
  });

  return res.status(200).json(vnpayResponse);
});

router.get("/check-payment-vnpay", (req, res) => {
  console.log("req.query", req.query);
});

module.exports = router;
