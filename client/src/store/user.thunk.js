import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/Components/utilities/axiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });

      console.log(response);
      
      if (response.data.success) {
        toast.success(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
      });
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "signup",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", {
        fullName,
        email,
        password,
      });

      
      console.log(response);
      
      if (response.data.success) {
        toast.success(response?.data?.message);  
      }
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
      });
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "verify",
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/verify", {
        email,
        verificationCode,
      });

      console.log(response);
      
      if (response.data.success) {
        toast.success(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
      });
    }
  }
);
