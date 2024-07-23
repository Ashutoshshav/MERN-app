const express = require("express");
const { handleUserSignup, handleUserLogin, handleForgetPassword, handleCheckOTP, resetPassword } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/forgetpassword", handleForgetPassword);
router.post("/checkOTP", handleCheckOTP);
router.post("/resetPassword", resetPassword);

module.exports = router;
