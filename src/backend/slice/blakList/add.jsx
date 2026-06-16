import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, BLACK_LIST, Procedures } from '../../Api';
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

export const Add_black_List = createAsyncThunk(
  'Add_black_List/Add_black_List',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { volunteer_id, reason } = state.Add_black_List.formInfo;
      
      const formData = new FormData();
      formData.append('volunteer_id', volunteer_id);
      formData.append('reason', reason);

      // نرسلها كـ POST مع الـ _method لتفادي مشاكل الـ PUT المشهورة في لارافل
      const response = await postData(
        `${BaseUrl}${Procedures}${BLACK_LIST}`,
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
  name: 'Add_black_List',
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
      .addCase(Add_black_List.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Add_black_List.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Add_black_List.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;