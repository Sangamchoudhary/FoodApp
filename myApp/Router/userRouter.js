const express = require("express");
const userRouter = express.Router();
const {
  login,
  signup,
  logout,
  forgetPassword,
  resetPassword,
  isAuthorized,
  protectRoute,
} = require("../controller/authController");
const {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

// user's work
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/forgetPassword").post(forgetPassword);
userRouter.route("/resetPassword").post(resetPassword);
userRouter.route("/logout").get(logout);

userRouter.use(protectRoute); // user is now proteced for all below routes

userRouter.route("/userProfile").get(getUser); // using middleware - get profile page
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

// admin's work
userRouter.use(isAuthorized(["admin"])); // admin is authorized for all belowe routes

userRouter.route("/allUser").get(getAllUser); // admin

module.exports = userRouter;
