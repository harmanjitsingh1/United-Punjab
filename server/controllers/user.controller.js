import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

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
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

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
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      })
      .json({
        success: true,
        message: "Login success.",
        token,
        user,
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

    await sendVerificationCode(email, OTP);

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

    // Remove sensitive data before sending response
    const {
      password: _,
      verificationCode,
      otpExpiresAt,
      ...safeUser
    } = newUser.toObject();

    res.status(201).json({
      success: true,
      message: "Signup successful. Verification code sent.",
      user: safeUser,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
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

    const { password: _, otpExpiresAt, ...safeUser } = user.toObject();

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      })
      .json({
        success: true,
        message: "User verified and logged in successfully.",
        token,
        user: safeUser,
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
    await sendVerificationCode(user.email, otp);

    res.status(200).json({
      success: true,
      message: "New OTP sent",
    });
  } catch (err) {
    res.status(500).json({ message: "Resend failed", error: err.message });
  }
};
