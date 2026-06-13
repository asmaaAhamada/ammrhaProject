// editSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies'; // 👈 تم تحويلها إلى postData لأننا سنرسل كـ POST ونحاكي PATCH
import { Announcement, BaseUrl } from '../../Api';

const initialState = {
  formInfo: {
    id: '',             
    title: '',          
    description: '',    
    department_id: '',  
    image: null, 
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Update_Announcement = createAsyncThunk(
  'Log_in/Update_Announcement',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { id, title, description, department_id, image } = state.Update_Announcement.formInfo;

      const formData = new FormData();
      
      // 🌟 الحل السحري للمشكلة: إخبار لارافل بأن يتعامل مع الـ POST على أنه PATCH
      formData.append('_method', 'PATCH');
      
      formData.append('title', title);
      formData.append('description', description);
      
      // إرسال معرف القسم
      if (department_id) {
        formData.append('department_ids[1]', department_id);
      }

      // إلحاق الصورة في حال تم رفع ملف جديد فقط
      if (image && image instanceof File) {
        formData.append('image', image);
      }

      // بناء الرابط بشكل ديناميكي بناءً على الـ Postman لديك: v1/announcement/update/{id}
      // تأكد أن قيم المتغيرات Announcement تعطي المسار الصحيح
      const response = await postData(
        `${BaseUrl}${Announcement}/update/${id}`,
        formData,
        {},
        true // تفعيل الـ multipart/form-data
      );
      
      console.log("📦 Update Announcement Response:", response);
      return response;

    } catch (error) {
      const serverError = error?.response?.data?.message || error?.message || 'فشل تعديل الإعلان';
      return rejectWithValue(serverError);
    }
  }
);

const formSlice = createSlice({
  name: 'Update_Announcement',
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
      .addCase(Update_Announcement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Update_Announcement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(Update_Announcement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;