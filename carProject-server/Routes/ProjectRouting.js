const express = require("express");
const { body, validationResult } = require("express-validator");

const ProjectController = require("../Controllers/ProjectController");
const middleware = require("../middleware");
const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post(
  "/createProject",
  [
    body("name").isLength({ min: 2, max: 15}).withMessage("name 2-15"),
    body("score").isInt({ min: 0, max:100 }).withMessage("score 0-100"),
    body("durationInDays").isInt({ min: 1, max:30 }).withMessage("time of work 1-30"),
    body("bugsCount").isInt({ min: 0, max:30 }).withMessage("bugs Count 0-30"),
    body("madeDadeline").isLength({ min: 2, max: 3}).withMessage("made Dade line 2-3"),
  ],
  middleware.MiddlewareCheckTokenBody,
  ProjectController.createProject
);

router.get(
  "/getProject/:id",
  middleware.MiddlewareCheckTokenHeader,
  ProjectController.getProjectById
);

module.exports = router;
