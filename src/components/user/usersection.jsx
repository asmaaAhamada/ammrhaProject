import React, { useState } from 'react';
import { Box } from '@mui/material';
import LogoutSection from './logout';
import ProfileSection from './profile';
import Log_outModal from './logout';

export default function UserMenuSection() {
  // حالة التحكم بفتح وإغلاق مودال تسجيل الخروج
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
      }}
    >
      {/* بوكس معلومات المستخدم العلوي */}
      <ProfileSection />
      
      {/* زر تسجيل الخروج - نمرر أكشن الفتح عند النقر */}
      <Box onClick={() => setIsLogoutOpen(true)} sx={{ width: '100%', cursor: 'pointer' }}>
        <LogoutSection />
      </Box>

      {/* استدعاء المودال هنا وتمرير الحالات له */}
      <Log_outModal 
        open={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
      />
    </Box>
  );
}