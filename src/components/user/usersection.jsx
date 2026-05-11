import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutSection from './logout';
import ProfileSection from './profile';

export default function UserMenuSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%', // يمكنك تعديل العرض حسب الحاجة
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
      }}
    >
      {/* بوكس معلومات المستخدم العلوي */}
      
<ProfileSection/>
      {/* زر تسجيل الخروج */}
     <LogoutSection/>
    </Box>
  );
}