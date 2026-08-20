import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patchData } from "../../../ApiServecies";
import { BaseUrl, EVALUTION, Event, hr } from "../../../Api";

// Async Thunk لاعتماد التقييم
export const ApproveEvaloution = createAsyncThunk(
  "evaluations/ApproveEvaloution",
  async (eventId, { rejectWithValue }) => {
    try {
      // إرسال طلب PATCH برابط الـ URL فقط دون Body
      const response = await patchData(
        `${BaseUrl}${EVALUTION}${hr}${Event}/approve/${eventId}`,{}
      );
      return response; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء محاولة اعتماد ورفع التقييم"
      );
    }
  }
);

const ApproveEvaloutionSlice = createSlice({
  name: "ApproveEvaloution",
  initialState: {
    isLoading: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    resetApproveStatus: (state) => {
      state.isLoading = false;
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ApproveEvaloution.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(ApproveEvaloution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // قراءة الرسالة القادمة مباشرة من الباك إند
        state.message = action.payload?.data?.message || action.payload?.message || "تم اعتماد ورفع التقييم بنجاح";
        state.error = null;
      })
      .addCase(ApproveEvaloution.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetApproveStatus } = ApproveEvaloutionSlice.actions;
export default ApproveEvaloutionSlice.reducer;