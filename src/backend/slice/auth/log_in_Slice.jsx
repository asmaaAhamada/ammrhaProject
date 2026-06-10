import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { BaseUrl, LOG_IN } from '../../Api';
import { postNoToken } from '../../ApiServecies';

const initialState = {
  formInfo: {
    login_credential: '',
    password: '',
  },
  isLoading: false,
  error: null, // هذا الكائن سيحتوي على الأخطاء القادمة من الباكيند
};

export const Log_in = createAsyncThunk(
  'Log_in/Log_in',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { login_credential, password } = state.Log_in.formInfo;

      const response = await postNoToken(`${BaseUrl}${LOG_IN}`, { login_credential, password }, {}, true);
      console.log("📦 api response:", `${BaseUrl}${LOG_IN}`);
      console.log("📦 login response:", response);

      const data = response.data;
      const token = data?.access_token;
      
      const user = data?.user;

      // حفظ التوكن في الكوكيز بشكل صحيح
      if (token) {
        const cookies = new Cookies();
        cookies.set('token', token, {
          path: '/',
          maxAge: 86400, // يوم واحد
        });
      }

      // نعيد البيانات كاملة لنستخرج الـ role في المكون
      return user; 
      
    } catch (error) {
      // هنا نقوم بتمرير الخطأ القادم من السيرفر، إذا كان هيكلياً أو نصياً
      return rejectWithValue(error?.response?.data || error?.message || 'فشل تسجيل الدخول');
    }
  }
);

const formSlice = createSlice({
  name: 'Log_in',
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
      .addCase(Log_in.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Log_in.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
          state.user = action.payload;

      })
      .addCase(Log_in.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // تخزين الأخطاء القادمة من الباكيند
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;