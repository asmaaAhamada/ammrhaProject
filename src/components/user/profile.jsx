import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom'; // استيراد التنقل
import { gray2, gray6, white } from '../../style/color-main/color';
import { useSelector } from 'react-redux';

export default function ProfileSection() {
  const userInfo = useSelector((state) => state.user?.userInfo);
  const navigate = useNavigate(); // تعريف التوجيه

  return (
    <Box
      onClick={() => navigate('/profile')} // التوجيه لصفحة البروفايل عند النقر
      sx={{
        width: '167px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifycontent: 'space-between',
        padding: '3px',
        backgroundColor: gray6,
        borderRadius: '16px',
        cursor: 'pointer',
      }}
    >
      <Avatar 
        src={userInfo?.avatar || "https://via.placeholder.com/150"} 
        sx={{ width: 40, height: 40 }} 
      />
      
      <Stack direction="row" spacing={2} alignItems="center" textAlign="right">
        <Box>
          <Typography variant="body1" sx={{ color: white }}>
            {userInfo?.full_name || "أسماء الحامدة"}
          </Typography>
          <Typography variant="caption" sx={{ color: gray2 }}>
            {userInfo?.role === "admin"
              ? "مدير النظام"
              : userInfo?.role === "hr_general"
              ? "الموارد البشرية"
              : "متطوع"}
          </Typography>
        </Box>
        <KeyboardArrowDownIcon sx={{ color: '#94a3b8', fontSize: 20, mr: 2 }} />
      </Stack>
    </Box>
  );
}