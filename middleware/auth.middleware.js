// Chỉ admin mới xóa được user
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.authMiddleWare = (req, res, next) => {
  // jwt.verify() dùng để:
  // Kiểm tra token có hợp lệ không
  // Kiểm tra token có bị giả mạo không
  // Lấy dữ liệu đã được mã hóa trong token

  //   console.log("check token", req.headers.authorization); //Bearer eyJhbGciOiJIUzI1NiIs...: Bearer là tên kiểu xác thực trong HTTP - Kiểu basic nữa nó gửi Username + pw còn bearer gửi token
  const token = req.headers.authorization.split(" ")[1]; // jwt.verify() chỉ nhận token không nhận chữ Bearer
  //   console.log("token", token)

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, account) {
    if (err) {
      return res.status(403).json({
        message: "The authemtication", // Có sự cố xác thực
      });
    }
    console.log("account", account);
    // account {
    //     payload: { id: '695fdcc629dd3a79167420bc', role_id: '0123456789'},
    //     iat: 1767890225,
    //     exp: 1767893825
    // }
    // -------------------------------------------------------------------------
    // const { payload } = account;
    // // Nếu là admin thì cho đi tiếp
    // if (payload.isAdmin) {
    //   console.log("true");
    //   next();
    // } else {
    //   return res.status(403).json({
    //     message: "The authemtication",
    //   });
    // }
  });
};
