import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import {  BaseUrl, Volnteers } from '../../Api';




export const fetchvolunteers = createAsyncThunk(
  "program/fetchvolunteers",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Volnteers}`
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
    name: 'fetchvolunteers',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchvolunteers.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchvolunteers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchvolunteers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer