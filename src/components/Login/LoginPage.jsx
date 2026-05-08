import { Box, Container, Card, TextField, Typography, Button, IconButton, InputAdornment, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ImageCard from './image'; // تأكد أن المكون بداخله يتعامل مع العرض بشكل مرن
import Hello from "./hello";
import { blue1, gray12, gray13, lighttext, white } from "../../style/color-main/color";

export default function LoginPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        p: { xs: 2, md: 0 } // هوامش بسيطة على الموبايل
      }}
    >
      <Card
  sx={{
    display: 'flex',
    flexDirection: 'row',
    width: { xs: '100%', sm: '90%', md: '800px' },
    height: { xs: 'auto', md: '510px' },
    boxShadow: 8,
    borderRadius: '12px',
    overflow: 'hidden',
  }}
>
        {/*  القسم الأيمن (الصورة) - يظهر أولاً في الموبايل */}
        <Box sx={{ 
          flex: 1, 
          order: { xs: 1, md: 2 }, // في الموبايل ترتيبه 1 (فوق)
          height: {  md: '100%' } ,
              display: { xs: 'none', md: 'block' },

        }}>
          <ImageCard />
        </Box>

      {/*  القسم الأيسر (الفورم) */}
<Box
  sx={{
    flex: 1,
    order: { xs: 2, md: 1 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    p: { xs: 1, md: 3 },
    pb: 5, // أضفنا padding bottom لضمان ظهور مساحة بيضاء تحت البوكس
  }}
>
  {/* نصوص الترحيب */}
  <Hello />

  {/*  البوكس المفرغ (Bordered Container) */}
  <Box
    sx={{
      width: { xs: '90%', md: '409px' },
      height: '320px', // زدنا الارتفاع قليلاً ليتسع للزر براحة
      border: `1px solid ${lighttext}`,
      borderRadius: '16px',
      p: 3,
      mt: -3, // رفعنا البوكس لفوق أكثر
      display: 'flex',
      background: gray13,
      flexDirection: 'column',
      boxSizing: 'border-box', // لضمان عدم خروج العناصر عن الحواف
    }}
  >
    {/* الحقول */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box>
        <Typography sx={{ mb: 0.5, fontSize: '14px', textAlign: 'right', color: blue1, fontWeight: 600 }}>
          الاسم
        </Typography>
        <TextField
          fullWidth
          placeholder="اكتب اسمك"
          autoComplete="off" // لمنع التعبئة التلقائية
            InputProps={{
    sx: {
      direction: 'rtl',
      textAlign: 'right',
    },
    '& input': {
      textAlign: 'right',
    },
  }}
          sx={{
textAlign:'right',            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'white', // تغيير الخلفية للأبيض لتبدو نظيفة
              height: '45px',
            },
          }}
        />
      </Box>

      <Box>
        <Typography sx={{ mb: 0.5, fontSize: '14px', textAlign: 'right', color: blue1, fontWeight: 600 }}>
          كلمة السر
        </Typography>
        <TextField
        
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder="ادخل كلمة السر"
          autoComplete="new-password" 
          // لمنع التعبئة التلقائية للكلمة المحفوظة
       InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility sx={{color: blue1}} /> : <VisibilityOff sx={{color: blue1}} />}
                </IconButton>
              </InputAdornment>
            ),sx: {
      direction: 'rtl',
      textAlign: 'right',
    },
       
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'white', // تغيير الخلفية للأبيض
              height: '45px',
            },
    '& input': {
      textAlign: 'right',
    },
          }}
        />
      </Box>
    </Box>

    {/* تذكرني ونسيت كلمة السر */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
      <FormControlLabel
        control={<Checkbox size="small" sx={{ color: gray12 }} />}
        label={<Typography sx={{ fontSize: '12px', color: gray12 }}>تذكرني</Typography>}
      />
      <Link href="#"  sx={{ fontSize: '12px', color: gray12 }}>
        نسيت كلمة السر؟
      </Link>
    </Box>

    {/* الزر داخل البوكس المفرغ */}
    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: blue1,
          height: '45px',
          borderRadius: '12px',
          fontWeight: 600,
          color: white,
          fontSize: '16px',
          textTransform: 'none',
          '&:hover': { backgroundColor: blue1, opacity: 0.9 }
        }}
      >
        تسجيل دخول
      </Button>
    </Box>
  </Box>
</Box>
      </Card>
    </Container>
  );
}