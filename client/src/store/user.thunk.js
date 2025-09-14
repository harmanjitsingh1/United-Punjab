import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/components/utilities/axiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });

      console.log(response);

      if (response.data.success) {
        toast.success(response?.data?.message);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
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

      if (response.data.success) {
        toast.success(response?.data?.message);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
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

      console.log(response);

      if (response.data.success) {
        toast.success(response?.data?.message);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
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

      console.log(response);

      if (response.data.success) {
        toast.success(response?.data?.message);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  }
);
