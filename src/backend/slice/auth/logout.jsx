import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import Cookies from 'universal-cookie';
import { postData } from '../../ApiServecies';
import { BaseUrl } from '../../Api';



const initialState = {
  formInfo: {
    
   
   
  },
  isLoading: false,
  error: null,
  
};

export const Logout = createAsyncThunk(
  'Log_in/Logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

    

      const response = await postData(`${BaseUrl}/logout`,  {}, true);
      console.log("📦 login response:", response);

return response;




     
    } catch (error) {
      return rejectWithValue(error?.message || 'فشل التسجيل');
    }
  }
);

const formSlice = createSlice({
  name: 'Logout',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
    state.error = null;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.isLoading = false;
  state.user = action.payload;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
