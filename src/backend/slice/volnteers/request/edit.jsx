import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Finilize, HR, Intervews } from '../../../Api';
// تأكدي من استيراد دالة إرسال الطلبات الصحيحة من ملف الخدمات لديكِ (سواء كانت postData أو putData)
import { postData } from '../../../ApiServecies'; 

const initialState = {
  formInfo: {
    status: ''
  },
  isLoading: false,
  error: null,
  success: false,
};

// نقوم بتمرير كائن يحتوي على الـ Id والـ status المطلوبة عند عمل dispatch
export const Edit_request = createAsyncThunk(
  'Edit_request/Execute',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log("Sending Status Update:", id, status);

      // إرسال البيانات كـ JSON Object مباشر بناءً على توثيق البوستمان المرفق
      const response = await postData(
        `${BaseUrl}${HR}${Intervews}/${id}${Finilize}`,
        { status: status }
      );

      return response;
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'Edit_request',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Edit_request.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Edit_request.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Edit_request.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError, resetSuccess } = formSlice.actions;
export default formSlice.reducer;