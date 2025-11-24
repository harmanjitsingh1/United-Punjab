import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utilities/axiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      return response?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, phone, email, aadhar, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", {
        fullName,
        phone,
        email,
        aadhar,
        password,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (rejectWithValue) => {
    try {
      const res = await axiosInstance.post("/logout");
      return res?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "user/verify-otp",
  async ({ userId, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/verify-otp", {
        userId,
        verificationCode,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  "user/resend-otp",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/resend-otp", {
        userId,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const checkAuthThunk = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/me");
      return res?.data;
    } catch (err) {
      return rejectWithValue(
        err || err?.response?.data || { message: "Not authenticated" }
      );
    }
  }
);

export const sendResetPassMailThunk = createAsyncThunk(
  "user/sendResetPassMail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/send-reset-password-mail", {
        email,
      });
      return res?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "user/resetPassword",
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/reset-password", {
        email,
        otp,
        password,
      });
      return res?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);

export const contactUsThunk = createAsyncThunk(
  "user/contactUs",
  async ({ name, email, phone, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contact-us", {
        name,
        email,
        phone,
        message,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
      });
    }
  }
);
