const reviewModel = require("../Models/reviewModel");
const planModel = require("../Models/planModel");

module.exports.getAllReview = async function getAllReview(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (!reviews) return res.json({ message: "no review found" });
    res.json({ message: "reviews fetched", data: reviews });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.top3review = async function top3review(req, res) {
  try {
    const reviews = await reviewModel
      .find()
      .sort({
        averageRating: -1,
      })
      .limit(3);
    if (!reviews) return res.json({ message: "no review found" });
    res.json({ message: "reviews fetched", data: reviews });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.getPlanReview = async function getPlanReview(req, res) {
  try {
    const id = req.params.id;
    const reviews = await reviewModel.find(id);
    if (!reviews) return res.json({ message: "no review found with this id" });
    res.json({ message: "reviews fetched", data: reviews });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.createReview = async function createReview(req, res) {
  try {
    const id = req.params.plan;
    const plan = await planModel.findById(id);
    const reviewToBeCreated = req.body;
    const review = await reviewModel.create(reviewToBeCreated);
    plan.averageRating = (plan.averageRating + review.averageRating) / 2;
    await plan.save();
    res.json({ message: "review created", data: review });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.updateReview = async function updateReview(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.json({ message: "trying to update wrong review" });
    let dataToBeUpdate = req.body;
    let keys = [];
    for (let key in dataToBeUpdate) {
      keys.push(key);
    }
    let review = await reviewModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdate[keys[i]];
    }
    await review.save();
    res.json({ message: "plan updated successfully", updatedPlan: plan });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.json({ message: "trying to delete wrong review" });
    let review = await reviewModel.findByIdAndDelete(id);
    res.json({ message: "plan deleted successfully", deletedReview: review });
  } catch (error) {
    res.json({ error: error.message });
  }
};
