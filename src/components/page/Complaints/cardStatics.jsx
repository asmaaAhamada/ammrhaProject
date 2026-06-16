import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

import { babygreen, yallow } from "../../../style/color-main/color";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../backend/slice/dashbord/fetchAll";

const ComplaintsStatsCards = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const MotionBox = motion(Box);

  // جلب البيانات وحالة التحميل والخطأ من الـ Store
  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 1. واجهة التحميل الفخمة الموحدة للكروت الإحصائية المتوازية (Premium Skeleton Shimmer) ✨
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 1.5, sm: 2, md: 3 },
          mb: 4,
          width: "100%",
          boxSizing: "border-box",
          direction: "rtl"
        }}
      >
        {[1, 2, 3].map((item) => (
          <Box
            key={item}
            sx={{
              minHeight: "86px",
              width: "100%",
              backgroundColor: theme.palette.primary.Appar2,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 2.5, md: 3 },
              py: 1.5,
              border: "1px solid rgba(161, 169, 195, 0.1)",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.02)",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* نصوص الهيكل التخيلية للشكاوى */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
              <Box sx={{ width: "80px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: 0.5 }} />
              <Box sx={{ width: "50px", height: "12px", bgcolor: "rgba(161, 169, 195, 0.1)", borderRadius: 0.5 }} />
            </Box>
            
            {/* الأيقونة التخيلية الدائرية متجاوبة الأحجام */}
            <Box 
              sx={{ 
                width: { xs: 44, sm: 48, md: 54 }, 
                height: { xs: 44, sm: 48, md: 54 }, 
                borderRadius: "50%", 
                bgcolor: "rgba(161, 169, 195, 0.08)" 
              }} 
            />

            {/* تأثير البريق والوميض الفخم المتحرك بشكل عرضي */}
            <MotionBox
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: item * 0.15 }}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  // واجهة عرض الخطأ بأمان لقسم الشكاوى
  if (error) {
    return (
      <Box sx={{ width: "100%", mb: 4, p: 2, display: "flex", justifyContent: "center", direction: "rtl" }}>
        <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
          تعذر مزامنة الكروت الإحصائية للشكاوى.
        </Typography>
      </Box>
    );
  }

  // استخراج بيانات الشكاوى بأمان من الـ API (تعديل المسميات حسب الـ Backend المعتمد لديك)
  const complaints = data?.data?.complaints || {
    resolved: data?.data?.summary?.resolved_complaints || 0,
    processing: data?.data?.summary?.processing_complaints || 0,
    open: data?.data?.summary?.open_complaints || 0,
  };

  const cards = [
    {
      title: "منتهية",
      count: complaints.resolved,
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.08)",
      icon: <TaskAltIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />,
    },
    {
      title: "قيد المعالجة",
      count: complaints.processing,
      color: yallow,
      bg: "rgba(255, 152, 0, 0.08)",
      icon: <PendingActionsIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />,
    },
    {
      title: "مفتوحة",
      count: complaints.open,
      color: theme.palette.primary.button1 || "#1976d2",
      bg: "rgba(25, 118, 210, 0.08)",
      icon: <MarkEmailUnreadIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",          
          sm: "repeat(2, 1fr)", 
          md: "repeat(3, 1fr)", 
        },
        gap: { xs: 1.5, sm: 2, md: 3 }, 
        mb: 4,
        width: "100%",
        maxWidth: "100%",       
        boxSizing: "border-box",
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
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.15, 
            duration: 0.6,
            type: "spring",
            stiffness: 180,
            damping: 14,
          }}
          whileHover={{
            y: -6,
            scale: 1.02,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.06)",
            transition: {
              duration: 0.2,
            },
          }}
          sx={{
            minHeight: "86px", 
            width: "100%",      
            backgroundColor: theme.palette.primary.Appar2,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 2.5, md: 3 }, 
            py: 1.5,
            border: `1px solid ${card.color}`,
            boxSizing: "border-box",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
            cursor: "pointer",
          }}
        >
          {/* حاوية النصوص المتجاوبة والأرقام الحقيقية */}
          <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, textAlign: "right" }}>
            <Typography
              sx={{
                color: card.color,
                fontWeight: 700,
                fontSize: { xs: "14px", sm: "15px", md: "16px" }, 
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.text3 || "text.primary",
                fontSize: { xs: "16px", sm: "17px", md: "18px" },
                fontWeight: 800,
                mt: 0.3,
                whiteSpace: "nowrap",
              }}
            >
              {card.count} <span style={{ fontSize: "12px", fontWeight: 500, opacity: 0.7 }}>شكوى</span>
            </Typography>
          </Box>

          {/* حركة الأيقونة المنفصلة بشكل متناسق */}
          <motion.div
            initial={{
              scale: 0,
              rotate: -180,
            }}
            whileInView={{
              scale: 1,
              rotate: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15 + 0.15, 
              type: "spring",
              stiffness: 250,
            }}
          >
            <Box
              sx={{
                width: { xs: 44, sm: 48, md: 54 },  
                height: { xs: 44, sm: 48, md: 54 },
                borderRadius: "50%",
                backgroundColor: card.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.color,
                flexShrink: 0, 
                ml: 1,         
              }}
            >
              {card.icon}
            </Box>
          </motion.div>
        </MotionBox>
      ))}
    </Box>
  );
};

export default ComplaintsStatsCards;