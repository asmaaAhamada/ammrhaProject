import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../../ApiServecies';
import { BaseUrl, finished, Volunteer_Request } from '../../../Api';




export const fetchrequest_finished = createAsyncThunk(
  "program/fetchrequest_finished",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Volunteer_Request}${finished}`
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
    name: 'fetchrequest_finished',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchrequest_finished.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchrequest_finished.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(fetchrequest_finished.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer