import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, Departments } from '../../Api';
import { putData } from '../../ApiServecies';

const initialState = {
  formInfo: {
    name: '',
    max_volunteers: '',
    image: null, 
  },
  isLoading: false,
  error: null,
  success: false,
};

// نقوم بتمرير الـ departmentId عند عمل dispatch للدالة
export const Edit_Department = createAsyncThunk(
  'Edit_Department/Execute',
  async (departmentId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      
      // تصحيح جلب البيانات من نفس السلايس الحالي (Edit_Department)
      const { name, max_volunteers, image } = state.Edit_Department.formInfo;
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('max_volunteers', max_volunteers);
      
      // ملاحظة لـ Laravel: إذا واجهت مشكلة عدم وصول البيانات، يمكنك فك التعليق عن السطر التالي وتغيير putData إلى postData
      // formData.append('_method', 'PUT');

      if (image && image instanceof File) {
        formData.append('image', image);
      }

      const response = await putData(
        `${BaseUrl}${Departments}/${departmentId}`,
        formData,
        {},
        true
      );

      return response;
    } catch (error) {
      // جلب رسالة الخطأ القادمة من الباك-إند بدقة
      const serverMessage = error?.response?.data?.message || error?.message || 'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'Edit_Department',
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
      .addCase(Edit_Department.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Edit_Department.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Edit_Department.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // هنا سيتم تخزين رسالة خطأ الباك-إند
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;