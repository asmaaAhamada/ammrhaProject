import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { babygreen, blue3, yallow } from "../../../style/color-main/color";

const MainPerformanceAnalysis = () => {
  const theme = useTheme();

  const cards = [
    {
      title: "الطلبات المعلقة",
      count: 18,
      percent: "12%",
      color: yallow,
      bg: "rgba(255, 152, 0, 0.10)",
      icon: <PendingActionsIcon sx={{ fontSize: 30 }} />,
    },
    {
      title: "إجمالي المتطوعين",
      count: 240,
      percent: "68%",
      color: "#0740db",
      bg: "rgba(25, 118, 210, 0.10)",
      icon: <GroupsIcon sx={{ fontSize: 30 }} />,
    },
    {
      title: "الفعاليات المنجزة",
      count: 54,
      percent: "45%",
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.10)",
      icon: <EventAvailableIcon sx={{ fontSize: 30 }} />,
    },
    {
      title: "الأعضاء النشطون",
      count: 120,
      percent: "80%",
      color: blue3,
      bg: "rgba(48, 154, 187, 0.1)",
      icon: <HowToRegIcon sx={{ fontSize: 30 }} />,
    },
  ];

  return (
    <Box sx={{ mb: 4, px: { xs: 1, sm: 0 }, mr: { md: 2 } }}>
      {/* Title */}
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          mb: 3,
          color: theme.palette.primary.text3,
          textAlign: "right", // محاذاة النص لليمين للثيم العربي
        }}
      >
        الأداء الرئيسية
      </Typography>

      {/* Grid Container المستجيب بشكل ذكي */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",          // سطر واحد لكل كارد على الموبايل
            sm: "repeat(2, 1fr)", // كاردين بجانب بعض في السطر على التابلت
            lg: "repeat(4, 1fr)", // 4 كاردات بجانب بعض على الشاشات الكبيرة
          },
          gap: 3, // مسافة أمان مريحة بين الكاردات من كل الأطراف
          width: "100%",
        }}
      >
        {cards.map((card) => (
          <Box
            key={card.title}
            sx={{
              height: "135px", // زيادة الطول قليلاً ليكون مريحاً للكتابة المزدوجة
              width: "100%",   // إزالة الـ 242px الثابتة ليتمدد مرناً مع الشاشة بالكامل
              backgroundColor: theme.palette.primary.Appar2,
              borderRadius: "14px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: `1px solid ${card.color}`,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)", // ظل ناعم جداً جمالي للواجهة
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.06)",
              },
            }}
          >
            {/* Top row: percent + icon */}
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
            </Box>

            {/* Bottom section: title + number */}
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontSize: "20px", // تصغير خط العنوان قليلاً ليتناسق ولا ينزل سطر جديد بشكل مشوه
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
                {card.count}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MainPerformanceAnalysis;