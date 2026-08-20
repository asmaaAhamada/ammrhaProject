import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volunteer_Request } from '../../../Api';
import { getData } from '../../../ApiServecies';
import { BaseUrl } from '../../../Api';

// تعديل الـ Thunk ليستقبل المعرّف (id) ديناميكياً عند الاستدعاء
export const fetchrequest_details = createAsyncThunk(
  "program/fetchrequest_details",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START FOR ID:", id);
      const response = await getData(`${BaseUrl}${Volunteer_Request}/${id}`);
      console.log("API RESPONSE", response);
      return response; // الـ response يحتوي على البيانات المطلوبة
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchrequest_details',
  initialState: {
    isLoading: false,
    data: null, // تحويلها إلى null لتناسب الكائن (Object) القادم في الريسبونس
    error: null
  },
  reducers: {
    resetrequest_details: (state) => {
      state.data = null;
      state.error = null;
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(fetchrequest_details.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchrequest_details.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data; // هنا يسند كائن الـ data الداخلي (id, name, created_at...)
      })
      .addCase(fetchrequest_details.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { resetrequest_details } = counterSlice.actions;
export default counterSlice.reducer;