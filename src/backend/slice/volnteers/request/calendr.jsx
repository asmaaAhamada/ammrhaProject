import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, HR, Intervews } from '../../../Api';
import { postData } from '../../../ApiServecies';
// تأكدي من استيراد دالة الإرسال الصحيحة لديكِ، سنفترض أنها postData أو axios

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

// جعلنا الـ Thunk يستقبل البيانات مباشرة عند الـ dispatch
export const volunteer_calener = createAsyncThunk(
  'volunteer_calener/volunteer_calener',
  async (interviewData, { rejectWithValue }) => {
    try {
      // إرسال البيانات كـ Object عادي (JSON) وليس FormData
      const response = await postData(
        `${BaseUrl}${HR}${Intervews}`,
        interviewData, // الـ Object المحتوي على date, start_time, end_time وربما الـ user_id أو الـ volunteer_id
        {},
        false // تحويل الـ FormData flag إلى false إذا كان المعامل الرابع يحدد نوع المحتوى
      );

      return response;
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء تحديد الموعد';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'volunteer_calener',
  initialState,
  reducers: {
    resetFormStatus: (state) => {
      state.success = false;
      state.error = null;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(volunteer_calener.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(volunteer_calener.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(volunteer_calener.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetFormStatus, clearError } = formSlice.actions;
export default formSlice.reducer;