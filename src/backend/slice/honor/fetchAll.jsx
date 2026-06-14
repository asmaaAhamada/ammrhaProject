import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { Honor, BaseUrl } from '../../Api';

export const fetchHonor = createAsyncThunk(
  "program/fetchHonor",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");
      const response = await getData(`${BaseUrl}${Honor}`);
      console.log("API RESPONSE", response);
      return response; // الـ response هنا هو الـ Array مباشرة
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchHonor',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(fetchHonor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHonor.fulfilled, (state, action) => {
        state.isLoading = false;
        // تعديل هنا: تخزين الـ payload مباشرة لأنه Array
        state.data = action.payload.data.data; 
      })
      .addCase(fetchHonor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;