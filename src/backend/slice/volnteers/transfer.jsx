import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, BLACK_LIST, Procedures, Transfer, Volnteers } from '../../Api';
import { postData } from '../../ApiServecies'; // استيراد postData بدلاً من putData لتوافق الـ FormData مع لارافل

const initialState = {
  formInfo: {
    volunteer_id: '',
    department_id: '',
  },
  isLoading: false,
  error: null,
  success: false,
};

export const transferr = createAsyncThunk(
  'transferr/transferr',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { volunteer_id, department_id } = state.transferr.formInfo;
      
      // 🌟 الحل: نرسل كائن JSON عادي مباشرة بدلاً من FormData
      const requestBody = {
        volunteer_id: Number(volunteer_id), // التأكد من تحويلها لرقم كما بالبوستمان
        department_id: Number(department_id),
      };

      // نرسلها كـ POST طبيعي يتوافق مع الـ JSON المعرّف في السيرفر
      const response = await postData(
        `${BaseUrl}${Volnteers}${Transfer}`,
        requestBody, // تمرير الـ Object مباشرة
        {},
        false // اجعليها false إذا كانت الدالة تعتمد على headers الـ JSON التلقائية، أو اتركيها حسب إعدادات postData لديكِ
      );

      return response;
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'transferr',
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
      .addCase(transferr.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(transferr.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(transferr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;