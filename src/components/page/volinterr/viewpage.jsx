
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Table, Avatar, Space, Tooltip } from "antd";
import BlockIcon from "../../../assets/icons/block.svg?react";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";
import { babygreen, white, yallow } from "../../../style/color-main/color";
import { Box, Button } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VolunteersTable from "./volintersTable";
import VolunteersStatsCards from "./VolunteersStatsCards ";
export default function Volunteerspage() {
  const theme = useTheme();

  
return (
    <VolunteersTable
      // نمرر الكاردات هنا لتعرض فقط في صفحة المتطوعين
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
  {/* حسب الحالة */}
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
  direction: "rtl", // النص يمين

  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.primary.moreborder}`,
  },

  "& .MuiSelect-icon": {
    color: theme.palette.primary.button3,
    fontSize: "30px",
    left: "10px",   // نقل السهم لليسار
    right: "auto",
  },

  "& .MuiSelect-select": {
    padding: "10px 14px",
    textAlign: "right", // الكلام يمين
  },
}}
    >
      <MenuItem sx={{color: theme.palette.primary.button3,}} value="">حسب الحالة</MenuItem>
      <MenuItem  sx={{color: theme.palette.primary.button3,}} value="نشط">نشط</MenuItem>
      <MenuItem  sx={{color: theme.palette.primary.button3,}} value="مجمّد">مجمّد</MenuItem>
    </Select>
  </FormControl>

  {/* حسب القسم */}
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
  direction: "rtl", // النص يمين

  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.primary.moreborder}`,
  },

  "& .MuiSelect-icon": {
    color: theme.palette.primary.button3,
    fontSize: "30px",
    left: "10px",   // نقل السهم لليسار
    right: "auto",
  },

  "& .MuiSelect-select": {
    padding: "10px 14px",
    textAlign: "right", // الكلام يمين
  },
}}
    >
      <MenuItem  sx={{color: theme.palette.primary.button3,}} value="">حسب القسم</MenuItem>
      <MenuItem sx={{color: theme.palette.primary.button3,}}  value="الإعلام">الإعلام</MenuItem>
      <MenuItem sx={{color: theme.palette.primary.button3,}}  value="التنظيم">التنظيم</MenuItem>
      <MenuItem sx={{color: theme.palette.primary.button3,}}  value="العلاقات">العلاقات</MenuItem>
    </Select>
  </FormControl>

  {/* حسب الرتبة */}
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
  direction: "rtl", // النص يمين

  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.primary.moreborder}`,
  },

  "& .MuiSelect-icon": {
    fontSize: "30px",
    left: "10px",   // نقل السهم لليسار
    right: "auto",
  },

  "& .MuiSelect-select": {
    padding: "10px 14px",
    textAlign: "right", // الكلام يمين
  },
}}
    >
      <MenuItem sx={{color: theme.palette.primary.button3,}} value="">حسب الرتبة</MenuItem>
      <MenuItem sx={{color: theme.palette.primary.button3,}} value="ذهبي">ذهبي</MenuItem>
      <MenuItem sx={{color: theme.palette.primary.button3,}} value="فضي">فضي</MenuItem>
      <MenuItem sx={{color: theme.palette.primary.button3,}} value="بلاتيني">بلاتيني</MenuItem>
      
    </Select>
    
  </FormControl>
</Space>
  }
/>

  );

}
  
