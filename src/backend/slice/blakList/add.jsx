import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Procedures } from '../../Api';
import { postData } from '../../ApiServecies';

const initialState = {
  formInfo: {
    volunteer_id: '',
    reason: '',
    type: 'حظر', // القيمة الافتراضية
  },
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

export const Add_black_List = createAsyncThunk(
  'Add_black_List/Add_black_List',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { volunteer_id, reason, type } = state.Add_black_List.formInfo;
      
      // إرسال البيانات كـ JSON Object يتطابق مع ما يطلبه الـ API
      const payload = {
        volunteer_id,
        type: type || 'حظر',
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
        state.message = null;
      })
      .addCase(Add_black_List.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload?.message || "تم إرسال الطلب بنجاح بانتظار موافقة الإدارة";
      })
      .addCase(Add_black_List.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.message = null;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;