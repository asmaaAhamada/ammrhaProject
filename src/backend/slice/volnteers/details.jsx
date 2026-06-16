// volunteerDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl, Volnteers } from '../../Api';

// الـ Thunk مخصص لاستقبال الـ id وإضافته للمسار
export const fetchDetailsvolunteers = createAsyncThunk(
  "program/fetchDetailsvolunteers",
  async (id, { rejectWithValue }) => {
    try {
      console.log("DETAILS API CALL START FOR ID:", id);
      // تأكدي أن مسار الـ API ينتهي بـ / للـ id مثل: BaseUrl + 'volunteers/' + id
      const response = await getData(`${BaseUrl}${Volnteers}/${id}`);
      console.log("DETAILS API RESPONSE", response);
      return response;
    } catch (error) {
      console.log("DETAILS API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ غير متوقع");
    }
  }
);

export const volunteerDetailsSlice = createSlice({
  name: 'fetchDetailsvolunteers',
  initialState: {
    isLoading: false,
    data: null, // كائن مفرد للمتطوع وليس مصفوفة
    error: null
  },
  reducers: {
    resetDetailsState: (state) => {
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailsvolunteers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDetailsvolunteers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetailsvolunteers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetDetailsState } = volunteerDetailsSlice.actions;
export default volunteerDetailsSlice.reducer;