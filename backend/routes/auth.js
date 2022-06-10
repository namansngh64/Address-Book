const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  signin,
  signup,
  verifyOtp,
  signout,
  genToken,
  isSignedIn,
  isAuthenticated
} = require("../controllers/auth");
const { getUserById, updateUser, getUser } = require("../controllers/user");

//middleware
router.param("userId", getUserById);

//routes
router.post(
  "/signin",
  body("email", "Enter Valid Email").isEmail(),
  body("password", "Password Incorrect").isLength({ min: "1" }),
  body("isCookie").isBoolean(),
  signin //controller
);
router.post(
  "/signup",
  body("name", "Name should be atleast 3 chars").isLength({ min: "3" }),
  body("email", "Enter Valid Email").isEmail(),
  body("password", "Password should be atleast 5 chars").isLength({ min: "5" }),
  signup
);

router.post(
  "/verify/:userId",
  body("otp", "Should be 6 chars").isLength({ min: "6" }),
  verifyOtp
);

//User Route
router.put("/updateUser/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/getUser/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/signout", signout);
router.get("/gentoken", genToken);

module.exports = router;
