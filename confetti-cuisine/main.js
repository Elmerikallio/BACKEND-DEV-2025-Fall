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
mongoose.connect(mongoUri);

const app = express();
const router = express.Router();

router.set("view engine", "ejs");
router.set("port", process.env.PORT || 3001);
router.use(
  express.urlencoded({
    extended: false,
  })
);

router.use(methodOverride("_method"));

router.use(express.json());
router.use(layout);
router.use(express.static("public"));
router.use(helmet());

router.get("/", (req, res) => {
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
router.get("/contact", homeController.postedSignUpForm);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

router.listen(router.get("port"), () => {
  console.log(`Server running at http://localhost:${router.get("port")}`);
});
