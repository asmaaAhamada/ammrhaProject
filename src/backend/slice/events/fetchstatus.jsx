import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl } from '../../Api'; // تأكدي من استيراد العناوين بشكل صحيح

export const fetchstatus = createAsyncThunk(
  "program/fetchstatus",
  async (_, { rejectWithValue }) => {
    try {
      // الرابط الصحيح كما يظهر في Postman تماماً
      const response = await getData(`${BaseUrl}/events/enums/statuses`);
      console.log("STATUS ENUMS RESPONSE:", response);
      return response;
    } catch (error) {
      console.log("STATUS ENUMS ERROR:", error);
      return rejectWithValue(error?.message || "حدث خطأ أثناء جلب حالات الفعاليات");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchstatus',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(fetchstatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchstatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // استخراج المصفوفة بناءً على شكل الـ JSON الموضح في الصورة
        state.data = action.payload?.data || [];
      })
      .addCase(fetchstatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;