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
export const Desetion_Black = createAsyncThunk(
  "interviews/Desetion_Black",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await patchData(
        `${BaseUrl}/procedures/blacklist/${id}/decision`,
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

const Desetion_BlackSlice = createSlice({
  name: "Desetion_Black",
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
      .addCase(Desetion_Black.pending, (state) => {
        state.Loading = true;
        state.Error = null;
        state.success = false;
      })
      .addCase(Desetion_Black.fulfilled, (state) => {
        state.Loading = false;
        state.success = true;
        state.Error = null;
      })
      // تم إضافة (state, action) هنا لحل مشكلة ReferenceError: action is not defined تماماً
      .addCase(Desetion_Black.rejected, (state, action) => {
        state.Loading = false;
        state.success = false;
        state.Error = action.payload; 
      });
  },
});

export const { resetCancelStatus } = Desetion_BlackSlice.actions;
export default Desetion_BlackSlice.reducer;