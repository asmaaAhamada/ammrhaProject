import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import {  BaseUrl, Dashbord, EXPORT, Stats } from '../../Api';




export const ExportFile = createAsyncThunk(
  "program/ExportFile",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Dashbord}${EXPORT}`
      );

      console.log("API RESPONSE", response);

      return response;
    } catch (error) {
      console.log("API ERROR", error);

      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'ExportFile',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(ExportFile.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(ExportFile.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(ExportFile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer