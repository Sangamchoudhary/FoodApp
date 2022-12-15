const express = require("express");
const reviewRouter = express.Router();
const { protectRoute } = require("../controller/authController");
const {
  getAllReview,
  top3review,
  getPlanReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controller/reviewController");

reviewRouter.route("/allReviews").get(getAllReview);

reviewRouter.route("/top3review").get(top3review);

reviewRouter.route("/:id").get(getPlanReview);

reviewRouter.use(protectRoute); // everything after this is protected

reviewRouter
  .route("/crud/:plan")
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = reviewRouter;
