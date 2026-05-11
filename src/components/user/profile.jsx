

import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutSection from './logout';
import { gray2, gray5, gray6, white } from '../../style/color-main/color';

export default function ProfileSection() {
  const theme = useTheme();

  return (


<Box
        sx={{
          width: '167px',height:'56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
         padding:'3px',
          backgroundColor: gray6, // لون خلفية خفيفة
          borderRadius: '16px',
          cursor: 'pointer',
        }}
      >
         <Avatar 
            src="https://via.placeholder.com/150" // ضع رابط الصورة هنا
            sx={{ width: 40, height: 40,  }} 
          />
        
        <Stack direction="row" spacing={2} alignItems="center" textAlign="right">
          <Box>
            <Typography variant="body1" sx={{ color: white,   }}>
              أحمد محمد
            </Typography>
            <Typography variant="caption" sx={{ color: gray2 }}>
              مدير النظام
            </Typography>
          </Box>
                 <KeyboardArrowDownIcon sx={{ color: '#94a3b8', fontSize: 20,mr:2 }} />

        </Stack>
      </Box>)};