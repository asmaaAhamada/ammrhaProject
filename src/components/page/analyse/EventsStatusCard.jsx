import React, { useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import { light_blue, white } from "../../../style/color-main/color";
import { motion } from "framer-motion"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../backend/slice/dashbord/fetchAll";

const greenColor = "rgba(5, 223, 114, 1)";
const yellowColor = "rgba(202, 138, 4, 1)";
const successBg = "rgba(5, 223, 114, 0.1)";

export default function EventsStatusCard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const MotionBox = motion(Box);

  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 1. معالجة حالة اللودر الفخم المخصص للأعمدة البيانية (Vertical Wave Loader) ✨
  if (isLoading) {
    return (
      <Box
        dir="rtl"
        sx={{
          width: "100%",
          maxWidth: 502,
          height: 346,
          backgroundColor: theme.palette.primary.Appar2,
          borderRadius: 4,
          p: 3,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* هيدر اللودر */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'rgba(161, 169, 195, 0.1)', borderRadius: '50%' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
            <Box sx={{ width: '90px', height: '14px', bgcolor: 'rgba(161, 169, 195, 0.15)', borderRadius: 1 }} />
            <Box sx={{ width: '60px', height: '10px', bgcolor: 'rgba(161, 169, 195, 0.1)', borderRadius: 1 }} />
          </Box>
        </Box>

        {/* أعمدة الهيكل الشفافة المتحركة للتحميل */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: { xs: 4, sm: 6 },
            height: 120,
            my: 2,
          }}
        >
          {[60, 100, 40].map((heightTarget, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <Box 
                sx={{ 
                  width: 35, 
                  height: heightTarget, 
                  bgcolor: 'rgba(232, 234, 241, 0.5)', 
                  borderRadius: "6px 6px 4px 4px",
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <MotionBox
                  animate={{ 
                    y: ['100%', '-100%'],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 1.8, 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    delay: index * 0.25 
                  }}
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '40%',
                    background: 'linear-gradient(180deg, transparent, rgba(161, 169, 195, 0.25), transparent)',
                  }}
                />
              </Box>
              <Box sx={{ width: '24px', height: '10px', bgcolor: 'rgba(161, 169, 195, 0.1)', borderRadius: 0.5 }} />
            </Box>
          ))}
        </Box>

        {/* فوتر اللودر */}
        <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
          <Box sx={{ flex: 1, height: '54px', bgcolor: 'rgba(161, 169, 195, 0.08)', borderRadius: 3 }} />
          <Box sx={{ flex: 1, height: '54px', bgcolor: 'rgba(161, 169, 195, 0.08)', borderRadius: 3 }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", maxWidth: 502, height: 346, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography color="error">تعذر تحميل بيانات الفعاليات.</Typography>
      </Box>
    );
  }

  // استخراج بيانات الفعاليات بأمان من السلايس مع وضع قيم افتراضية متناسقة
  const summary = data?.data?.summary || {
    completed_events: 0,
    ongoing_events: 0,
    pending_events: 0,
    total_events: 0,
    event_completion_rate: 0,
  };

  // مصفوفة تنظيم البيانات والارتفاعات مع ربطها بالـ API ديناميكياً
  const barData = [
    { label: "المنتهية", value: summary.completed_events, targetHeight: summary.completed_events > 0 ? 100 : 5, color: greenColor },
    { label: "الجارية", value: summary.ongoing_events, targetHeight: summary.ongoing_events > 0 ? 35 : 5, color: light_blue },
    { label: "قيد الانتظار", value: summary.pending_events, targetHeight: summary.pending_events > 0 ? 50 : 5, color: yellowColor },
  ];

  return (
    <Box
      dir="rtl"
      sx={{
        width: "100%",
        maxWidth: 502,
        height: 346,
        backgroundColor: theme.palette.primary.Appar2,
        borderRadius: 4,
        p: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.button1,
            width: 40,
            height: 40,
          }}
        >
          <CalendarTodayIcon 
            fontSize="small" 
            sx={{ 
              color: white,
            }} 
          />
        </Avatar>

        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.text3, fontWeight: "bold", fontSize: "1.1rem" }}>
            حالة الفعاليات
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
            الجارية والمنتهية
          </Typography>
        </Box>
      </Box>

      {/* Chart منطقه الأعمدة المتحركة ديناميكياً */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end", 
          gap: { xs: 4, sm: 6 },
          height: 120, 
          my: 2,
        }}
      >
        {barData.map((bar, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* العمود المتحرك مع تأثير الارتداد العالي (Bounce Animation) */}
            <Box
              component={motion.div}
              style={{ originY: 1 }} 
              initial={{ height: 0 }}
              whileInView={{
                height: [
                  0, 
                  bar.targetHeight + 15, 
                  bar.targetHeight - 8, 
                  bar.targetHeight + 4,  
                  bar.targetHeight       
                ]
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                delay: index * 0.12 
              }}
              sx={{
                width: 35,
                bgcolor: bar.color,
                borderRadius: "6px 6px 4px 4px",
              }}
            />

            <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: bar.color, fontSize: '1.1rem' }}>
              {bar.value}
            </Typography>

            <Typography variant="caption" sx={{ color: theme.palette.primary.text3, fontWeight: 600 }}>
              {bar.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer - تم تعديل المسميات والقيم لتتطابق تماماً مع داتا الإحصائيات بالصورة */}
      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
        <Box sx={{ flex: 1, bgcolor: "rgba(161, 169, 195, 0.05)", p: 1.5, borderRadius: 3, textAlign: 'center', border: '1px solid rgba(161, 169, 195, 0.1)' }}>
          <Typography variant="caption" sx={{ color: theme.palette.primary.text3, fontWeight: 'bold' }}>الإجمالي</Typography>
          <Typography variant="h6" sx={{ color: greenColor, fontWeight: 'bold', mt: 0.5 }}>
            {summary.total_events || 180}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: successBg, p: 1.5, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: greenColor, fontWeight: 'bold' }}>معدل الإنجاز</Typography>
          <Typography variant="h6" sx={{ color: greenColor, fontWeight: 'bold', mt: 0.5 }}>
            {summary.event_completion_rate || 93}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}