import { createSlice } from "@reduxjs/toolkit";
import { Log_in } from "./log_in_Slice";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
     setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(Log_in.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },

});

export const { logout, setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
