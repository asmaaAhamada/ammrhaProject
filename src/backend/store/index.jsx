import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from '../slice/auth/log_in_Slice'
import userReducer from '../slice/auth/userInfo'
import fetchBlack_listReducer from '../slice/blakList/fetchAll'
import fetchDepartmentReducer from '../slice/department/fetchAll'
import Add_DepartmentReducer from '../slice/department/add'
const store = configureStore({
  reducer: {
 Log_in: Log_inReducer,
 user: userReducer, 
 fetchBlack_list : fetchBlack_listReducer,
 fetchDepartment: fetchDepartmentReducer,
 Add_Department :Add_DepartmentReducer,
}})

export default store