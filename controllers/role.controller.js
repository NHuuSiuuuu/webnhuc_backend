const RoleService = require("../services/roles.service");

module.exports.create = async (req, res) => {
  try {
    const result = await RoleService.create(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await RoleService.update(id, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await RoleService.delete(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports.index = async (req, res) => {
  try {
    const result = await RoleService.index();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
module.exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await RoleService.detail(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
