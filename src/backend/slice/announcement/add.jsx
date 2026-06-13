import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { Announcement, BaseUrl, Create } from '../../Api';

const initialState = {
  formInfo: {
    title: '',         
    description: '',   
    department_ids: [],  // 👈 تحويلها إلى مصفوفة لتخزين الأقسام المتعددة
    image: null, 
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Add_Announcement = createAsyncThunk(
  'Log_in/Add_Announcement',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { title, description, department_ids, image } = state.Add_Announcement.formInfo;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      // 👈 لوب ديناميكي لبناء مصفوفة الأقسام للباكيند بشكل صحيح
      if (department_ids && department_ids.length > 0) {
        department_ids.forEach((id, index) => {
          formData.append(`department_ids[${index}]`, id);
        });
      }

      if (image && image instanceof File) {
        formData.append('image', image);
      }

      const response = await postData(
        `${BaseUrl}${Announcement}${Create}`,
        formData,
        {},
        true
      );
      
      console.log("📦 Announcement Response:", response);
      return response;

    } catch (error) {
      const serverError = error?.response?.data?.message || error?.message || 'فشل إنشاء الإعلان';
      return rejectWithValue(serverError);
    }
  }
);

const formSlice = createSlice({
  name: 'Add_Announcement',
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
      .addCase(Add_Announcement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Add_Announcement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(Add_Announcement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;