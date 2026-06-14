import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

import { babygreen, yallow } from "../../../style/color-main/color";

// 1. استيراد الـ motion من مكتبة framer-motion
import { motion } from "framer-motion";

const ComplaintsStatsCards = () => {
  const theme = useTheme();

  // 2. تحويل الـ Box الخاص بـ MUI إلى مكون يدعم Framer Motion لحركة الكرت بالكامل
  const MotionBox = motion(Box);

  const cards = [
    {
      title: "منتهية",
      count: 24,
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.08)",
      icon: <TaskAltIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />,
    },
    {
      title: "قيد المعالجة",
      count: 12,
      color: yallow,
      bg: "rgba(255, 152, 0, 0.08)",
      icon: <PendingActionsIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />,
    },
    {
      title: "مفتوحة",
      count: 7,
      color: theme.palette.primary.button1,
      bg: "rgba(25, 118, 210, 0.08)",
      icon: <MarkEmailUnreadIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",            // كرت واحد عمودي في الموبايل
          sm: "repeat(2, 1fr)", // كرتين بجانب بعض في التابلت الصغير لمنع الضغط والقطش
          md: "repeat(3, 1fr)", // 3 كروت بجانب بعضها فوراً ابتداءً من الشاشات المتوسطة والكبيرة
        },
        gap: { xs: 1.5, sm: 2, md: 3 }, 
        mb: 4,
        width: "100%",
        maxWidth: "100%",       // حماية إضافية تمنع الكروت من التمدد خارج الشاشة
        boxSizing: "border-box",
      }}
    >
      {cards.map((card, index) => (
        <MotionBox
          key={card.title}
          // تأثير حركة الدخول المتتابعة من الأسفل مع تكبير مرن (نفس كود المتطوعين تماماً)
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
            delay: index * 0.18, // تتابع مريح بين الكروت الثلاثة
            duration: 0.8,
            type: "spring",
            stiffness: 180,
            damping: 12,
          }}
          // تأثير الـ Hover النطاط للأعلى عند مرور الماوس
          whileHover={{
            y: -6,
            scale: 1.02,
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
            px: { xs: 2, sm: 2.5, md: 3 }, // بادينغ متجاوب يحمي النصوص من القطش الجانبي
            py: 1.5,
            border: `1px solid ${card.color}`,
            boxSizing: "border-box",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* حاوية النصوص */}
          <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, textAlign: "right" }}>
            <Typography
              sx={{
                color: card.color,
                fontWeight: 700,
                fontSize: { xs: "15px", sm: "16px", md: "18px" }, 
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.chip,
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                mt: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              {card.count} شكوى
            </Typography>
          </Box>

          {/* حركة دوران وتكبير الأيقونة الدائرية بشكل منفصل عند الدخول */}
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
              delay: index * 0.18 + 0.2, // تظهر مباشرة بعد ظهور الكرت الخاص بها
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
                flexShrink: 0, // يمنع تشوه الدائرة أفقياً عند تصغير المتصفح
                ml: 1,         // مسافة أمان لجهة اليسار تفصل الدائرة عن النص لأن نظام الموقع RTL
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