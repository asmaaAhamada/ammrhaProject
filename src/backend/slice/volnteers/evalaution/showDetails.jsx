import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, EVALUTION, Event, hr } from '../../../Api';
import { getData } from '../../../ApiServecies';





export const ShowEvaloutionDetails = createAsyncThunk(
  "program/ShowEvaloutionDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${EVALUTION}${hr}${Event}/${id}`
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
    name: 'ShowEvaloutionDetails',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(ShowEvaloutionDetails.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(ShowEvaloutionDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(ShowEvaloutionDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer