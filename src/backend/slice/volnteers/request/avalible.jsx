import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../../ApiServecies';
import { BaseUrl,  Volunteer_Request, HR, Intervews } from '../../../Api';




export const fetchrequest_avalaible = createAsyncThunk(
  "program/fetchrequest_avalaible",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${HR}${Intervews}`
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
    name: 'fetchrequest_avalaible',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchrequest_avalaible.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchrequest_avalaible.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(fetchrequest_avalaible.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer