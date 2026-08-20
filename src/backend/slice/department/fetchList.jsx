import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { Available, BaseUrl, BLACK_LIST, Departments, LIST, Procedures } from '../../Api';
import { getData } from '../../ApiServecies';



export const fetchDepartmentList = createAsyncThunk(
  "program/fetchDepartmentList",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${Departments}/lists`
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
    name: 'fetchDepartmentList',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchDepartmentList.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchDepartmentList.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(fetchDepartmentList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer