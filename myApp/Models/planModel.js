const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:Sangam9069@cluster0.dwo2uzx.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Plan Model DB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "plan name must be less than 20 char"],
  },
  duration: { type: Number, required: [true, "duration not entered"] },
  price: { type: Number, required: [true, "price not entered"] },
  ratingAverage: { type: Number },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "discount cannott be more than price",
    ],
  },
});

const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//     try{
//   let planObj = {
//     name: "food panda - 100",
//     duration: 3,
//     price: 600,
//     ratingAverage: 3,
//     discount: 20,
//   };
//   const data = await planModel.create(planObj);
// //   const data = new planModel(planObj);
// //   await data.save();
// }catch(err){
//     console.log(err.message);
// }
// })();

module.exports = planModel;
