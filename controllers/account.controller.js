const AccountService = require("../services/account.service");

module.exports.createAccount = async (req, res) => {
  try {
    // console.log(req.body);
    const { fullName, email, password, passwordConfirm, phone } = req.body; // thằng passwordConfirm này ko lưu trong model nó chỉ so sánh với password thôi

    // Kiểm tra email có đúng định dạng hay không
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const isCheckEmail = reg.test(email); // true là hợp lệ - false sai format
    if (!fullName || !email || !password || !phone) {
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
    const result = await AccountService.createAccount(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

// Hàm cập nhật account
module.exports.updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const data = req.body;

    if (!accountId) {
      return res.status(400).json({
        message: "The accountId is required",
      });
    }
    const result = await AccountService.updateAccount(accountId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

// Hàm xóa
module.exports.deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const token = req.headers;
    if (!accountId) {
      return res.status(400).json({
        message: "The accountId is required",
      });
    }
    const result = await AccountService.deleteAccount(accountId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
