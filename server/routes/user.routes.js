import express from "express";
import {
  userLogin,
  userSignup,
  userVerification,
  resendOTP,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.post("/verify", userVerification);

router.post("/resend-otp", resendOTP);

export default router;
