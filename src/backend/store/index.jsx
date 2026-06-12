import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from '../slice/auth/log_in_Slice'
import userReducer from '../slice/auth/userInfo'
import fetchBlack_listReducer from '../slice/blakList/fetchAll'
import fetchDepartmentReducer from '../slice/department/fetchAll'
import Add_DepartmentReducer from '../slice/department/add'
import Edit_DepartmentReducer from '../slice/department/Edit'
import fetchDetailsReducer from '../slice/department/deteails'
import fetchCriteriaReducer from '../slice/Criteria/fetchAll'
import deletCriteriaReducer from '../slice/Criteria/delet'
import Edit_CriteriaReducer from '../slice/Criteria/Edit'
import Add_CriteriaReducer from '../slice/Criteria/add'
const store = configureStore({
  reducer: {
 Log_in: Log_inReducer,
 user: userReducer, 
 fetchBlack_list : fetchBlack_listReducer,
 fetchDepartment: fetchDepartmentReducer,
 Add_Department :Add_DepartmentReducer,
 Edit_Department: Edit_DepartmentReducer,
 fetchDetails : fetchDetailsReducer,
 fetchCriteria: fetchCriteriaReducer,
 deletCriteria :deletCriteriaReducer,
 Edit_Criteria :Edit_CriteriaReducer,
 Add_Criteria:Add_CriteriaReducer
}})

export default store