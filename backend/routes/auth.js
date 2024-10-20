const authRouter = require("express").Router();
const { loginUser, registerUser, logoutUser, changePassword } = require("../controllers/authController");
const { verifyToken } = require("../utils/jwt");
const { validateUserData } = require('../validators/userValidator');

authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(validateUserData(false), registerUser);
authRouter.route("/logout").get(logoutUser);
authRouter.route("/changepassword").post(changePassword);

module.exports = authRouter;