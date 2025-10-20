"use strict";

import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.set("view engine", "ejs");
//import {homeController} from "./controllers/homeController.js";
//import {errorController} from "./controllers/errorController.js";
//import layouts from "express-ejs-layouts";
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

//app.get("/courses", homeController.showCourses);
//app.get("/contact", homeController.showSignUp);
//app.get("/contact", homeController.postedSignUpForm);

//app.use(errorController.pageNotFoundError);
//app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
