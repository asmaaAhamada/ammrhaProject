import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, BLACK_LIST, Procedures } from '../../Api';
import { getData } from '../../ApiServecies';



export const fetchBlack_list = createAsyncThunk(
  "program/fetchBlack_list",
  async (_, { rejectWithValue }) => {
    try {

      const response = await getData(
        `${BaseUrl}${Procedures}${BLACK_LIST}`
      );


      return response;
    } catch (error) {
      console.log("API ERROR", error);

      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchBlack_list',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchBlack_list.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchBlack_list.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(fetchBlack_list.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer