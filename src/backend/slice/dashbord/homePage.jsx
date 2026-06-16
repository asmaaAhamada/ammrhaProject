import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import {  BaseUrl, Dashbord, HomePage, Volnteers } from '../../Api';




export const fetchvolunteersHome = createAsyncThunk(
  "program/fetchvolunteersHome",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Dashbord}${HomePage}`
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
    name: 'fetchvolunteersHome',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchvolunteersHome.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchvolunteersHome.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchvolunteersHome.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer