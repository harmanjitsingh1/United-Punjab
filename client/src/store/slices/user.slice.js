import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signupUserThunk, verifyOtpThunk } from "../user.thunk";

const initialState = {
  isAuthenticated: false,
  buttonLoading: false,
  
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login: () => {
    //   console.log("User logged in");
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      console.log(state.buttonLoading)
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      console.log("fulfilled")
      console.log(action.payload)
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
  
  extraReducers: (builder) => {
    builder.addCase(signupUserThunk.pending, (state, action) => {
      console.log("pending")
      state.buttonLoading = true;
      console.log(state.buttonLoading)
    });
    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
    });
    builder.addCase(signupUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },

  extraReducers: (builder) => {
    builder.addCase(verifyOtpThunk.pending, (state, action) => {
      console.log("pending")
    });
    builder.addCase(verifyOtpThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
    });
    builder.addCase(verifyOtpThunk.rejected, (state, action) => {
      console.log("rejected")
    });
  },

});

export const { } = userSlice.actions;

export default userSlice.reducer;
