const AccountService = require("../services/account.service");

module.exports.createAccount = async (req, res) => {
  try {
    console.log(req.body);
    const result = await AccountService.createAccount(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
