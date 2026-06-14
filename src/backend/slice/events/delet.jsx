import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrl, Event } from '../../Api';
import { deleteData } from '../../ApiServecies';

export const deletEvents = createAsyncThunk(
  'program/deletEvents',
  async (criterion, { rejectWithValue }) => {
    try {
      const response = await deleteData(`${BaseUrl}${Event}/${criterion}`);
      console.log("Delete Response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "حدث خطأ أثناء الحذف");
    }
  }
);

export const counterSlice = createSlice({
  name: 'deletEvents',
  initialState: {
    isLoading: false,
    data: null, 
    error: null
  },
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(deletEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || action.payload;
      })
      .addCase(deletEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});
  
export default counterSlice.reducer;