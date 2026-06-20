import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl, Volnteers } from '../../Api';

// 🌟 تحديث الـ Thunk ليستقبل حقول الفلترة ديناميكياً
export const fetchvolunteers = createAsyncThunk(
  "program/fetchvolunteers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      console.log("API CALL START WITH FILTERS:", filters);

      // بناء الـ Query String بناءً على الفلاتر المحددة فقط
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.department_id) queryParams.append('department_id', filters.department_id);
      if (filters.rank_id) queryParams.append('rank_id', filters.rank_id);
      
      // التعامل مع حالة الحساب (نشط / غير نشط) بحسب ما يتوقعه السيرفر (boolean أو string)
      if (filters.is_active !== undefined && filters.is_active !== "") {
        queryParams.append('is_active', filters.is_active);
      }

      const queryString = queryParams.toString();
      const url = `${BaseUrl}${Volnteers}${queryString ? `?${queryString}` : ''}`;

      const response = await getData(url);
      console.log("API RESPONSE", response);

      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ أثناء جلب المتطوعين");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchvolunteers',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchvolunteers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
     // ... داخل الـ Slice الخاص بالمتطوعين
.addCase(fetchvolunteers.fulfilled, (state, action) => {
  state.isLoading = false;
  // استخراج حقل الـ data مباشرة لتوحيد البنية مع الأقسام
  // إذا كان السيرفر يستعمل نظام الـ Pagination الافتراضي لـ Laravel جرب: action.payload.data.data
  state.data = action.payload.data || action.payload; 
})
      .addCase(fetchvolunteers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default counterSlice.reducer;