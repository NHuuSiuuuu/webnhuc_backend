const AccountModel = require("../models/account.model");
const bcrypt = require("bcrypt");

const jwtService = require("../services/jwt.service");

module.exports.Login = async (accountLogin) => {
  try {
    const { email, password } = accountLogin;
    const checkAccount = await AccountModel.findOne({
      email: email,
    });

    //  1. Nếu không có email trong db
    if (!checkAccount) {
      return {
        status: "ERR",
        message: "The email is not defined",
      };
    }

    // 2.  Nếu có email: So sánh xem pw đã nhập và pw trong database khác gì nhau
    const comparePassword = await bcrypt.compare(
      password,
      checkAccount.password,
    );
    //   console.log("comparePassword", comparePassword);
    // 3. Nếu không bằng nhau
    if (!comparePassword) {
      return {
        status: "ERR",
        message: "The password is incorrect", // Mật khẩu không đúng
      };
    }
    console.log("đăng nhập thành côgn");
    // access token
    const access_token = await jwtService.generalAccessToken({
      id: checkAccount.id,
      role_id: checkAccount.role_id,
    });

    // refresh token
    const refresh_token = await jwtService.generalRefreshToken({
      id: checkAccount.id,
      role_id: checkAccount.role_id,
    });
    console.log("access_token", access_token);
    console.log("refresh_token", refresh_token);
    return {
      status: "OK",
      message: "SUCCESS",
      access_token: access_token, // trả về user mới login
      refresh_token: refresh_token,
    };
  } catch (e) {
    throw e;
  }
};
