import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  resendOtpThunk,
  signupUserThunk,
  verifyOtpThunk,
  contactUsThunk,
  checkAuthThunk,
  sendResetPassMailThunk,
  resetPasswordThunk,
  logoutUserThunk,
} from "../thunks/user.thunk";

const initialState = {
  userProfile: null,
  buttonLoading: false,
  screenLoading: false,
  isAuthorized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userProfile = null;
      state.isAuthorized = false;
    },
    setUser: (state, action) => {
      state.userProfile = action?.payload;
      state.isAuthorized = !!action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUserThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.userProfile = action.payload?.user;
        state.isAuthorized = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })

      // signup
      .addCase(signupUserThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.userProfile = action.payload?.user;
      })
      .addCase(signupUserThunk.rejected, (state) => {
        state.buttonLoading = false;
      })

      // logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.screenLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.userProfile = null;
        state.isAuthorized = false;
        state.screenLoading = false;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.screenLoading = false;
      })

      //check auth
      .addCase(checkAuthThunk.pending, (state) => {
        state.screenLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.isAuthorized = true;
        state.userProfile = action.payload?.user || action.payload || null;
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.screenLoading = false;
        state.isAuthorized = false;
        state.userProfile = null;
      })

      // verify otp
      .addCase(verifyOtpThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.buttonLoading = false;
        state.isAuthorized = true;
      })
      .addCase(verifyOtpThunk.rejected, (state) => {
        state.buttonLoading = false;
      })

      // resend OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.buttonLoading = false;
      })
      .addCase(resendOtpThunk.rejected, (state) => {
        state.buttonLoading = false;
      })

      //contact us
      .addCase(contactUsThunk.pending, (state, action) => {
        state.buttonLoading = true;
      })
      .addCase(contactUsThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
      })
      .addCase(contactUsThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })

      //reset password email
      .addCase(sendResetPassMailThunk.pending, (state, action) => {
        state.buttonLoading = true;
      })
      .addCase(sendResetPassMailThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
      })
      .addCase(sendResetPassMailThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })

      // reset password
      .addCase(resetPasswordThunk.pending, (state, action) => {
        state.buttonLoading = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
