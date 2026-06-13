import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { Announcement, BaseUrl, Delete } from '../../Api';
import { deleteData } from '../../ApiServecies';




export const deletAnnouncement = createAsyncThunk(
  'program/deletAnnouncement',
  async (criterion, { rejectWithValue }) => {
    try {
      const response = await deleteData(`${BaseUrl}${Announcement}${Delete}/${criterion}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'deletAnnouncement',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(deletAnnouncement.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deletAnnouncement.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(deletAnnouncement.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer