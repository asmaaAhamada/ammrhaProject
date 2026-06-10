import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from '../slice/auth/log_in_Slice'
import userReducer from '../slice/auth/userInfo'
const store = configureStore({
  reducer: {
 Log_in: Log_inReducer,
 user: userReducer, 
}})

export default store