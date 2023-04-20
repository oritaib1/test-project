const express = require("express");

const userController = require("../Controllers/UserController");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get("/checkToken", userController.checkToken);

router.post(
  "/create-user",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("firstName").isLength({ min: 2, max: 14}).withMessage("firstName 2-14"),
    body("lastName").isLength({ min: 2, max: 14}).withMessage("lastName 2-14"),
    body("phoneNumber").isInt().isLength({ min: 10, max: 10 }).withMessage("phone have to be 10 chart"),
    body('password').isLength({ min: 6, max: 10  }).withMessage('Password must be at least 6 characters long'),
  ],
  userController.createUser
);

router.post("/Login", userController.Login);
router.post("/checkEmail", userController.checkEmail);

module.exports = router;
