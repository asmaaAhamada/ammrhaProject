import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
  Grid,
  Slide,
  InputAdornment,
  CircularProgress,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import FlagIcon from '@mui/icons-material/Flag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// استيراد مكونات DatePicker مع دعم اللغة العربية و dayjs
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';

import { useTheme } from '@mui/material/styles';
import { white } from '../../style/color-main/color';
import { useDispatch, useSelector } from 'react-redux';
import { Edit_Profile, setformInfo, clearError, resetForm } from '../../backend/slice/profile/editeProfile';
import { ShowProfile } from '../../backend/slice/profile/showProfile';
import { showDiscardConfirmAlert, showSuccessAlert, showErrorAlert } from './profileAlerts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditProfileModal = ({ open, onClose, profileData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { formInfo, isLoading, error, success } = useSelector((state) => state.Edit_Profile);

  // تعبئة بيانات النموذج عند فتح المودال
  useEffect(() => {
    if (open && profileData) {
      dispatch(
        setformInfo({
          full_name: profileData.full_name || '',
          email: profileData.email || '',
          phone_number: profileData.phone_number || '',
          birth_date: profileData.birth_date || '',
          gender: profileData.gender || '',
          residence_place: profileData.residence_place || '',
          nationality: profileData.nationality || '',
          image: profileData.image || '',
        })
      );
    }
  }, [open, profileData, dispatch]);

  // الاستجابة لحالات النجاح أو الفشل
  useEffect(() => {
    if (success) {
      showSuccessAlert('تم تحديث البيانات بنجاح');
      dispatch(ShowProfile());
      dispatch(resetForm());
      onClose();
    }

    if (error) {
      showErrorAlert(typeof error === 'string' ? error : 'حدث خطأ غير متوقع');
      dispatch(clearError());
    }
  }, [success, error, dispatch, onClose]);

  const handleChange = (field) => (e) => {
    dispatch(setformInfo({ [field]: e.target.value }));
  };

  // معالجة تغيير تاريخ الميلاد وتنسيقه كـ YYYY-MM-DD
  const handleDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : '';
    dispatch(setformInfo({ birth_date: formattedDate }));
  };

  const handleSubmit = () => {
    dispatch(Edit_Profile());
  };

  const handleDirectClose = () => {
    dispatch(resetForm());
    onClose();
  };

  const handleCloseAttempt = (event, reason) => {
    if (reason === 'backdropClick') return;

    showDiscardConfirmAlert({
      onSave: handleSubmit,
      onDiscard: handleDirectClose,
    });
  };

  // تنسيق موحد للحقول
  const inputStyleProps = {
    sx: {
      color: theme.palette.primary.text4,
      backgroundColor: theme.palette.primary.inputt,
      borderRadius: '10px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.15)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.button1,
      },
    },
  };

  const labelStyleProps = {
    sx: {
      color: `${theme.palette.primary.text4} !important`,
      fontWeight: 600,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
      <Dialog
        open={open}
        onClose={handleCloseAttempt}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.imagecard1,
            color: theme.palette.primary.text3,
            borderRadius: '16px',
            p: 1,
            direction: 'rtl',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: theme.palette.primary.text4,
            textAlign: 'right',
            fontWeight: 700,
            position: 'relative',
            pt: 2,
          }}
        >
          تعديل الملف الشخصي
          <IconButton
            onClick={handleDirectClose}
            disabled={isLoading}
            sx={{
              position: 'absolute',
              left: 8,
              top: 12,
              color: theme.palette.primary.text4,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
            {/* حقل رفع الصورة الشخصية */}
<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
  <Box sx={{ textAlign: 'center' }}>
    <Button
      variant="outlined"
      component="label"
      sx={{
        borderRadius: '12px',
        borderColor: theme.palette.primary.button1,
        color: theme.palette.primary.text4,
      }}
    >
      تغيير الصورة الشخصية
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            dispatch(setformInfo({ image: e.target.files[0] }));
          }
        }}
      />
    </Button>
    {formInfo.image && formInfo.image instanceof File && (
      <Typography variant="caption" display="block" sx={{ mt: 0.5, color: 'green' }}>
        تم اختيار: {formInfo.image.name}
      </Typography>
    )}
  </Box>
</Grid>
            {/* 1. الاسم الكامل */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                value={formInfo.full_name || ''}
                onChange={handleChange('full_name')}
                variant="outlined"
                disabled={isLoading}
                InputLabelProps={labelStyleProps}
                InputProps={{
                  ...inputStyleProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: theme.palette.primary.button1 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* 2. رقم الهاتف */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                value={formInfo.phone_number || ''}
                onChange={handleChange('phone_number')}
                variant="outlined"
                disabled={isLoading}
                InputLabelProps={labelStyleProps}
                InputProps={{
                  ...inputStyleProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: theme.palette.primary.button1 }} />
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
                value={formInfo.email || ''}
                onChange={handleChange('email')}
                variant="outlined"
                disabled={isLoading}
                InputLabelProps={labelStyleProps}
                InputProps={{
                  ...inputStyleProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: theme.palette.primary.button1 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* 4. مكان الإقامة */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="مكان الإقامة"
                value={formInfo.residence_place || ''}
                onChange={handleChange('residence_place')}
                variant="outlined"
                disabled={isLoading}
                InputLabelProps={labelStyleProps}
                InputProps={{
                  ...inputStyleProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon sx={{ color: theme.palette.primary.button1 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* 5. تاريخ الميلاد المصمم بتنسيق جميل وأنيق */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="تاريخ الميلاد"
                value={formInfo.birth_date ? dayjs(formInfo.birth_date) : null}
                onChange={handleDateChange}
                disabled={isLoading}
                format="YYYY-MM-DD"
                slots={{
                  openPickerIcon: CalendarMonthIcon,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    InputLabelProps: labelStyleProps,
                    InputProps: {
                      ...inputStyleProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CakeIcon sx={{ color: theme.palette.primary.button1 }} />
                        </InputAdornment>
                      ),
                    },
                  },
                  // تنسيق ألوان الرزنامة المنبثقة
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        borderRadius: '16px',
                        backgroundColor: theme.palette.primary.imagecard1,
                        color: theme.palette.primary.text4,
                        boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      },
                      '& .MuiPickersDay-root': {
                        color: theme.palette.primary.text4,
                        borderRadius: '8px',
                        '&.Mui-selected': {
                          backgroundColor: `${theme.palette.primary.button1} !important`,
                          color: '#fff',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        },
                      },
                      '& .MuiDayCalendar-weekDayLabel': {
                        color: theme.palette.primary.button1,
                        fontWeight: 'bold',
                      },
                      '& .MuiPickersCalendarHeader-label': {
                        color: theme.palette.primary.text4,
                        fontWeight: 'bold',
                      },
                      '& .MuiIconButton-root': {
                        color: theme.palette.primary.button1,
                      },
                    },
                  },
                }}
              />
            </Grid>

           {/* 6. الجنس */}
<Grid item xs={12} sm={6}>
  <TextField
    select
    fullWidth
    label="الجنس"
    value={
      formInfo.gender === 'ذكر' || formInfo.gender === 'male'
        ? 'male'
        : formInfo.gender === 'أنثى' || formInfo.gender === 'female'
        ? 'female'
        : ''
    }
    onChange={(e) => dispatch(setformInfo({ gender: e.target.value }))}
    variant="outlined"
    disabled={isLoading}
    InputLabelProps={labelStyleProps}
    InputProps={{
      ...inputStyleProps,
      startAdornment: (
        <InputAdornment position="start">
          <WcIcon sx={{ color: theme.palette.primary.button1 }} />
        </InputAdornment>
      ),
    }}
  >
    <MenuItem value="male">ذكر</MenuItem>
    <MenuItem value="female">أنثى</MenuItem>
  </TextField>
</Grid>

            {/* 7. الجنسية */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="الجنسية"
                value={formInfo.nationality || ''}
                onChange={handleChange('nationality')}
                variant="outlined"
                disabled={isLoading}
                InputLabelProps={labelStyleProps}
                InputProps={{
                  ...inputStyleProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagIcon sx={{ color: theme.palette.primary.button1 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* أزرار العمليات */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                py: 1.2,
                backgroundColor: theme.palette.primary.button1,
                color: white,
                fontWeight: 600,
                borderRadius: '12px',
                fontSize: '15px',
                '&:hover': {
                  backgroundColor: theme.palette.primary.button1,
                },
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'حفظ التعديلات'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleDirectClose}
              disabled={isLoading}
              sx={{
                py: 1.2,
                borderColor: 'rgba(0,0,0,0.2)',
                color: theme.palette.primary.text4,
                fontWeight: 600,
                borderRadius: '12px',
                fontSize: '15px',
                '&:hover': {
                  borderColor: theme.palette.primary.button1,
                  backgroundColor: 'rgba(0,0,0,0.02)',
                },
              }}
            >
              إلغاء
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EditProfileModal;