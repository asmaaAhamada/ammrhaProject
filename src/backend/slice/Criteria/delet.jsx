import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, Criteria } from '../../Api';
import { deleteData } from '../../ApiServecies';




export const deletCriteria = createAsyncThunk(
  'program/deletCriteria',
  async (criterion, { rejectWithValue }) => {
    try {
      const response = await deleteData(`${BaseUrl}${Criteria}/${criterion}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'deletCriteria',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(deletCriteria.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deletCriteria.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(deletCriteria.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer