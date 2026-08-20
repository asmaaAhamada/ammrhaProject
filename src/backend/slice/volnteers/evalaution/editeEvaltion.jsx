import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, EVALUTION } from '../../../Api';
import { postData, putData } from '../../../ApiServecies';


const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

// الـ Thunk الخاص بتعديل تقييم متطوع محدد في فعالية
export const editVolunteerEvaluation = createAsyncThunk(
  "evaluation/editVolunteerEvaluation",
  async ({  evaluationData }, { rejectWithValue }) => {
    try {
      // تعديل مسار الـ API حسب ما هو معتمد لديك، هنا أرسلنا الـ body المطلوب مباشرة
      const response = await postData(`${BaseUrl}${EVALUTION}`, evaluationData);
      console.log(response)
      return response.data;
    } catch (error) {
      const serverError = error.response?.data?.message || error?.message || "حدث خطأ أثناء تعديل التقييم";
      return rejectWithValue(serverError);
    }
  }
);

const editEvaluationSlice = createSlice({
  name: 'editEvaluation',
  initialState,
  reducers: {
    resetEditStatus: (state) => {
      state.success = false;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(editVolunteerEvaluation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editVolunteerEvaluation.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(editVolunteerEvaluation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetEditStatus } = editEvaluationSlice.actions;
export default editEvaluationSlice.reducer;