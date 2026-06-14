import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, Ranks } from '../../Api';
import { deleteData } from '../../ApiServecies';




export const deletRanks = createAsyncThunk(
  'program/deletRanks',
  async (criterion, { rejectWithValue }) => {
    try {
      const response = await deleteData(`${BaseUrl}${Ranks}/${criterion}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'deletRanks',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(deletRanks.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deletRanks.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(deletRanks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer