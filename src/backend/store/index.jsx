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
import fetchAnnouncementReducer from '../slice/announcement/fetchAll'
import Add_AnnouncementReducer from '../slice/announcement/add'
import deletAnnouncementReducer from '../slice/announcement/delet'
import Update_AnnouncementReducer from '../slice/announcement/Edit'
import fetchDetailsAnnouncementReducer from '../slice/announcement/deteails'
import fetchComplaintsReducer from '../slice/complaints/fetchAll'
import fetchDetailsComplaintsReducer from '../slice/complaints/deteails'
import Update_ComplaintsReducer from '../slice/complaints/Edit'
import fetchHonorReducer from '../slice/honor/fetchAll'
import fetchRanksReducer from '../slice/Ranks/fetchAll'
import Add_RanksReducer from '../slice/Ranks/add'
import deletRanksReducer from '../slice/Ranks/delet'
import Edit_RanksReducer from '../slice/Ranks/Edit'
// import filter_HonorReducer from '../slice/honor/filter'
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
 Add_Criteria:Add_CriteriaReducer,
 fetchAnnouncement :fetchAnnouncementReducer,
 Add_Announcement :Add_AnnouncementReducer,
 deletAnnouncement:deletAnnouncementReducer,
 Update_Announcement:Update_AnnouncementReducer,
 fetchDetailsAnnouncement:fetchDetailsAnnouncementReducer,
 fetchComplaints:fetchComplaintsReducer,
 fetchDetailsComplaints :fetchDetailsComplaintsReducer,
 Update_Complaints:Update_ComplaintsReducer,
 fetchHonor:fetchHonorReducer,
//  filter_Honor :filter_HonorReducer
fetchRanks:fetchRanksReducer,
Add_Ranks:Add_RanksReducer,
deletRanks:deletRanksReducer,
Edit_Ranks:Edit_RanksReducer
}})

export default store