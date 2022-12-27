const express = require("express");
const multer = require("multer");
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
  updateProfileImage,
} = require("../controller/userController");

// user's work
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/forgetPassword").post(forgetPassword);
userRouter.route("/resetPassword/:token").post(resetPassword);
userRouter.route("/logout").get(logout);

// ------------------------------ Multer's work ------------------------------------------
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Not an image! Upload an image"), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});

userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);
userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile("C:/Users/sanga/Desktop/backend/myApp/multer.html");
});

// ---------------------------------------------------------------------------------------

userRouter.use(protectRoute); // user is now proteced for all below routes

userRouter.route("/userProfile").get(getUser); // using middleware - get profile page
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

// admin's work
userRouter.use(isAuthorized(["admin"])); // admin is authorized for all belowe routes

userRouter.route("/allUser").get(getAllUser); // admin

module.exports = userRouter;
