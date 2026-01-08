const jwt = require("jsonwebtoken");

module.exports.generalAccessToken = async (payload) => {
  console.log("payload", payload);
  const accessToken = jwt.sign(
    {
      payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );
  return accessToken;
};

module.exports.generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    {
      expiresIn: "365d",
    }
  );
  return refresh_token;
};
