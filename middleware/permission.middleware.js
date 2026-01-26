module.exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const permissions = req.account.permissions || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    next();
  };
};
