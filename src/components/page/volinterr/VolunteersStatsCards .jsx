import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";
import BlockIcon from "@mui/icons-material/Block";

import { babygreen, yallow } from "../../../style/color-main/color";

// استيراد الـ motion فقط من framer-motion
import { motion } from "framer-motion";

const VolunteersStatsCards = () => {
  const theme = useTheme();
  
  // تحويل الـ Box الخاص بـ MUI إلى مكون يدعم Framer Motion
  const MotionBox = motion(Box);

  const cards = [
    {
      title: "المتطوعون النشطون",
      count: 156,
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.08)",
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "المتطوعون المجمدون",
      count: 18,
      color: yallow,
      bg: "rgba(255, 152, 0, 0.08)",
      icon: <FrazenIcon width={40} height={40} />,
    },
    {
      title: "القائمة السوداء",
      count: 5,
      color: "#E53935",
      bg: "rgba(229, 57, 53, 0.08)",
      icon: <BlockIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        mb: 4,
      }}
    >
      {cards.map((card, index) => (
        <MotionBox
          key={card.title}
          // أنميشن ظهور الكارد بالكامل بالتتابع من الأسفل للأعلى
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
            delay: index * 0.18, // تتابع الظهور بناءً على ترتيب الكرت
            duration: 0.8,
            type: "spring",
            stiffness: 180,
            damping: 12,
          }}
          // أنميشن الـ Hover المرن عند تمرير الماوس فوق الكرت
          whileHover={{
            y: -6,
            scale: 1.02,
            transition: {
              duration: 0.2,
            },
          }}
          sx={{
            height: "86px",
            maxWidth: "386px",
            width: "100%",
            backgroundColor: theme.palette.primary.Appar2,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            border: `1px solid ${card.color}`,
            margin: {
              xs: "0 auto",
              md: 0,
            },
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* محتوى النصوص والارقام الثابتة */}
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                color: card.color,
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.chip,
                fontSize: "15px",
                mt: 0.5,
              }}
            >
              {/* الرقم هنا ثابت وبدون أنميشن تصاعدي */}
              {card.count} متطوع
            </Typography>
          </Box>

          {/* أنميشن دوران وتكبير الأيقونة عند ظهور الكارد */}
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
              delay: index * 0.18 + 0.2,
              type: "spring",
              stiffness: 250,
            }}
          >
            <Box
              sx={{
                width: 54,
                height: 54,
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
        </MotionBox>
      ))}
    </Box>
  );
};

export default VolunteersStatsCards;