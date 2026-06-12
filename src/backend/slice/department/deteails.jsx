import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrl, Departments } from '../../Api'; // حافظي على الاستيرادات المتاحة لديكِ
import { getData } from '../../ApiServecies';

// تعديل الـ Thunk ليستقبل المعرّف (id) ديناميكياً عند الاستدعاء
export const fetchDetails = createAsyncThunk(
  "program/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START FOR ID:", id);
      const response = await getData(`${BaseUrl}${Departments}/${id}`);
      console.log("API RESPONSE", response);
      return response; // الـ response يحتوي على البيانات المطلوبة
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchDetails',
  initialState: {
    isLoading: false,
    data: null, // تحويلها إلى null لتناسب الكائن (Object) القادم في الريسبونس
    error: null
  },
  reducers: {
    resetDetails: (state) => {
      state.data = null;
      state.error = null;
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data; // هنا يسند كائن الـ data الداخلي (id, name, created_at...)
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { resetDetails } = counterSlice.actions;
export default counterSlice.reducer;