const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: "Email or password missing ",
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: "User id not given",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateIsAdminRequest
};
