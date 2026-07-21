import { Box, Container, Card, TextField, Typography, Button, IconButton, InputAdornment, Checkbox, FormControlLabel, Link, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ImageCard from './image'; 
import Hello from "./hello";
import { blue1, gray12, gray13, lighttext, white } from "../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline'; 
import { Log_in, setformInfo, clearError } from "../../backend/slice/auth/log_in_Slice";

export default function LoginPage() {
  const { userInfo } = useSelector((state) => state.user);

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const { password, login_credential } = useSelector((state) => state.Log_in.formInfo);
  const { isLoading, error } = useSelector((state) => state.Log_in);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // تنظيف الأخطاء القديمة عند فتح الصفحة لأول مرة
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // التحقق من تعبئة الحقول لتفعيل أو تعطيل الزر
  const isButtonDisabled = !login_credential?.trim() || !password?.trim();

  async function HandleLogin(e) {
    e.preventDefault();
    if (isButtonDisabled || isLoading) return;

    const resultAction = await dispatch(Log_in());
      
    if (Log_in.fulfilled.match(resultAction)) {

const role = resultAction.payload?.role;

if (role === "hr_general" || role === "admin" || role === "hr_department") {
 navigate("/home"); }

     
    } else {
      console.log("خطأ التسجيل من الباكيند:", resultAction.payload);
    }
  }

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
        p: { xs: 2, md: 0 } 
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
        {/* القسم الأيمن (الصورة) */}
        <Box sx={{ 
          flex: 1, 
          order: { xs: 1, md: 2 }, 
          height: {  md: '100%' } ,
          display: { xs: 'none', md: 'block' },
        }}>
          <ImageCard />
        </Box>

        {/* القسم الأيسر (الفورم) */}
        <Box
          component="form"
          onSubmit={HandleLogin}
          sx={{
            flex: 1,
            order: { xs: 2, md: 1 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            p: { xs: 1, md: 3 },
            pb: 5, 
          }}
        >
          {/* نصوص الترحيب */}
          <Hello />

          {/* البوكس المفرغ */}
          <Box
            sx={{
              width: { xs: '90%', md: '409px' },
              height: '340px', // زيادة الارتفاع قليلاً لاستيعاب نصوص الخطأ بدون تخريب التصميم
              border: `1px solid ${lighttext}`,
              borderRadius: '16px',
              p: 3,
              mt: -3, 
              display: 'flex',
              background: gray13,
              flexDirection: 'column',
              boxSizing: 'border-box', 
            }}
          >
            {/* الحقول */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              
              {/* حقل الإيميل */}
              <Box>
                <Typography sx={{ mb: 0.5, fontSize: '14px', textAlign: 'right', color: blue1, fontWeight: 600 }}>
                  الايميل
                </Typography>
                <TextField
                  value={login_credential}
                  onChange={(e) => dispatch(setformInfo({ login_credential: e.target.value }))}
                  fullWidth
                  placeholder="اكتب ايميلك"
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off" 
                  // فحص إذا كان هناك خطأ خاص بالإيميل قادم من السيرفر
                  error={Boolean(error?.login_credential || error?.email)}
                  helperText={error?.login_credential || error?.email}
                  FormHelperTextProps={{
                    sx: { textAlign: 'right', color: 'error.main', mx: 0, mt: 0.5 }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MailOutlineIcon sx={{ color: blue1 }} />
                      </InputAdornment>
                    ),
                    sx: {
                      direction: 'rtl',
                    },
                    inputProps: {
                      style: { 
                        textAlign: 'right', 
                        color: blue1, 
                        fontWeight: '500'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'white', 
                      height: '45px',
                    },
                  }}
                />
              </Box>

              {/* حقل كلمة السر */}
              <Box>
                <Typography sx={{ mb: 0.5, fontSize: '14px', textAlign: 'right', color: blue1, fontWeight: 600 }}>
                  كلمة السر
                </Typography>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => dispatch(setformInfo({ password: e.target.value }))}
                  placeholder="ادخل كلمة السر"
                  autoComplete="new-password" 
                  // فحص إذا كان هناك خطأ خاص بكلمة السر قادم من السيرفر
                  error={Boolean(error?.password)}
                  helperText={error?.password}
                  FormHelperTextProps={{
                    sx: { textAlign: 'right', color: 'error.main', mx: 0, mt: 0.5 }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <Visibility sx={{ color: blue1 }} /> : <VisibilityOff sx={{ color: blue1 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      direction: 'rtl',
                    },
                    inputProps: {
                      style: { 
                        textAlign: 'right', 
                        color: blue1, 
                        fontWeight: '500'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'white', 
                      height: '45px',
                    },
                  }}
                />
              </Box>
            </Box>

            {/* عرض الخطأ العام إن وجد ولم يكن مخصصاً للحقول */}
            {error && typeof error === 'string' && (
              <Typography sx={{ color: 'error.main', fontSize: '12px', textAlign: 'center', mt: 1 }}>
                {error}
              </Typography>
            )}

            {/* تذكرني ونسيت كلمة السر */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <FormControlLabel
                control={<Checkbox size="small" sx={{ color: gray12 }} />}
                label={<Typography sx={{ fontSize: '12px', color: gray12 }}>تذكرني</Typography>}
              />
              <Link href="#" sx={{ fontSize: '12px', color: gray12 }}>
                نسيت كلمة السر؟
              </Link>
            </Box>

            {/* منطقة الزر واللودر اللطيف */}
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '45px' }}>
              {isLoading ? (
                // يظهر اللودر الدائري اللطيف بنفس لون زر تسجيل الدخول عند الإرسال ويختفي الزر
                <CircularProgress size={35} sx={{ color: blue1 }} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isButtonDisabled} // يتعطل تلقائياً إذا كانت الحقول فارغة
                  sx={{
                    backgroundColor: blue1,
                    height: '45px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    color: white,
                    fontSize: '16px',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: blue1, opacity: 0.9 },
                    '&:disabled': { backgroundColor: '#cccccc', color: '#666666' } // مظهر الزر وهو معطل
                  }}
                >
                  تسجيل دخول
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}