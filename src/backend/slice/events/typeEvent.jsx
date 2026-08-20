import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl, Event, Type } from '../../Api'; // تأكدي من استيراد العناوين بشكل صحيح

export const fetchType = createAsyncThunk(
  "program/fetchType",
  async (_, { rejectWithValue }) => {
    try {
      // الرابط الصحيح كما يظهر في Postman تماماً
      const response = await getData(`${BaseUrl}${Event}${Type}`);
      console.log("Type ENUMS RESPONSE:", response);
      return response;
    } catch (error) {
      console.log("Type ENUMS ERROR:", error);
      return rejectWithValue(error?.message || "حدث خطأ أثناء جلب حالات الفعاليات");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchType',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(fetchType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchType.fulfilled, (state, action) => {
        state.isLoading = false;
        // استخراج المصفوفة بناءً على شكل الـ JSON الموضح في الصورة
        state.data = action.payload?.data || [];
      })
      .addCase(fetchType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;