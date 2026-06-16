import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrl, Freezen, Procedures } from '../../Api'; // الحفاظ على الاستيرادات الخاصة بكِ
import { deleteData } from '../../ApiServecies';

// تعديل الـ Thunk لمنع تشوهات الروابط والمسافات الزائدة
export const Deletvolunteer_freeze = createAsyncThunk(
  "program/Deletvolunteer_freeze",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START FOR ID:", id);
      
      // 🌟 الحل هنا: كتابة المسار بالكامل على سطر واحد لمنع الـ %20 الناتجة عن الـ Newlines
      const response = await deleteData(`${BaseUrl}${Procedures}${Freezen}/${id}`);
      
      console.log("API RESPONSE", response);
      return response; 
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما");
    }
  }
);

export const counterSlice = createSlice({
  name: 'Deletvolunteer_freeze',
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
      .addCase(Deletvolunteer_freeze.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Deletvolunteer_freeze.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || action.payload; 
      })
      .addCase(Deletvolunteer_freeze.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { resetDetails } = counterSlice.actions;
export default counterSlice.reducer;