const express = require("express");
const planRouter = express.Router();
const { protectRoute, isAuthorized } = require("../controller/authController");
const {
  getAllPlan,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  top3Plans,
} = require("../controller/planController");

planRouter.route("/top3Plans").get(top3Plans);
planRouter.route("/allPlan").get(getAllPlan);

planRouter.use(protectRoute);

planRouter.route("/plan/:id").get(getPlan);

planRouter.use(isAuthorized(["admin"]));

planRouter.route("/crudplan").post(createPlan);

planRouter.route("/crudplan/:id").patch(updatePlan).delete(deletePlan);

module.exports = planRouter;
