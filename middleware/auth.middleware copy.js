const jwtService = require("../services/jwt.service");

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    // ❌ Không có access_token
    if (!accessToken) {
      return res.status(401).json({
        status: "ERR",
        message: "Chưa đăng nhập",
      });
    }

    try {
      // ✅ verify access_token
      const decoded = await jwtService.verifyToken(accessToken);

      // gán user vào req để dùng tiếp
      req.user = decoded;

      return next();
    } catch (err) {
      // 🔥 access_token hết hạn → thử refresh

      if (!refreshToken) {
        return res.status(401).json({
          status: "ERR",
          message: "Hết phiên đăng nhập",
        });
      }

      try {
        // verify refresh_token
        const decodedRefresh = await jwtService.verifyToken(refreshToken);

        // tạo access_token mới
        const newAccessToken = await jwtService.generalAccessToken({
          id: decodedRefresh.id,
          permissions: decodedRefresh.permissions,
        });

        // set cookie mới
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 15 * 60 * 1000,
        });

        // gán lại user
        req.user = decodedRefresh;

        return next();
      } catch (refreshErr) {
        return res.status(401).json({
          status: "ERR",
          message: "Refresh token không hợp lệ",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Lỗi server",
    });
  }
};