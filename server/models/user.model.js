import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[0-9]{10}$/.test(value),
        message: "Phone number should be 10 digits long.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid email address.",
      },
    },
    aadhar: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[0-9]{12}$/.test(value),
        message: "Aadhar number should be 12 digits long.",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: String,

    otpExpiresAt: Date,

    otpAttempts: { type: Number, default: 0 },

    lastOtpSentAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
