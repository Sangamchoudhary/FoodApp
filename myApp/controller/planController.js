const planModel = require("../Models/planModel");

module.exports.getAllPlan = async function getAllPlan(req, res) {
  try {
    const plans = await planModel.find();
    if (!plans) return res.json({ message: "no plans found" });
    res.json({ message: "all plans fetched", plans: plans });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    const id = req.params.id;
    const plan = await planModel.findById(id);
    if (!plan) return res.json({ message: "no plan found" });
    res.json({ message: "plan fetched", plans: plan });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    const planData = req.body;
    if (!planData) return res.json({ message: "plan empty" });
    const createdPlan = await planModel.create(planData);
    res.json({ message: "plan created", plan: createdPlan });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.json({ message: "trying to delete invalid plan" });
    let deletedPlan = await planModel.findByIdAndDelete(id);
    res.json({ message: "plan deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.json({ message: "trying to update wrong plan" });
    let dataToBeUpdate = req.body;
    let keys = [];
    for (let key in dataToBeUpdate) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdate[keys[i]];
    }
    await plan.save();
    res.json({ message: "plan updated successfully", updatedPlan: plan });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.top3Plans = async function top3Plans(req, res) {
  try {
    let top3Plans = await planModel.find().sort({ ratingAverage: -1 }).limit(3);
    res.json({ message: "top 3 plans fetched", top3Plans: top3Plans });
  } catch (error) {
    res.json({ error: error.message });
  }
};
