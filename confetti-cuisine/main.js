"use strict";

import dotenv from "dotenv";
import express from "express";
//import layouts from "express-ejs-layouts";
import mongoose from "mongoose";
import { errorController } from "./controllers/errorController.js";
import { homeController } from "./controllers/homeController.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri);
const app = express();

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3001);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.get("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
