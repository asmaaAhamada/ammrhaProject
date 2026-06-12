import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ALL, BaseUrl, Complaints, DELET, Employees, GONVERMENT_ENTITIES, Incoming } from '../../Back_end/Api';
import { deleteData, getData } from '../../Back_end/ApiServecies';



export const deletGonverments = createAsyncThunk(
  'program/deletGonverments',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await deleteData(`${BaseUrl}${GONVERMENT_ENTITIES}/${employeeId}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'deletGonverments',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(deletGonverments.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deletGonverments.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(deletGonverments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer