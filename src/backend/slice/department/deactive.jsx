import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, DEACTIVE, Departments } from '../../Api';
import { patchData, putData } from '../../ApiServecies';

const initialState = {
 
  isLoading: false,
  error: null,
  success: false,
};

// نقوم بتمرير الـ departmentId عند عمل dispatch للدالة
export const Deactive = createAsyncThunk(
  'Deactive/Execute',
  async ({id,volunteer_ids}, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      
      // تصحيح جلب البيانات من نفس السلايس الحالي (Deactive)
      
      

      const response = await patchData(
        `${BaseUrl}${Departments}${DEACTIVE}/${id}`,
        {volunteer_ids},
        {},
        true
      );
console.log(response)
      return response;
    } catch (error) {
      // جلب رسالة الخطأ القادمة من الباك-إند بدقة
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'Deactive',
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
      .addCase(Deactive.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Deactive.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Deactive.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // هنا سيتم تخزين رسالة خطأ الباك-إند
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;