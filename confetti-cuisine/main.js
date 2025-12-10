"use strict";

import dotenv from "dotenv";
import express from "express";
import layout from "express-ejs-layouts";
import helmet from "helmet";
import methodOverride from "method-override";
import mongoose from "mongoose";
import { errorController } from "./controllers/errorController.js";
import { homeController } from "./controllers/homeController.js";
import { subscriberController } from "./controllers/subscriberController.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo connection error", err));

const app = express();
const router = express.Router();

// app settings
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3001);

// middleware
app.use(layout);
app.use(express.static("public"));
app.use(helmet());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.render("index");
});

router.get(
  "/subscribers",
  subscriberController.index,
  subscriberController.indexView
);

router.get("/subscribers/new", subscriberController.newView);

router.post(
  "/subscribers/create",
  subscriberController.create,
  subscriberController.redirectView
);

router.get(
  "/subscribers/:id",
  subscriberController.show,
  subscriberController.showView
);

router.get("/subscribers/:id/edit", subscriberController.edit);

router.put(
  "/subscribers/:id/update",
  subscriberController.update,
  subscriberController.redirectView
);

router.delete(
  "/subscribers/:id/delete",
  subscriberController.deleteSubscriber,
  subscriberController.redirectView
);

router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);

router.post("/contact", homeController.postedSignUpForm);

// plug router into app
app.use("/", router);

// error handlers
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// start server
const port = app.get("port");
app.listen(port, () => {
  console.log(`Server running at http://localhost:${"port"}`);
});
