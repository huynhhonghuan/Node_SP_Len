const authRouter = require("express").Router();
const { loginUser, registerUser, logoutUser } = require("../controllers/authController");
const { verifyToken } = require("../utils/jwt");

authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(registerUser);
authRouter.route("/logout").get(logoutUser);

module.exports = authRouter;