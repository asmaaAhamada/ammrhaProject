import React, { useEffect, useState, lazy, Suspense } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  Paper, 
  Grid, 
  Chip, 
  Alert,
  Skeleton,
  Button,
  InputAdornment
} from '@mui/material';
import { useTheme } from "@mui/material/styles";

// أيقونات الواجهة
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import ShieldIcon from '@mui/icons-material/Shield';

// أيقونات الحقول
import TagIcon from '@mui/icons-material/Tag';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import FlagIcon from '@mui/icons-material/Flag';
import BusinessIcon from '@mui/icons-material/Business';

import ImageVar from '../../assets/image/logo/profieimage.png';
import { useDispatch, useSelector } from 'react-redux';
import { ShowProfile } from '../../backend/slice/profile/showProfile';
import { white } from '../../style/color-main/color';

// Lazy loading للمودال
const EditProfileModal = lazy(() => import('./EditProfileModal'));

export default function ProfilePage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [openEditModal, setOpenEditModal] = useState(false);

  // استخراج البيانات
  const { data: response, isLoading, error } = useSelector((state) => state.ShowProfile);
  const profileData = response?.data || response;

  useEffect(() => {
    dispatch(ShowProfile());
  }, [dispatch]);

  // شارة الدور / الصلاحية
  const getRoleBadge = (role) => {
    switch (role) {
      case 'المدير العام':
      case 'admin':
        return { label: 'المدير العام', color: 'error' };
      case 'hr_department':
      case 'hr_general':
        return { label: 'مسؤول موارد بشرية', color: 'info' };
      default:
        return { label: role || 'إداري', color: 'primary' };
    }
  };

  // دالة تحديد نص القسم مع مراعاة دور المدير العام
  const getDepartmentText = () => {
    const isGeneralManager = profileData?.role === 'المدير العام' || profileData?.role === 'admin';
    const hasNoDepartment = !profileData?.department || profileData?.department === 'غير محدد';

    if (isGeneralManager && hasNoDepartment) {
      return '  (إشراف على جميع الأقسام)';
    }

    return profileData?.department || 'غير محدد';
  };

  const fieldStyleProps = {
    sx: {
      backgroundColor: theme.palette.primary.inputt,
      borderRadius: '10px',
      '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: theme.palette.primary.text4,
        fontWeight: 500,
      }
    }
  };

  const labelStyleProps = {
    sx: {
      color: `${theme.palette.primary.text4} !important`,
      fontWeight: 700,
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, direction: 'rtl', display: 'flex', justifyContent: 'center' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%', 
            maxWidth: 900, 
            borderRadius: '24px', 
            overflow: 'hidden',
            backgroundColor: theme.palette.primary.imagecard1 
          }}
        >
          <Skeleton variant="rectangular" height={200} animation="wave" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          <Box sx={{ px: { xs: 2, md: 4 }, pb: 4, position: 'relative' }}>
            <Skeleton variant="circular" width={120} height={120} animation="wave" sx={{ position: 'absolute', top: '-60px', right: '32px', border: '4px solid #ffffff', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
            <Grid container spacing={4} sx={{ mt: 6 }}>
              <Grid item xs={12} md={4} sx={{ borderLeft: { md: '1px solid #e2e8f0' } }}>
                <Box sx={{ pt: 2 }}>
                  <Skeleton variant="text" width="80%" height={35} animation="wave" sx={{ mb: 1, backgroundColor: 'rgba(255, 255, 255, 0.25)' }} />
                  <Skeleton variant="rounded" width={110} height={28} animation="wave" sx={{ borderRadius: '8px', mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                  <Skeleton variant="rounded" width={90} height={24} animation="wave" sx={{ borderRadius: '8px', mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Skeleton variant="text" width={150} height={30} animation="wave" sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.25)' }} />
                <Grid container spacing={3}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Grid item xs={12} sm={6} key={item}>
                      <Skeleton variant="rounded" height={56} animation="wave" sx={{ borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.18)' }} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Alert severity="error" sx={{ width: '100%', maxWidth: 600, borderRadius: '12px' }}>
          {typeof error === 'string' ? error : 'حدث خطأ أثناء جلب بيانات الملف الشخصي'}
        </Alert>
      </Box>
    );
  }

  if (!profileData) return null;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, direction: 'rtl', display: 'flex', justifyContent: 'center' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: 900, 
          borderRadius: '24px', 
          overflow: 'hidden',
          backgroundColor: theme.palette.primary.imagecard1 
        }}
      >
        {/* الغلاف */}
        <Box 
          sx={{ 
            height: '200px', 
            width: '100%', 
            backgroundImage: `url(${ImageVar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            px: 4
          }}
        >
          <Typography variant="h5" sx={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.25)', fontWeight: 800, letterSpacing: 2 }}>
            مؤسسة عمرها التطوعية
          </Typography>
        </Box>

        {/* محتوى البطاقة */}
        <Box sx={{ px: { xs: 2, md: 4 }, pb: 4, position: 'relative' }}>
          
          <Avatar 
            src={profileData.image || ''} 
            alt={profileData.full_name}
            sx={{ 
              width: 120, 
              height: 120, 
              border: '4px solid #ffffff', 
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              position: 'absolute',
              top: '-60px',
              right: '32px'
            }}
          >
            {profileData.full_name ? profileData.full_name.charAt(0) : 'U'}
          </Avatar>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            
            {/* العمود الأيمن */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'right' }, borderLeft: { md: '1px solid #e2e8f0' } }}>
              <Box sx={{ pt: { xs: 2, md: 2 }, width: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.text4, mb: 1 }}>
                  {profileData.full_name || 'غير محدد'}
                </Typography>
                
                <Chip 
                  label={getRoleBadge(profileData.role).label} 
                  color={getRoleBadge(profileData.role).color}
                  sx={{ fontWeight: 600, px: 1, mb: 2, borderRadius: '8px' }}
                />

                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={`الحالة: ${profileData.status || 'غير محدد'}`}
                    color={profileData.status === 'نشط' ? 'success' : 'default'}
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 600, color: theme.palette.primary.text4 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <CalendarMonthIcon fontSize="small" sx={{ color: theme.palette.primary.text4 }} />
                  <Typography variant="body2" sx={{ color: theme.palette.primary.text4 }}>
                    تاريخ الانضمام: {profileData.join_date || 'غير محدد'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* العمود الأيسر - عرض جميع بيانات الباك إند */}
            <Grid item xs={12} md={8}>
              {/* شريط العنوان مع زر التعديل */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.text4 }}>
                  البيانات الشخصية
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<EditIcon sx={{ ml: 0.5, mr: -0.5 }} />}
                  onClick={() => setOpenEditModal(true)}
                  sx={{
                    backgroundColor: theme.palette.primary.button1,
                    color: white,
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2.5,
                    py: 0.7,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.button1,
                    }
                  }}
                >
                  تعديل
                </Button>
              </Box>
              
              <Grid container spacing={2.5}>
                {/* 1. المعرف (ID) */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="المعرف (ID)"
                    value={profileData.id ?? 'غير متوفر'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <TagIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 2. الاسم الكامل */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="الاسم الكامل"
                    value={profileData.full_name || 'غير محدد'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 3. البريد الإلكتروني */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="البريد الإلكتروني"
                    value={profileData.email || 'غير متوفر'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 4. رقم الهاتف */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="رقم الهاتف"
                    value={profileData.phone_number || 'غير متوفر'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 5. تاريخ الميلاد */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="تاريخ الميلاد"
                    value={profileData.birth_date || 'غير محدد'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CakeIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 6. الجنس */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="الجنس"
                    value={profileData.gender || 'غير محدد'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <WcIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 7. مكان الإقامة */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="مكان الإقامة"
                    value={profileData.residence_place || 'غير محدد'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 8. الجنسية */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="الجنسية"
                    value={profileData.nationality || 'غير محدد'}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 9. القسم (مُعدّل للمدير العام) */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="القسم"
                    value={getDepartmentText()}
                    disabled
                    variant="outlined"
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* 10. الصلاحية */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="صلاحية الحساب الحالية"
                    value={getRoleBadge(profileData.role).label}
                    disabled
                    variant="outlined"
                    helperText="لا يمكن تعديل الصلاحية إلا من قبل رئيس الإدارة"
                    FormHelperTextProps={{
                      sx: {
                        color: '#ef4444 !important',
                        '&.Mui-disabled': { color: '#ef4444 !important' },
                      },
                    }}
                    InputLabelProps={labelStyleProps}
                    InputProps={{
                      ...fieldStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <ShieldIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Box>
      </Paper>

      {/* مودال التعديل المحمل كسولاً */}
      {openEditModal && (
        <Suspense fallback={null}>
          <EditProfileModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            profileData={profileData}
          />
        </Suspense>
      )}
    </Box>
  );
}