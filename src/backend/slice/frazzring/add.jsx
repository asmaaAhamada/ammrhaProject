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

      // نرسلها كـ POST مع الـ _method لتفادي مشاكل الـ PUT المشهورة في لارافل
      const response = await postData(
        `${BaseUrl}${Procedures}${Freezen}`,
        formData,
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