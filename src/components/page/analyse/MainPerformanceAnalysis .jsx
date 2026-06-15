import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { babygreen, blue3, yallow } from "../../../style/color-main/color";

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../backend/slice/dashbord/fetchAll";

// 1. مكون العداد الذكي: يعيد تشغيل الحركة فور وصول القيمة الحقيقية من الـ API
function Counter({ value, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    // إعادة تعيين القيمة للبدء من الصفر عند تغير القيمة القادمة
    count.set(0); 

    const controls = animate(count, value, {
      duration: 1.5, // تقليل المدة قليلاً لتجربة مستخدم أسرع وأسلس
      delay,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, delay, count]); // مراقبة الـ value لإعادة الأنميشن فوراً

  return <motion.span>{rounded}</motion.span>;
}

const MainPerformanceAnalysis = () => {
  const theme = useTheme();
  const MotionBox = motion(Box);
  const dispatch = useDispatch();

  // جلب البيانات وحالة التحميل والخطأ من الـ Store
  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);

  // استدعاء البيانات عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 2. واجهة التحميل الفريندلي والكيوت 
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "250px",
          width: "100%",
          gap: 2,
        }}
      >
        <MotionBox
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "rgba(48, 154, 187, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: blue3,
          }}
        >
          <GroupsIcon sx={{ fontSize: 35 }} /> 
        </MotionBox>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: theme.palette.primary.text3,
              direction: "rtl",
              mb: 0.5
            }}
          >
            جاري تجهيز إحصائياتك الجميلة... 
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "text.secondary",
              direction: "rtl",
            }}
          >
            نجمع لك البيانات، لحظات صغيرة فقط!
          </Typography>
        </Box>
      </Box>
    );
  }

  // في حالة حدوث خطأ أثناء جلب البيانات
  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", my: 4, direction: "rtl" }}>
        عذراً، حدث خطأ أثناء تحميل البيانات الحقيقية.
      </Typography>
    );
  }

  // استخراج الـ summary بأمان مع قيم افتراضية منعاً لـ undefined
  const summary = data?.data?.summary || {
    pending_requests: 0,
    total_volunteers: 0,
    events_completed: 0,
    total_events: 0,
    acceptance_rate: 0,
    events_completion_rate: 0,
  };

  // 3. ربط مصفوفة الكروت بالبيانات الحقيقية القادمة من الـ API
  const cards = [
    {
      title: "الطلبات المعلقة",
      count: summary.pending_requests,
      percent: `${summary.acceptance_rate}%`,
      color: yallow,
      bg: "rgba(255, 152, 0, 0.10)",
      icon: <PendingActionsIcon sx={{ fontSize: 30 }} />,
    },
    {
      title: "إجمالي المتطوعين",
      count: summary.total_volunteers,
      percent: "100%",
      color: "#0740db",
      bg: "rgba(25, 118, 210, 0.10)",
      icon: <GroupsIcon sx={{ fontSize: 30 }} />,
    },
    {
      title: "الفعاليات المنجزة",
      count: summary.events_completed,
      percent: `${summary.events_completion_rate}%`,
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.10)",
      icon: <EventAvailableIcon sx={{ fontSize: 30 }} />,
    },
    {
      title: "إجمالي الفعاليات",
      count: summary.total_events,
      percent: "100%", 
      color: blue3,
      bg: "rgba(48, 154, 187, 0.1)",
      icon: <HowToRegIcon sx={{ fontSize: 30 }} />,
    },
  ];

  return (
    <Box sx={{ mb: 4, px: { xs: 1, sm: 0 }, mr: { md: 2 } }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          mb: 3,
          color: theme.palette.primary.text3,
          textAlign: "right",
        }}
      >
        الأداء الرئيسية
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          width: "100%",
        }}
      >
        {cards.map((card, index) => (
          <MotionBox
            key={card.title}
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.12, // تسريع تتابع الكروت قليلاً لشعور تفاعلي أفضل
              duration: 0.6,
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: {
                duration: 0.2,
              },
            }}
            sx={{
              height: "135px",
              width: "100%",
              backgroundColor: theme.palette.primary.Appar2,
              borderRadius: "14px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: `1px solid ${card.color}`,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                direction: "rtl",
              }}
            >
              <Typography
                sx={{
                  color: card.color,
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {card.percent}
              </Typography>

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: index * 0.12 + 0.15,
                  type: "spring",
                  stiffness: 250,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                  }}
                >
                  {card.icon}
                </Box>
              </motion.div>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: theme.palette.primary.text3,
                  fontWeight: 500,
                  mb: 0.5,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: theme.palette.primary.text3,
                  lineHeight: 1,
                }}
              >
                <Counter
                  value={card.count}
                  delay={index * 0.12 + 0.3}
                />
              </Typography>
            </Box>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default MainPerformanceAnalysis;