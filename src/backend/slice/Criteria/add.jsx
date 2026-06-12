import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { BaseUrl, Departments } from '../../Api';

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

export const Add_Department = createAsyncThunk(
  'Log_in/Add_Department',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { name, max_volunteers, image } = state.Add_Department.formInfo;

      // بناء الـ FormData بشكل صارم وصحيح
      const formData = new FormData();
      formData.append('name', name);
      formData.append('max_volunteers', max_volunteers);
      
      // التأكد من إلحاق الصورة فقط إذا كانت موجودة وهي من نوع كائن ملف بالفعل
      if (image && image instanceof File) {
        formData.append('image', image);
        console.log(image);
console.log(image instanceof File);
      }

      // إرسال الطلب مع ترك الماتشينغ الخاص بـ content-type للمتصفح تلقائياً عند إرسال FormData
      const response = await postData(
        `${BaseUrl}${Departments}`,
        formData,
        {},
        true
      );
      
      console.log("📦 login response:", response);
      return response;

    } catch (error) {
      // قراءة رسائل الخطأ القادمة من السيرفر بشكل مرن (سواء كانت مصفوفة أخطاء تحقق أو رسالة مباشرة)
      const serverError = error?.response?.data?.message || error?.message || 'فشل تسجيل القسم';
      return rejectWithValue(serverError);
    }
  }
);

const formSlice = createSlice({
  name: 'Add_Department',
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
      .addCase(Add_Department.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false; // تصفير النجاح لتجنب التداخل عند المحاولة مجدداً
      })
      .addCase(Add_Department.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(Add_Department.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;