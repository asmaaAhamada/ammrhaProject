import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 
import { BaseUrl, Intervews } from "../../../Api"; // تأكدي من مطابقة اسم المتغير من ملف الـ Api
import { postData } from "../../../ApiServecies";

export const cancelInterviewByHr = createAsyncThunk(
  "interviews/cancelByHr",
  async (interviewId, { rejectWithValue }) => {
    try {
      const response = postData(`${BaseUrl}${Intervews}/cancel-hr/${interviewId}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء محاولة إلغاء الموعد"
      );
    }
  }
);

const cancelHrSlice = createSlice({
  name: "cancelHr",
  initialState: {
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCancelStatus: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cancelInterviewByHr.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(cancelInterviewByHr.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      // تم إضافة (state, action) هنا لحل مشكلة ReferenceError: action is not defined تماماً
      .addCase(cancelInterviewByHr.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload; 
      });
  },
});

export const { resetCancelStatus } = cancelHrSlice.actions;
export default cancelHrSlice.reducer;