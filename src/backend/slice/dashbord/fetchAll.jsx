import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import {  BaseUrl, Dashbord, Stats } from '../../Api';




export const fetchDashboard = createAsyncThunk(
  "program/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Dashbord}${Stats}`
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
    name: 'fetchDashboard',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchDashboard.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchDashboard.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchDashboard.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer