const express = require("express");
const bookingRouter = express.Router();
const { createSession } = require("../controller/bookingController");
const { protectRoute } = require("../controller/authController");

bookingRouter.post("/createSession", protectRoute, createSession);
bookingRouter.get("/createSession", function (req, res) {
  res.sendFile("C:/Users/sanga/Desktop/backend/myApp/booking.html");
});

module.exports = bookingRouter;
