// Volunteerspage.jsx - الجزء العلوي من الملف بعد التعديل

import React from "react";
import { useTheme } from "@mui/material/styles";

// 1. استيراد المكونات الخاصة بـ Ant Design فقط
import { Space } from "antd"; 

// 2. استيراد المكونات الخاصة بـ Material-UI (MUI) فقط ومعها الـ MenuItem الصحيح
import { FormControl, Select, MenuItem } from "@mui/material"; 

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import VolunteersTable from "./volintersTable";
import VolunteersStatsCards from "./VolunteersStatsCards ";

export default function Volunteerspage() {
  const theme = useTheme();

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
          {/* فلتر الحالة */}
          <FormControl>
            <Select
              defaultValue=""
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
              {/* 👇 الآن ستعمل الـ MenuItem هنا بشكل طبيعي وبدون أي Error */}
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="">حسب الحالة</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="نشط">نشط</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="مجمّد">مجمّد</MenuItem>
            </Select>
          </FormControl>

          {/* فلتر القسم */}
          <FormControl>
            <Select
              defaultValue=""
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
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="">حسب القسم</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="الإعلام">الإعلام</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="التنظيم">التنظيم</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="العلاقات">العلاقات</MenuItem>
            </Select>
          </FormControl>

          {/* فلتر الرتبة */}
          <FormControl>
            <Select
              defaultValue=""
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
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="">حسب الرتبة</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="ذهبي">ذهبي</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="فضي">فضي</MenuItem>
              <MenuItem sx={{ color: theme.palette.primary.button3 }} value="بلاتيني">بلاتيني</MenuItem>
            </Select>
          </FormControl>
        </Space>
      }
    />
  );
}