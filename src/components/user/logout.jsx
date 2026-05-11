import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { babyred, red } from '../../style/color-main/color';

export default function LogoutSection() {
  const theme = useTheme();

  return (
   
     <>
     <Button
        
        variant="contained"
        sx={{
            width:'223px',height:'48px',
          backgroundColor: babyred, // لون زهري شفاف
          color: red, // لون النص الزهري
          borderRadius: '16px',
          padding: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row-reverse', // لجعل الأيقونة يسار النص في العربي
          gap: 1
        }}
      >
        تسجيل الخروج
        <LogoutIcon  />
      </Button>
     
     </>
       

      

  );
}