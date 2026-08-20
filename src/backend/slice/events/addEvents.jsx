import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { BaseUrl, Event } from '../../Api';

// 1. الحالة الابتدائية متطابقة تماماً مع بنية الفورم المطلوبة في الـ API
const initialState = {
  formInfo: {
    name: '',
    type: 'normal',           // تطابق حقل type بالـ Postman وبدايةً القيمة الافتراضية عادية
    date: '',                 // تطابق حقل date
    location: '',             // تطابق حقل location
    start_time: '',           // تطابق حقل start_time
    end_time: '',             // تطابق حقل end_time
    required_volunteers: '',  // تطابق حقل required_volunteers بدلاً من max_volunteers
    description: '',          // تطابق حقل description
    department_id: '',        // تطابق حقل department_id لإرسال الآي دي
    media_count: 0,           // تطابق حقل media_count
    logistic_count: 0,         // تطابق حقل logistic_count
    image: null,              // للملف المرفق
    leader_ids: []            // مصفوفة القادة المختارين بعد الفلترة بالقسم
  },
  isLoading: false,
  error: null,
  success: false,
};

// 2. الـ Thunk الخاص بإرسال الطلب عبر الـ FormData ليدعم رفع الملفات والنصوص معاً
export const Add_events = createAsyncThunk(
  "events/addEvent",
  async (formData, { rejectWithValue }) => { // 👈 التأكد من استقبال الـ formData هنا
    try {
      // تمرير الـ formData مباشرة في جسم الطلب
      const response = await postData(`${BaseUrl}/events`, formData, {
        headers: {
          // اتركِ المتصفح يحدد الـ Boundary الخاص بالـ FormData تلقائياً
          "Content-Type": "multipart/form-data",
          // تأكدي من إرسال توكن التحقق إذا كان المسار محمياً
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        }
      });
      return response.data;
    } catch (error) {
      // استخراج رسائل الخطأ القادمة من السيرفر بشكل دقيق لعرضها في الـ Alert
      const serverError = error.response?.data?.message || error?.message || "حدث خطأ غير متوقع";
      return rejectWithValue(serverError);
    }
  }
);

// 3. السلايس وإدارة حالات الـ Reducers ومعالجة حالات التحميل، الخطأ، والنجاح
const formSlice = createSlice({
  name: 'Add_events',
  initialState,
  reducers: {
    // تحديث ديناميكي مرن لأي حقل داخل الـ formInfo
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    // تصفير الفورم بالكامل عند النجاح أو عند إغلاق الواجهة المنبثقة
    resetForm: () => initialState,
    // تصفير الأخطاء يدوياً عند الحاجة
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // أوالاً: حالة الانتظار والتحميل (Pending)
      .addCase(Add_events.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false; 
      })
      // ثانياً: حالة النجاح الكامل واستلام الرد (Fulfilled)
      .addCase(Add_events.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        // هنا يمكن تفريغ الفورم أو الاحتفاظ بالرد حسب رغبتك
      })
      // ثالثاً: حالة الفشل ورفض الطلب (Rejected)
      .addCase(Add_events.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // تخزين رسالة الخطأ القادمة من السيرفر لعرضها للمستخدم
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;