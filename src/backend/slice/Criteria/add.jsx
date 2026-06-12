import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Criteria } from '../../Api';
import { postData } from '../../ApiServecies'; // استيراد postData بدلاً من putData لتوافق الـ FormData مع لارافل

const initialState = {
  formInfo: {
    name: '',
    points: '',
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Add_Criteria = createAsyncThunk(
  'Add_Criteria/Add_Criteria',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { name, points } = state.Add_Criteria.formInfo;
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('points', points);

      // نرسلها كـ POST مع الـ _method لتفادي مشاكل الـ PUT المشهورة في لارافل
      const response = await postData(
        `${BaseUrl}${Criteria}`,
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
  name: 'Add_Criteria',
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
      .addCase(Add_Criteria.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Add_Criteria.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Add_Criteria.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;