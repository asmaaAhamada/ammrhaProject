import { Box, Grid, Card, Typography, IconButton } from "@mui/material";
import FrazingIcon from "../../../assets/icons/UserGear.svg?react";
import {
  babyblue,
  babyPink,
  babyyallow,
  blue3,
  Pink,
  yallow,
} from "../../../style/color-main/color";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { useTheme } from "@mui/material/styles";

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { fetchDashboard } from "../../../backend/slice/dashbord/fetchAll";
import { useDispatch, useSelector } from "react-redux";

// 🌟 الحل هنا: تحويل الـ Box التابع لـ MUI إلى مكون متحرك ليعمل الـ Shimmer بدون أخطاء
const MotionBox = motion(Box);

function Counter({ value, delay = 0 }) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, delay, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Cards() {
  const MotionCard = motion(Card);
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات وحالة التحميل والخطأ من الـ Store
  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);
console.log(data)
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // واجهة التحميل الفخمة الموحدة للكروت الإحصائية المتوازية (Premium Skeleton Shimmer) ✨
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)", // تم التعديل إلى 4 ليناسب كروتك الأربعة المتجاورة
          },
          gap: { xs: 1.5, sm: 2, md: 3 },
          mb: 4,
          width: "100%",
          boxSizing: "border-box",
          direction: "rtl"
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Box
            key={item}
            sx={{
              minHeight: "137px", // متناسق تماماً مع طول الكرت الأصلي لديكِ
              width: "100%",
              backgroundColor: theme.palette.primary.Appar2,
              borderRadius: "12px",
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
            {/* نصوص الهيكل التخيلية */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
              <Box sx={{ width: "100px", height: "16px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: 0.5 }} />
              <Box sx={{ width: "60px", height: "30px", bgcolor: "rgba(161, 169, 195, 0.1)", borderRadius: 0.5 }} />
            </Box>
            
            {/* الأيقونة التخيلية الدائرية */}
            <Box 
              sx={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "14px", 
                bgcolor: "rgba(161, 169, 195, 0.08)" 
              }} 
            />

            {/* تأثير البريق والوميض الفخم المتحرك */}
            <MotionBox
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: item * 0.15 }}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  // ربط الداتا الحقيقية من السيرفر، مع فحص الحقول المفتاحية من الـ API وتأمينها بقيم صفرية عند غيابها
 const items = [
  {
    icon: <PeopleOutlinedIcon />,
    title: "إجمالي المتطوعين",
    subtitle: data?.data?.summary?.total_volunteers || 0,
  },
  {
    icon: <EventBusyOutlinedIcon />,
    title: "القائمة السوداء",
    subtitle: data?.data?.summary?.blacklisted_count || 0,
  },
  {
    icon: <QueryBuilderOutlinedIcon />,
    title: "الطلبات المعلقة",
    subtitle: data?.data?.summary?.pending_requests || 0,
  },
  {
    icon: <FrazingIcon />,
    title: "المجمدين",
    subtitle: data?.data?.summary?.frozen_count || 0,
  },
];

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {items.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MotionCard
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              sx={{
                backgroundColor: theme.palette.primary.Appar2,
                width: "275px",
                height: "137px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                px: 2,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    fontSize: "16px",
                    color: theme.palette.primary.text3,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: theme.palette.primary.text4,
                  }}
                >
                  <Counter
                    value={item.subtitle}
                    delay={index * 0.2 + 0.4}
                  />
                </Typography>
              </Box>

              <IconButton
                sx={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: item.bg,
                  borderRadius: "14px",
                  color: item.iconColor,
                  "&:hover": {
                    backgroundColor: item.bg,
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}