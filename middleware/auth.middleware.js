// Chỉ admin mới xóa được user
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Để có quyền vào các trang thì phải đi qua được bước xác thưc này

module.exports.authMiddleWare = (req, res, next) => {
  // jwt.verify() dùng để:
  // Kiểm tra token có hợp lệ không
  // Kiểm tra token có bị giả mạo không
  // Lấy dữ liệu đã được mã hóa trong token

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Missing Authorization header",
    });
  }
  const token = authHeader.split(" ")[1]; // jwt.verify() chỉ nhận token không nhận chữ Bearer
  //   console.log("check token", req.headers.authorization); //Bearer eyJhbGciOiJIUzI1NiIs...: Bearer là tên kiểu xác thực trong HTTP - Kiểu basic nữa nó gửi Username + pw còn bearer gửi token
  console.log("token", token);
  // decoded = { id, permissions, iat, exp }

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      console.log("JWT ERROR: ", err.message);
      return res.status(403).json({
        message: "The authentication", // Có sự cố xác thực
      });
    }
    req.account = decoded;
    // console.log("account", account);
    next();
  });
};
