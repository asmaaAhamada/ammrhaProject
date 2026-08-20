import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { ADMIN, BaseUrl, PROFILE } from '../../Api';

const initialState = {
  formInfo: {
    full_name: '',
    email: '',
    phone_number: '',
    image: null,
    birth_date: '',
    gender: '',
    residence_place: '',
    nationality: '',
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Edit_Profile = createAsyncThunk(
  'Edit_Profile/Edit_Profile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const formInfo = state.Edit_Profile.formInfo;

      const formData = new FormData();

      // التكرار على العناصر وإضافة الحقول ذات القيمة الصالحة فقط للـ FormData
      Object.keys(formInfo).forEach((key) => {
        const value = formInfo[key];

        // معالجة الصورة بشكل خاص
        if (key === 'image') {
          if (value instanceof File) {
            formData.append('image', value);
          }
        } 
        // تجنب إرسال القيم الفارغة أو النصوص الافتراضية مثل "غير متوفر" لمنع تعارض الـ Validation
        else if (value !== null && value !== undefined && value !== '' && value !== 'غير متوفر') {
          formData.append(key, value);
        }
      });

      // حيلة لارافل الأساسية لقراءة الـ FormData في طلبات الـ PUT
      formData.append('_method', 'PUT');

      const response = await postData(
        `${BaseUrl}${ADMIN}${PROFILE}`,
        formData,
        {},
        true
      );

      return response;
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.message ||
        'حدث خطأ ما أثناء التعديل';
      return rejectWithValue(serverMessage);
    }
  }
);

const formSlice = createSlice({
  name: 'Edit_Profile',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Edit_Profile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Edit_Profile.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(Edit_Profile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;