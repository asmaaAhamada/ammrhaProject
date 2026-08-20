// VolunteerDetailsPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Grid, Paper, Button, LinearProgress, Avatar, Stack ,Chip } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"; 
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"; 
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; 
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined"; // أيقونة إضافية للجنسية
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"; // أيقونة إضافية للرقم الوطني
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import { babygreen, white } from "../../../style/color-main/color";
import { fetchDetailsvolunteers, resetDetailsState } from "../../../backend/slice/volnteers/details";

const MotionBox = motion(Box);

const ShimmerEffect = () => (
  <MotionBox
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
    sx={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
    }}
  />
);

export default function VolunteerProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // تحديد وضع لوحة التحكم لمعالجة الألوان تلقائياً (Dark / Light)
  const isDarkMode = theme.palette.mode === "dark";

  // إعدادات الألوان لتكون متوافقة تماماً وتمنع البهتان أو الاختفاء
  const labelColor = isDarkMode ? "#A1A9C3" : "#5A6A85"; 
  const valueColor = isDarkMode ? "#FFFFFF" : "#13296A"; 
  const iconColor = "rgba(19, 41, 106, 1)"; // اللون الأزرق المطلوب لجميع الأيقونات

  const { data: response, isLoading, error } = useSelector((state) => state.fetchDetailsvolunteers);
console.log(response)
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsvolunteers(id));
    }
    return () => {
      dispatch(resetDetailsState());
    };
  }, [id, dispatch]);

  const volunteer = response?.data || {};
  const user = volunteer.user || {};
  const rank = volunteer.rank || {};
  const progress = volunteer.next_rank_progress || {};
  const activeDepartment = volunteer.departments?.[0]?.name || "-";

  // ================= 🌟 Skeleton Loader =================
  if (isLoading) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, direction: "rtl" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ width: "180px", height: "32px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "8px", position: "relative", overflow: "hidden" }}><ShimmerEffect /></Box>
          <Box sx={{ width: "90px", height: "40px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "12px", position: "relative", overflow: "hidden" }}><ShimmerEffect /></Box>
        </Box>
        {/* تفاصيل الهيكل الباقي للتحميل ... */}
      </Box>
    );
  }
const formatBirthDate = (date) => {
  if (!date) return "غير محدد";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "غير محدد";

  return parsedDate.toLocaleDateString("en-GB");
};
  if (error || !response?.success) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "60vh", direction: "rtl", gap: 2 }}>
        <Typography color="error" variant="h6" sx={{ fontWeight: 600 }}>
          عذراً، لم يتم العثور على بيانات المتطوع المطلوب أو انتهت الجلسة.
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ borderRadius: "8px" }}>العودة للجدول</Button>
      </Box>
    );
  }

  // بناء مصفوفة البيانات وتجهيز الأيقونات الموحدة باللون الأزرق المطلوب
  const detailItems = [
    { label: "البريد الإلكتروني", value: user.email || "غير محدد", icon: <EmailOutlinedIcon sx={{ color: iconColor, fontSize: 22 }} /> },
    { label: "رقم الهاتف", value: user.phone_number || "غير محدد", icon: <PhoneAndroidOutlinedIcon sx={{ color: iconColor, fontSize: 22 }} /> },
    { label: "مكان الإقامة", value: user.residence_place || "غير محدد", icon: <LocationOnOutlinedIcon sx={{ color: iconColor, fontSize: 22 }} /> },
    { label: "الجنسية", value: user.nationality || "غير محدد", icon: <PublicOutlinedIcon sx={{ color: iconColor, fontSize: 22 }} /> },
{
  label: "تاريخ الميلاد",
  value: formatBirthDate(user.birth_date),
  icon: <CakeOutlinedIcon sx={{ color: iconColor, fontSize: 22 }} />
},    { label: "الرقم الوطني", value: user.national_id || "غير محدد", icon: <BadgeOutlinedIcon sx={{ color: iconColor, fontSize: 22 }} /> },
    { label: "رقم الـ WhatsApp", value: user.whatsapp_number || "غير محدد", icon: <WhatsAppIcon sx={{ color: iconColor, fontSize: 22 }} /> },
  ];

  const getRankColor = (name) => {
    if (name === "برونزي") return "#CD7F32";
    if (name === "فضي") return "#8E9AA6";
    if (name === "ذهبي") return "#FF9800";
    if (name === "بلاتيني") return "#00BCD4";
    if (name === "ألماسي") return "#9C27B0";
    return babygreen;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, direction: "rtl" }}>
      
      {/* ================= HEADER SECTION ================= */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.button1 }}>
          تفاصيل متطوع
        </Typography>
        
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "#1B357A",
            color: white,
            borderRadius: "12px",
            px: 3,
            height: "40px",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#14285A", boxShadow: "none" }
          }}
        >
         
          رجوع
          <ArrowBackIosNewOutlinedIcon sx={{ mr: 2 }} />


        </Button>
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Grid container spacing={3}>
        
        {/* الكرت اليميني */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3, borderRadius: "16px", backgroundColor: theme.palette.primary.Appar2,
              border: `1px solid ${theme.palette.primary.moreborder}`, display: "flex",
              flexDirection: "column", alignItems: "center", textAlign: "center"
            }}
          >
            <Avatar src={user.image} sx={{ width: 110, height: 110, mb: 2, border: `3px solid ${theme.palette.primary.button1}`, fontSize: "2rem" }}>
              {user.full_name?.[0]}
            </Avatar>

            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.chip, mb: 0.5 }}>
              {user.full_name}
            </Typography>

            <Typography variant="body2" sx={{ color: labelColor, mb: 2 }}>
              القسم: {activeDepartment}
            </Typography>

            <Box sx={{ px: 2, py: 0.5, borderRadius: "12px", border: `1px solid ${getRankColor(rank.name)}`, color: getRankColor(rank.name), backgroundColor: "rgba(161, 169, 195, 0.05)", fontWeight: 600, fontSize: "13px", mb: 3 }}>
              رتبة {rank.name || "-"}
            </Box>

            {/* معالجة روابط السوشيال ميديا: تظهر بألوانها الحقيقية والزاهية فقط إذا كان الرابط متاحاً في الـ API لسهولة التجربة البصرية للوحة */}
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button 
                href={user.facebook_link || undefined} 
                target="_blank" 
                disabled={!user.facebook_link}
                sx={{ 
                  minWidth: "auto", 
                  p: 1,
                  color: user.facebook_link ? "#1877F2" : "rgba(161, 169, 195, 0.4)",
                  "&.Mui-disabled": { color: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }
                }}
              >
                <FacebookIcon fontSize="large" />
              </Button>
              <Button 
                href={user.linkedin_link || undefined} 
                target="_blank" 
                disabled={!user.linkedin_link}
                sx={{ 
                  minWidth: "auto", 
                  p: 1,
                  color: user.linkedin_link ? "#0077B5" : "rgba(161, 169, 195, 0.4)",
                  "&.Mui-disabled": { color: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }
                }}
              >
                <LinkedInIcon fontSize="large" />
              </Button>
            </Stack>
          </Paper>

          {/* كرت تتبع الرتبة التالية */}
          {progress && (
            <Paper elevation={0} sx={{ p: 3, mt: 3, borderRadius: "16px", backgroundColor: theme.palette.primary.Appar2, border: `1px solid ${theme.palette.primary.moreborder}` }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.chip, mb: 2 }}>
                التقدم نحو الرتبة التالية ({progress.next_rank_name || "غير محدد"})
              </Typography>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" sx={{ color: labelColor }}>النسبة الحالية</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: babygreen }}>
                  {progress.progress_percentage || 0}%
                </Typography>
              </Box>

              <LinearProgress variant="determinate" value={progress.progress_percentage || 0} sx={{ height: 8, borderRadius: 4, backgroundColor: "rgba(161, 169, 195, 0.12)", "& .MuiLinearProgress-bar": { backgroundColor: babygreen } }} />

              <Typography variant="caption" sx={{ color: labelColor, display: "block", mt: 1.5 }}>
                متبقي للمتطوع <strong>{progress.remaining_points || 0}</strong> نقطة للحصول على رتبة {progress.next_rank_name || "-"}.
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* الكرت الأيسر الرئيسي للبيانات */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", backgroundColor: theme.palette.primary.Appar2, border: `1px solid ${theme.palette.primary.moreborder}`, display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: "12px", backgroundColor: "rgba(5, 223, 114, 0.08)", display: "flex" }}>
                  <WorkspacePremiumOutlinedIcon sx={{ color: babygreen, fontSize: "26px" }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: labelColor }}>رصيد النقاط الحالية</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.chip }}>{volunteer.points || 0} نقطة</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", backgroundColor: theme.palette.primary.Appar2, border: `1px solid ${theme.palette.primary.moreborder}`, display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: "12px", backgroundColor: "rgba(5, 223, 114, 0.08)", display: "flex" }}>
                  <AccessTimeOutlinedIcon sx={{ color: babygreen, fontSize: "26px" }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: labelColor }}>إجمالي عدد الساعات</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.chip }}>{volunteer.hours || 0} ساعة</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", backgroundColor: theme.palette.primary.Appar2, border: `1px solid ${theme.palette.primary.moreborder}` }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.primary.chip, mb: 3, borderBottom: `1px solid ${theme.palette.primary.moreborder}`, pb: 1 }}>
              المعلومات الأساسية والشخصية
            </Typography>

            {/* عرض شبكة البيانات بالتنسيقات اللونية والتباين الجديد المانع للاختلاط البصري */}
            <Grid container spacing={2.5}>
              {detailItems.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box>
                    <Typography variant="caption" sx={{ color: labelColor, display: "block", mb: 0.5, fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      {item.icon}
                      <Typography variant="body2" sx={{ fontWeight: 700, color: valueColor }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}

              {/* حقل المهارات والخبرات المكتسبة السفلي */}
              <Grid item xs={12}>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ color: labelColor, display: "block", mb: 1, fontWeight: 600 }}>
                    المهارات والخبرات المكتسبة
                  </Typography>
                  <Box
  sx={{
    p: 2,
    borderRadius: "12px",
    backgroundColor: theme.palette.primary.logo,
    minHeight: "50px",
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    alignItems: "center",
  }}
>
  {Array.isArray(user.skills) && user.skills.length > 0 ? (
    user.skills.map((skill, index) => (
      <Chip
        key={`${skill}-${index}`}
        label={skill}
        sx={{
          fontWeight: 600,
          color: valueColor,
          backgroundColor: "rgba(19, 41, 106, 0.08)",
          borderRadius: "10px",
          direction: "rtl",
          "& .MuiChip-label": {
            px: 1.5,
          },
        }}
      />
    ))
  ) : (
    <Typography
      variant="body2"
      sx={{
        color: labelColor,
        fontWeight: 500,
      }}
    >
      لا توجد مهارات مضافة حالياً في سجل المتطوع الكلي.
    </Typography>
  )}
</Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

        </Grid>
      </Grid>
    </Box>
  );
}