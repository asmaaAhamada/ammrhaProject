import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Position, Volnteers } from '../../Api';
import { postData } from '../../ApiServecies'; 

const initialState = {
  formInfo: {
    user_id: '',
    department_id: '',
    role: '' // حقل الرول مطلوب بالـ API
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Postion = createAsyncThunk(
  'Postion/Postion',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { user_id, department_id, role } = state.Postion.formInfo;
      
      // 🌟 إرسال كائن JSON متكامل يطابق تماماً الـ Payload المتوقع بالسيرفر
      const requestBody = {
        user_id: Number(user_id), 
        department_id: Number(department_id),
        role: role.trim() // تمرير قيمة الدور المحددة من المودال
      };

      const response = await postData(
        `${BaseUrl}${Volnteers}${Position}`,
        requestBody,
        {},
        false 
      );

      return response;
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء تعديل المنصب';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'Postion',
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
      .addCase(Postion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Postion.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Postion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;