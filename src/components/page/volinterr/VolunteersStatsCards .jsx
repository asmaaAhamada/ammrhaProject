import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";
import BlockIcon from "@mui/icons-material/Block";

import { babygreen, yallow } from "../../../style/color-main/color";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../backend/slice/dashbord/fetchAll";

const VolunteersStatsCards = () => {
  const theme = useTheme();
  const MotionBox = motion(Box);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 1. واجهة التحميل الفخمة والمخصصة للبطاقات الإحصائية المتوازية (Premium Skeleton Shimmer) ✨
  if (isLoading) {
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
          direction: "rtl"
        }}
      >
        {[1, 2, 3].map((item) => (
          <Box
            key={item}
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
              border: "1px solid rgba(161, 169, 195, 0.1)",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.02)",
              position: "relative",
              overflow: "hidden",
              margin: { xs: "0 auto", md: 0 }
            }}
          >
            {/* نصوص الهيكل التخيلية */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
              <Box sx={{ width: "100px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: 0.5 }} />
              <Box sx={{ width: "60px", height: "12px", bgcolor: "rgba(161, 169, 195, 0.1)", borderRadius: 0.5 }} />
            </Box>
            
            {/* الأيقونة التخيلية */}
            <Box sx={{ width: 54, height: 54, borderRadius: "50%", bgcolor: "rgba(161, 169, 195, 0.08)" }} />

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

  if (error) {
    return (
      <Box sx={{ width: "100%", mb: 4, p: 2, display: "flex", justifyContent: "center", direction: "rtl" }}>
        <Typography color="error" variant="body2">تعذر مزامنة الكروت الإحصائية للمتطوعين.</Typography>
      </Box>
    );
  }

  // استخراج الداتا الحقيقية وتوزيعها بأمان
  const summary = data?.data?.summary || {
    active_members: 0,
    frozen_count: 0,
    blacklisted_count: 0,
  };

  // 2. ربط المصفوفة بالبيانات المستخرجة من الـ API بشكل ديناميكي كامل
  const cards = [
    {
      title: "المتطوعون النشطون",
      count: summary.active_members,
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.08)",
      icon: <VolunteerActivismIcon sx={{ fontSize: 32 }} />,
    },
    {
      title: "المتطوعون المجمدون",
      count: summary.frozen_count,
      color: yallow,
      bg: "rgba(255, 152, 0, 0.08)",
      icon: <FrazenIcon width={32} height={32} />,
    },
    {
      title: "القائمة السوداء",
      count: summary.blacklisted_count,
      color: "#E53935",
      bg: "rgba(229, 57, 53, 0.08)",
      icon: <BlockIcon sx={{ fontSize: 32 }} />,
    },
  ];

  return (
    <Box
      dir="rtl"
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
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 30,
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
            stiffness: 140,
            damping: 14,
          }}
          whileHover={{
            y: -5,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.06)",
            borderColor: card.color,
            transition: { duration: 0.2 },
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
            border: "1px solid rgba(161, 169, 195, 0.12)", // جعل البوردر خفيف واحترافي ويبرز بقوة عند الـ Hover
            margin: {
              xs: "0 auto",
              md: 0,
            },
            boxShadow: "0px 4px 12px rgba(0,0,0,0.02)",
            cursor: "pointer",
          }}
        >
          {/* نصوص الداتا المستلمة */}
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                color: theme.palette.primary.text3, // دعم متناسق مع الداينمك ثيم
                fontWeight: 700,
                fontSize: "14px", // قياس مريح وأنيق متناسب مع الارتفاع 86px
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                color: card.color, // تلوين الرقم بلون مؤشر الحالة لسهولة القراءة السريعة
                fontSize: "18px",
                fontWeight: 800,
                mt: 0.3,
              }}
            >
              {card.count} <span style={{ fontSize: "12px", fontWeight: 500, opacity: 0.8 }}>متطوع</span>
            </Typography>
          </Box>

          {/* محاذاة وحركة الأيقونة */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
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