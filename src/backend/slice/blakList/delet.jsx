import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrl, BLACK_LIST, Procedures } from '../../Api'; // الحفاظ على الاستيرادات الخاصة بكِ
import { deleteData } from '../../ApiServecies';

// تعديل الـ Thunk لمنع تشوهات الروابط والمسافات الزائدة
export const DeletBlack_List = createAsyncThunk(
  "program/DeletBlack_List",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START FOR ID:", id);
      
      // 🌟 الحل هنا: كتابة المسار بالكامل على سطر واحد لمنع الـ %20 الناتجة عن الـ Newlines
      const response = await deleteData(`${BaseUrl}${Procedures}${BLACK_LIST}/${id}`);
      
      console.log("API RESPONSE", response);
      return response; 
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما");
    }
  }
);

export const counterSlice = createSlice({
  name: 'DeletBlack_List',
  initialState: {
    isLoading: false,
    data: null, 
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
      .addCase(DeletBlack_List.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeletBlack_List.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || action.payload; 
      })
      .addCase(DeletBlack_List.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { resetDetails } = counterSlice.actions;
export default counterSlice.reducer;