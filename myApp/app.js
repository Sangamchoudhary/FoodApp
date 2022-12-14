const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


app.use(express.json()); // middle  ware
app.listen(3000);
app.use(cookieParser());

// mini - app1 [user]
const userRouter = require("./Router/userRouter");
app.use("/user", userRouter); // base url, router-to-use

// mini - app2 [plan]
const planRouter = require("./Router/planRouter");
app.use("/plans", planRouter); // base url, router-to-use

// mini - app3 [review]
const reviewRouter = require("./Router/reviewRouter");
app.use("/review", reviewRouter); // base url, router-to-use