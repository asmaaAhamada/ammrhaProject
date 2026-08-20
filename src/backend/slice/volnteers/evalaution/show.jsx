import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, EVALUTION, Event, hr } from '../../../Api';
import { getData } from '../../../ApiServecies';





export const ShowEvaloution = createAsyncThunk(
  "program/ShowEvaloution",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${EVALUTION}${hr}${Event}`
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
    name: 'ShowEvaloution',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(ShowEvaloution.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(ShowEvaloution.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(ShowEvaloution.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer