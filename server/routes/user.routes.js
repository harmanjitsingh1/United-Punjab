import express from "express";
import {
  userLogin,
  userSignup,
  userVerification,
  resendOTP,
  contactUs,
  getMe,
  sendResetPassOtp,
  resetPassword,
  userLogout,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.post("/logout", isAuthenticated, userLogout);

router.get("/me", isAuthenticated, getMe);

router.post("/verify-otp", userVerification);

router.post("/resend-otp", resendOTP);

router.post("/contact-us", isAuthenticated, contactUs);

router.post("/send-reset-password-mail", sendResetPassOtp);

router.post("/reset-password", resetPassword);

export default router;
