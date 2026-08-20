import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Procedures } from '../../Api';
import { postData } from '../../ApiServecies';

const initialState = {
  formInfo: {
    volunteer_id: '',
    reason: '',
    type: 'تجميد', // تعيين القيمة الافتراضية لتكون تجميد
  },
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

export const volunteer_freeze = createAsyncThunk(
  'volunteer_freeze/volunteer_freeze',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { volunteer_id, reason, type } = state.volunteer_freeze.formInfo;
      
      // إرسال البيانات الموحدة لنفس الـ API مع نوع الإجراء (تجميد)
      const payload = {
        volunteer_id,
        type: type || 'تجميد',
        reason,
      };

      const response = await postData(
        `${BaseUrl}${Procedures}`,
        payload,
        {},
        true
      );

      return response;
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'volunteer_freeze',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(volunteer_freeze.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(volunteer_freeze.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload?.message || "تمت العملية بنجاح";
      })
      .addCase(volunteer_freeze.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.message = null;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;