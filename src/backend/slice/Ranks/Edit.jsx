import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Ranks } from '../../Api';
import { postData } from '../../ApiServecies'; // استيراد postData بدلاً من putData لتوافق الـ FormData مع لارافل

const initialState = {
  formInfo: {
   name: '',
    min_points: '',
    min_hours: ''
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Edit_Ranks = createAsyncThunk(
  'Edit_Ranks/Edit_Ranks',
  async (criterionId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
          const { name, min_points ,min_hours } = state.Edit_Ranks.formInfo;
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('min_points', min_points);
            formData.append('min_hours', min_hours);

      formData.append('_method', 'PUT'); // حيلة لارافل الأساسية لقراءة الـ FormData في طلبات التعديل

      // نرسلها كـ POST مع الـ _method لتفادي مشاكل الـ PUT المشهورة في لارافل
      const response = await postData(
        `${BaseUrl}${Ranks}/${criterionId}`,
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
  name: 'Edit_Ranks',
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
      .addCase(Edit_Ranks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Edit_Ranks.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Edit_Ranks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;