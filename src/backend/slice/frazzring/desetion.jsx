import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 
import { patchData } from "../../ApiServecies";
import { BaseUrl } from "../../Api";

const initialState = {
  formInfo: {
    status: ''
  },
  Loading: false,
  Error: null,
  success: false,
};
export const Desetion_frazzing = createAsyncThunk(
  "interviews/Desetion_frazzing",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await patchData(
        `${BaseUrl}/procedures/volunteer-freeze/decision/${id}`,
        {
          status,
        }
      );
console.log(response)
      return response.data;
    } catch (Error) {
      return rejectWithValue(
        Error.response?.data?.message || "حدث خطأ أثناء تنفيذ الطلب"
      );
    }
  }
);

const Desetion_frazzingSlice = createSlice({
  name: "Desetion_frazzing",
  initialState,
  reducers: {
    resetCancelStatus: (state) => {
      state.Loading = false;
      state.success = false;
      state.Error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Desetion_frazzing.pending, (state) => {
        state.Loading = true;
        state.Error = null;
        state.success = false;
      })
      .addCase(Desetion_frazzing.fulfilled, (state) => {
        state.Loading = false;
        state.success = true;
        state.Error = null;
      })
      // تم إضافة (state, action) هنا لحل مشكلة ReferenceError: action is not defined تماماً
      .addCase(Desetion_frazzing.rejected, (state, action) => {
        state.Loading = false;
        state.success = false;
        state.Error = action.payload; 
      });
  },
});

export const { resetCancelStatus } = Desetion_frazzingSlice.actions;
export default Desetion_frazzingSlice.reducer;