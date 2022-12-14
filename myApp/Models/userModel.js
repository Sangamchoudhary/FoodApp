const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db_link =
  "mongodb+srv://admin:Sangam9069@cluster0.dwo2uzx.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("User Model DB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

// Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: { type: String, required: true, minLength: 8 },
  confirmPassword: {
    type: String,
    minLength: 8,
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin"],
    default: "user",
  },
  profileImage: { type: String },
  resetPassword: String,
});

userSchema.pre("save", async function () {
  // it will run before saving
  this.confirmPassword = undefined;
  // let salt = await bcrypt.genSalt();
  // let hashedPassword = await bcrypt.hash(this.password,salt);
  // this.password = hashedPassword;
});

userSchema.post("save", function () {
  // it will run after saving
});

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return (this.resetToken = resetToken);
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

// model
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
