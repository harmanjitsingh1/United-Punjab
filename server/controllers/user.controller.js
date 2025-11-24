import User from "../models/user.model.js";
import Query from "../models/query.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/email.services.js";
import { generateToken } from "../utils/generateToken.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid username or password.",
      });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const token = generateToken(user?._id);

    if (!user?.isVerified) {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "Please verify your email before logging in.",
          token,
          user: user.toSafeObject(),
        });
    }

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login success.",
        token,
        user: user.toSafeObject(),
      });
  } catch (error) {
    console.error(error);
  }
};

export const userSignup = async (req, res) => {
  try {
    const { fullName, phone, email, aadhar, password } = req.body;

    if (!fullName || !phone || !email || !aadhar || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (fullName.length < 3 || fullName.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Full name should be between 3 and 50 characters long.",
      });
    }

    if (phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    if (aadhar.length !== 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid Aadhar number.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long.",
      });
    }

    if (await User.findOne({ phone })) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    if (await User.findOne({ aadhar })) {
      return res.status(400).json({
        success: false,
        message: "Aadhar number already exists.",
      });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    const hashedOTP = await bcrypt.hash(OTP.toString(), 10);

    await sendEmail(
      email,
      "Verify Your Email - United Punjab",
      "accountVerificationCode",
      { OTP }
    );

    const hashPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      fullName,
      email,
      phone,
      aadhar,
      password: hashPassword,
      verificationCode: hashedOTP,
      otpExpiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      lastOtpSentAt: Date.now(),
      otpAttempts: 1,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. Verification code sent.",
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    // await Session.findOneAndUpdate(
    //   { token: req.cookies?.token },
    //   { valid: false }
    // );
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        path: "/",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Something went wrong. Please try again later.",
    });
  }
};

export const userVerification = async (req, res) => {
  try {
    const { userId, verificationCode } = req.body;

    if (!userId || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user || user.isVerified) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong.",
      });
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      user.verificationCode
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const tokenData = {
      _id: user?._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User verified and logged in successfully.",
        token,
        user: user.toSafeObject(),
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "Already verified" });

    const now = Date.now();

    // ✅ 1. Cooldown check: 1 OTP per minute
    if (user.lastOtpSentAt && now - user.lastOtpSentAt.getTime() < 60 * 1000) {
      return res
        .status(429)
        .json({ message: "Please wait a minute before sending another OTP." });
    }

    // Rate limiting: allow max 3 OTPs per hour
    if (user.otpAttempts >= 3) {
      // If last OTP was more than 1 hour ago → reset attempts
      if (now - user.lastOtpSentAt.getTime() < 60 * 60 * 1000) {
        return res
          .status(429)
          .json({ message: "Too many requests. Try again after 1 hour." });
      } else {
        user.otpAttempts = 0; // reset attempts after 1 hour
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    user.verificationCode = hashedOtp;
    user.lastOtpSentAt = Date.now();
    user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
    user.otpAttempts = user.otpAttempts += 1;

    await user.save();

    await sendEmail(
      user.email,
      "Verify Your Email - United Punjab",
      "accountVerificationCode",
      { otp }
    );

    res.status(200).json({
      success: true,
      message: "New OTP sent",
    });
  } catch (err) {
    res.status(500).json({ message: "Resend failed", error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendResetPassOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }
    const user = await User.findOne({
      email,
    }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    if (user.otpExpiresAt > Date.now()) {
      return res.status(200).json({
        success: true,
        message: "OTP has already sent to you email.",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(String(otp), 10);

    user.verificationCode = hashedOtp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    user.lastOtpSentAt = Date.now();

    await user.save();

    await sendEmail(
      user?.email,
      "Reset Your Password - United Pujnab",
      "resetPasswordCode",
      {
        username: user?.fullName,
        otp,
      }
    );

    res.status(200).json({
      success: true,
      message: "OTP has been sent to your email address.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request!." });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(otp, user.resetPasswordOtp);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid OTP." });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.status(500).json({
        success: false,
        message: "New password must be different from old one",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;
    await user.save();

    await Session.updateMany({ userId: user._id }, { valid: false });

    return res.status(200).json({
      success: true,
      message: "Password has been changed.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
};

export const contactUs = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!email || !name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    let newQuery = await Query.create({
      name,
      email,
      phone,
      message,
      user: req?.user?._id,
    });

    res.status(200).json({
      success: true,
      message: "Your query has been recorded.",
      newQuery,
    });
  } catch (error) {
    console.error(error);
  }
};
