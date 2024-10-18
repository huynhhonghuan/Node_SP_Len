const authRouter = require("express").Router();
const { loginUser, registerUser, logoutUser } = require("../controllers/authController");
const { verifyToken } = require("../utils/jwt");
const { validateUserData } = require('../validators/userValidator');

authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(validateUserData(false), registerUser);
authRouter.route("/logout").get(logoutUser);

module.exports = authRouter;