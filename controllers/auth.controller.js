const AuthService = require("../services/auth.service");

// http://localhost:3001/api/login
module.exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, passwordConfirm, phone } = req.body; // thằng passwordConfirm này ko lưu trong model nó chỉ so sánh với password thôi

    // Kiểm tra email có đúng định dạng hay không
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const isCheckEmail = reg.test(email); // true là hợp lệ - false sai format
    if (!email || !password || !phone) {
      return res.status(400).json({
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        message: "The input is email",
      });
    } else if (password != passwordConfirm) {
      return res.status(400).json({
        message: "The password is equal confirmPassword",
      });
    }

    // Gọi service xử lý tạo Account và trả kết quả cho client
    const result = await AuthService.Login(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const result = await AuthService.refreshToken(refresh_token);

    if (result.status === "ERR") {
      return res.status(403).json(result);
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
