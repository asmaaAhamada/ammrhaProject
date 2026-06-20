import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, BLACK_LIST, Freezen, Procedures } from '../../Api';
import { postData } from '../../ApiServecies'; // استيراد postData بدلاً من putData لتوافق الـ FormData مع لارافل

const initialState = {
  formInfo: {
    volunteer_id: '',
    reason: '',
  },
  isLoading: false,
  error: null,
  success: false,
};

export const volunteer_freeze = createAsyncThunk(
  'volunteer_freeze/volunteer_freeze',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { volunteer_id, reason } = state.volunteer_freeze.formInfo;
      
      const formData = new FormData();
      formData.append('volunteer_id', volunteer_id);
      formData.append('reason', reason);

      const response = await postData(
        `${BaseUrl}${Procedures}${Freezen}`,
        formData,
        {},
        true
      );

      // ---- 🛑 كونسول للنجاح ----
      console.log("الرد الكامل من السيرفر (Thunk Success):", response);

      return response;
    } catch (error) {
      // ---- 🛑 كونسول للخطأ والـ Response القادم من السيرفر ----
      console.log("الخطأ الكامل من السيرفر (Thunk Catch):", error.response);

      // هنا يتم فحص رسالة الخطأ المتوقعة من لارافل
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
      })
      .addCase(volunteer_freeze.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(volunteer_freeze.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;