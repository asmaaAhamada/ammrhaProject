
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Space } from "antd"; 
import { FormControl, Select, MenuItem } from "@mui/material"; 
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { fetchRanks } from "../../../backend/slice/Ranks/fetchAll";
import { fetchvolunteers } from "../../../backend/slice/volnteers/fetchAll";

import VolunteersTable from "./volintersTable";
import VolunteersStatsCards from "./VolunteersStatsCards ";

export default function Volunteerspage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  // الفلاتر المعتمدة
  const [statusFilter, setStatusFilter] = useState(""); // ستأخذ قيمة "نشط" أو "غير نشط"
  const [deptFilter, setDeptFilter] = useState("");
  const [rankFilter, setRankFilter] = useState("");

  const { data: departments } = useSelector((state) => state.fetchDepartment);
  const { data: ranks } = useSelector((state) => state.fetchRanks);

  // جلب البيانات الأساسية للقوائم المنسدلة عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchRanks());
  }, [dispatch]);

  // إرسال طلب الفلترة فور تغيير أي فلتر
  useEffect(() => {
    // تحويل القيمة النصية إلى القيمة الرقمية التي يطلبها الـ Backend (1 للنشط، 0 لغير النشط)
    let activeParam = "";
    if (statusFilter === "نشط") activeParam = "1";
    if (statusFilter === "غير نشط") activeParam = "0";
    
    dispatch(
      fetchvolunteers({
        department_id: deptFilter,
        rank_id: rankFilter,
        is_active: activeParam,
      })
    );
  }, [statusFilter, deptFilter, rankFilter, dispatch]);

  return (
    <VolunteersTable
      isHomePage={false}
      statsContent={<VolunteersStatsCards />} 
      topContent={
        <Space
          wrap
          size="middle"
          style={{
            width: "100%",
            marginBottom: "15px",
            justifyContent: "flex-start",
          }}
        >
          {/* 🌟 فلتر الحالة المعدل (نشط / غير نشط) */}
          <FormControl>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={{
                height: { xs: "40px", md: "48px" },
                width: { xs: "180px", md: "217px" },
                borderRadius: "12px",
                backgroundColor: theme.palette.primary.logo,
                color: theme.palette.primary.button3,
                direction: "rtl",
                "& .MuiOutlinedInput-notchedOutline": { border: `1px solid ${theme.palette.primary.moreborder}` },
                "& .MuiSelect-icon": { color: theme.palette.primary.button3, fontSize: "30px", left: "10px", right: "auto" },
                "& .MuiSelect-select": { padding: "10px 14px", textAlign: "right" },
              }}
            >
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="">حسب الحالة (الكل)</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="نشط">نشط</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="غير نشط">غير نشط</MenuItem>
            </Select>
          </FormControl>

          {/* فلتر القسم */}
          <FormControl>
            <Select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              displayEmpty
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={{
                height: { xs: "40px", md: "48px" },
                width: { xs: "180px", md: "217px" },
                borderRadius: "12px",
                backgroundColor: theme.palette.primary.logo,
                color: theme.palette.primary.button3,
                direction: "rtl",
                "& .MuiOutlinedInput-notchedOutline": { border: `1px solid ${theme.palette.primary.moreborder}` },
                "& .MuiSelect-icon": { color: theme.palette.primary.button3, fontSize: "30px", left: "10px", right: "auto" },
                "& .MuiSelect-select": { padding: "10px 14px", textAlign: "right" },
              }}
            >
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="">حسب القسم (الكل)</MenuItem>
              {departments?.map((dept) => (
                <MenuItem key={dept.id} sx={{ color: theme.palette.primary.button3 }} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* فلتر الرتبة */}
          <FormControl>
            <Select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              displayEmpty
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={{
                height: { xs: "40px", md: "48px" },
                width: { xs: "180px", md: "217px" },
                borderRadius: "12px",
                backgroundColor: theme.palette.primary.logo,
                color: theme.palette.primary.button3,
                direction: "rtl",
                "& .MuiOutlinedInput-notchedOutline": { border: `1px solid ${theme.palette.primary.moreborder}` },
                "& .MuiSelect-icon": { fontSize: "30px", left: "10px", right: "auto" },
                "& .MuiSelect-select": { padding: "10px 14px", textAlign: "right" },
              }}
            >
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="">حسب الرتبة (الكل)</MenuItem>
              {ranks?.map((rank) => (
                <MenuItem key={rank.id} sx={{ color: theme.palette.primary.button3 }} value={rank.id}>
                  {rank.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Space>
      }
    />
  );
}