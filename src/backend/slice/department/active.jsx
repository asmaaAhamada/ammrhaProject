import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// قمنا بعمل alias للاستيراد لكي لا يتضارب الاسم: Active as ActiveApi
import { BaseUrl, Departments } from '../../Api';
import { patchData } from '../../ApiServecies';

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

// قمنا بتغيير اسم الـ Thunk هنا إلى executeActiveDepartment لإنهاء الخطأ
export const executeActiveDepartment = createAsyncThunk(
  'Active/Execute',
  async (id, { rejectWithValue }) => {
    try {
      const response = await patchData(
        `${BaseUrl}${Departments}/activate/${id}`,
        {},
        true
      );
      console.log(response);
      return response;
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'Active',
  initialState,
  reducers: {
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeActiveDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(executeActiveDepartment.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(executeActiveDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;