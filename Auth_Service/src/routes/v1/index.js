const express = require("express");
const rateLimit = require("express-rate-limit");
const UserController = require("../../controllers/user-controller");
const router = express.Router();
const {
  AuthRequestValidators,
  ValidateIsAdminRequest,
} = require("../../middlewares/index.js");

const signupLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests to /signup, please try again after 5 mins",
});

const signinLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests to /signin, please try again after 5 mins",
});

const verifyEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests to /verifyEmail, please try again after 5 mins",
});

router.post(
  "/signup",
  signupLimiter,
  AuthRequestValidators.validateUserAuth,
  UserController.register
);
router.post(
  "/signin",
  signinLimiter,
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);
router.post("/verifyEmail", verifyEmailLimiter, UserController.verifyEmail);

router.get("/isAuthenticated", UserController.isAuthenticated);

router.get(
  "/isAdmin",
  AuthRequestValidators.validateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;
