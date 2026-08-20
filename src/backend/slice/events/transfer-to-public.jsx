import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patchData } from '../../ApiServecies';
import { BaseUrl, Event, TRANSFER } from '../../Api'; 

export const transfer_to_public = createAsyncThunk(
  "program/transfer_to_public",
  async (id, { rejectWithValue }) => {
    try {
      // تعديل الرابط لتمرير المعرّف (id) بشكل ديناميكي
      const response = await patchData(`${BaseUrl}${Event}${TRANSFER}/${id}`);
      console.log("TRANSFER TO PUBLIC RESPONSE:", response);
      return response;
    } catch (error) {
  console.log("TRANSFER ERROR:", error);

  return rejectWithValue(
    error?.message 
  );


}
  }
);

export const counterSlice = createSlice({
  name: 'transfer_to_public',
  initialState: {
    isLoading: false,
    success: false, // إضافة حالة للتأكد من نجاح العملية
    error: null
  },
  reducers: {
    resetTransferState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(transfer_to_public.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(transfer_to_public.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(transfer_to_public.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        state.success = false;
      });
  }
});

export const { resetTransferState } = counterSlice.reducer;
export default counterSlice.reducer;