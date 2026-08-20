import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrl, Procedures } from '../../Api';
import { getData } from '../../ApiServecies';

export const fetchBlack_list = createAsyncThunk(
  "program/fetchBlack_list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(
        `${BaseUrl}${Procedures}`
      );
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchBlack_list',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlack_list.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlack_list.fulfilled, (state, action) => {
        state.isLoading = false;
        // حفظ مصفوفة البيانات سواء جاءت داخل response.data أو response مباشرة
        state.data = action.payload?.data || action.payload || [];
      })
      .addCase(fetchBlack_list.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;