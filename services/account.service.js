const AccountModel = require("../models/account.model");
const bcrypt = require("bcrypt");

module.exports.createAccount = async (newUser) => {
  try {
    const { fullName, email, password, phone } = newUser;
    const checkAccount = await AccountModel.findOne({
      email: email,
    });

    // Kiểm tra email tồn tại
    if (checkAccount) {
      return {
        status: "ERR",
        message: "The email is already",
      };
    }

    // Mã hóa mật khẩu. 10 Là số lần bcrypt lặp thuật toán băm Số càng lớn → hash càng chậm → khó bị brute-force hơn
    const hash = await bcrypt.hash(password, 10);

    // Tạo tài khoản
    const createAccount = await AccountModel.create({
      fullName,
      email,
      password: hash,
      phone,
    });

    // Trả về kết quả
    if (createAccount) {
      return {
        status: "OK",
        message: "SUCCESS",
        data: createAccount,
      };
    }
  } catch (e) {
    throw e;
  }
};
