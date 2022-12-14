const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:Sangam9069@cluster0.dwo2uzx.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Review Model DB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = mongoose.Schema({
  review: { type: String, required: [true, "review is required"] },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "review is required"],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "userModel",
      required: [true, "review must belong to a user"],
    },
    plan: {
      type: mongoose.Schema.ObjectId,
      ref: "planModel",
      required: [true, "review must belong to a plan"],
    },
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;
