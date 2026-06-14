import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Complaints, BaseUrl, Status } from '../../Api'; // تأكد أن الاستيرادات تعود بالقيم الصحيحة، أو استبدلها بمسارات نصية مباشرة
import { postData } from '../../ApiServecies';

const initialState = {
  formInfo: {
    id: '',            
    status: 'تمت المعالجة', // جعل الحالة الافتراضية للمعالجة جاهزة تلقائياً
    admin_reply: '',    
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Update_Complaints = createAsyncThunk(
  'Log_in/Update_Complaints',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { id, status, admin_reply } = state.Update_Complaints.formInfo;

      const formData = new FormData();
      
      // إخبار لارافل بالتعامل مع الـ POST كـ PUT لتحديث الحالة بناءً على تجربة البوستمان الناجحة
      formData.append('_method', 'PUT');
      
      // إرسال الحقول بالمسميات الدقيقة التي يقرأها الباك-إند
      formData.append('status', status);
      formData.append('admin_reply', admin_reply);
      
      // بناء الرابط المماثل للبوستمان تماماً: /v1/complaints/{id}/status
      // ملاحظة: إذا كانت المتغيرات المستوردة تختلف، يمكنك كتابة المسار نصياً: `${BaseUrl}v1/complaints/${id}/status`
      const response = await postData(
        `${BaseUrl}${Complaints}/${id}${Status}`,
        formData,
        {},
        true // تفعيل multipart/form-data لإرسال الـ FormData بنجاح
      );
      
      console.log("📦 Update Complaints Response:", response);
      return response;

    } catch (error) {
      const serverError = error?.response?.data?.message || error?.message || 'فشل معالجة الشكوى';
      return rejectWithValue(serverError);
    }
  }
);

const formSlice = createSlice({
  name: 'Update_Complaints',
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
      .addCase(Update_Complaints.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Update_Complaints.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(Update_Complaints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;