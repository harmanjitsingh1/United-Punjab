import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  resendOtpThunk,
  signupUserThunk,
  verifyOtpThunk,
} from "../user.thunk";

const initialState = {
  userProfile: null,
  buttonLoading: false,
  isAuthorized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      console.log("pending login...");
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled login...", action.payload);
      state.buttonLoading = false;
      state.userProfile = action.payload?.user;
      state.isAuthorized = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected login...", action.payload);
      state.buttonLoading = false;
    });

    // signup
    builder.addCase(signupUserThunk.pending, (state) => {
      console.log("pending signup...");
      state.buttonLoading = true;
    });
    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled signup...", action.payload);
      state.buttonLoading = false;
      state.userProfile = action.payload?.user;
    });
    builder.addCase(signupUserThunk.rejected, (state) => {
      console.log("rejected signup...");
      state.buttonLoading = false;
    });

    // verify otp
    builder.addCase(verifyOtpThunk.pending, (state) => {
      console.log("pending otp...");
      state.buttonLoading = true;
    });
    builder.addCase(verifyOtpThunk.fulfilled, (state) => {
      console.log("fulfilled otp...");
      state.buttonLoading = false;
      state.isAuthorized = true;
    });
    builder.addCase(verifyOtpThunk.rejected, (state) => {
      console.log("rejected otp...");
      state.buttonLoading = false;
    });

    // resend OTP
    builder.addCase(resendOtpThunk.pending, (state) => {
      console.log("pending otp...");
      state.buttonLoading = true;
    });
    builder.addCase(resendOtpThunk.fulfilled, (state) => {
      console.log("fulfilled otp...");
      state.buttonLoading = false;
    });
    builder.addCase(resendOtpThunk.rejected, (state) => {
      console.log("rejected otp...");
      state.buttonLoading = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
