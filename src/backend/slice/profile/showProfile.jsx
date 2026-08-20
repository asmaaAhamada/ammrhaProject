import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import { ADMIN, BaseUrl, PROFILE } from '../../Api';






export const ShowProfile = createAsyncThunk(
  "program/ShowProfile",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${ADMIN}${PROFILE}`
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
    name: 'ShowProfile',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(ShowProfile.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(ShowProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(ShowProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer