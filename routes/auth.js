const express = require("express");

const authControllers = require("../controllers/authControllers");
const {
  validRegistrationRequest,
  validLoginRequest,
} = require("../middlewares/validationChecks");

const router = express.Router();

router.post(
  "/register",
  [validRegistrationRequest],
  authControllers.registerController
);

router.post("/login", [validLoginRequest], authControllers.loginController);

module.exports = router;
