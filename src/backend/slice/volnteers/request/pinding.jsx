import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../../ApiServecies';
import { BaseUrl, Pinding, Volunteer_Request } from '../../../Api';




export const fetchrequest_pinding = createAsyncThunk(
  "program/fetchrequest_pinding",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Volunteer_Request}${Pinding}`
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
    name: 'fetchrequest_pinding',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchrequest_pinding.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchrequest_pinding.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(fetchrequest_pinding.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer