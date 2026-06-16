import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl, Procedures, Freezen } from '../../Api';

// تعديل الـ Thunk ليقبل كائن يحتوي على الفلاتر (params)
export const fetchvolunteer_freeze = createAsyncThunk(
  "program/fetchvolunteer_freeze",
  async (params, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      // // بناء الـ Query String ديناميكياً بناءً على الفلاتر الممررة
      // let queryString = "";
      // if (params) {
      //   const queryParts = [];
      //   if (params.department_id && params.department_id !== "all") {
      //     queryParts.push(`department_id=${params.department_id}`);
      //   }
      //   if (params.status && params.status !== "all") {
      //     queryParts.push(`status=${params.status}`);
      //   }
      //   if (queryParts.length > 0) {
      //     queryString = `?${queryParts.join("&")}`;
      //   }
      // }

      // إرسال الطلب مع الـ Query String الجديد مثل: /v1/volunteer_freeze?department_id=8571
      const response = await getData(`${BaseUrl}${Procedures}${Freezen}`);

      console.log("API RESPONSE", response);
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchvolunteer_freeze',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(fetchvolunteer_freeze.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchvolunteer_freeze.fulfilled, (state, action) => {
        state.isLoading = false;
        // التأكد من تخزين المصفوفة الفعلية الراجعة من الـ payload
        state.data = action.payload?.data || action.payload || [];
      })
      .addCase(fetchvolunteer_freeze.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;