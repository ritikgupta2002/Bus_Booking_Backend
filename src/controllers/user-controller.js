const UserService = require("../services/user-service");

const userService = new UserService();

const register = async (req, res) => {
  try {
    const response = await userService.register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      messasge: response.message,
      data: { verificationCode: response.verificationCode },
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messasge: error.messasge,
      data: {},
      err: error.explanation,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const response = await userService.verifyEmail({
      email: req.body.email,
      verificationCode: req.body.verificationCode,
    });
    return res.status(201).json({
      success: true,
      message: "Email verified successfully, user registered",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ",
      data: {},
      err: error.message||error.error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      message: "successfully signed in ",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "invalid email or password",
      data: {},
      err: error.explanation,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      message: "user is authenticated and token is valid ",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong ",
      data: {},
      err: error,
      success: false,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: `user is admin-${response}`,
      err: {},
      success: true,
      message: "Successfully fetched whether user is admin ",
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  register,
  verifyEmail,
  signIn,
  isAuthenticated,
  isAdmin,
};
