import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { VictoryPie } from "victory";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../backend/slice/dashbord/fetchAll";

function Counter({ value, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    count.set(0);
    const controls = animate(count, value, {
      duration: 1.5,
      delay,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, delay, count]);

  return <motion.span>{rounded}</motion.span>;
}

const VolunteerDistributionCard = () => {
  const theme = useTheme();
  const MotionBox = motion(Box);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 1. واجهة التحميل الفخمة والاحترافية (Premium Glassmorphism & Double Ring Loader) ✨
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "347px",
          backgroundColor: theme.palette.primary?.Appar2 || "#ffffff",
          borderRadius: "14px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* حاوية اللودر الفخم */}
        <Box
          sx={{
            position: "relative",
            width: 120,
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* الحلقة الخارجية الكبرى - تدور باتجاه عقارب الساعة بتدرج ناعم */}
          <MotionBox
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            sx={{
              position: "absolute",
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTop: `3px solid #4CAF50`, // الأخضر (مفعلين)
              borderRight: `3px solid #FFC107`, // الأصفر (مجمدين)
              filter: "drop-shadow(0px 0px 4px rgba(76, 175, 80, 0.3))",
            }}
          />

          {/* الحلقة الداخلية الوسطى - تدور عكس اتجاه عقارب الساعة لإعطاء بعد بصري عميق */}
          <MotionBox
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            sx={{
              position: "absolute",
              width: 76,
              height: 76,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderBottom: `2px solid #F44336`, // الأحمر (قائمة سوداء)
              borderLeft: `2px solid #4CAF50`,
              opacity: 0.8,
            }}
          />

          {/* النواة المركزية - تتوهج وتنبض بهدوء وفخامة */}
          <MotionBox
            animate={{
              scale: [0.92, 1.05, 0.92],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              position: "absolute",
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)",
              backdropFilter: "blur(4px)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ fontSize: "16px", filter: "grayscale(20%)" }}>📊</Box>
          </MotionBox>
        </Box>

        {/* النصوص التوضيحية الأنيقة */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.3px",
              color: theme.palette.primary.text3,
              mb: 0.5,
              direction: "rtl",
            }}
          >
            جاري تحليل وتوزيع البيانات...
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "text.secondary",
              opacity: 0.75,
              direction: "rtl",
            }}
          >
            لحظات ونستعرض المخطط البياني
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", height: "347px", display: "flex", justifyContent: "center", alignItems: "center", direction: "rtl" }}>
        <Typography color="error">تعذر تحميل بيانات المخطط التوضيحي.</Typography>
      </Box>
    );
  }

  const summary = data?.data?.summary || {
    active_members: 0,
    frozen_count: 0,
    blacklisted_count: 0,
    total_volunteers: 0,
  };

  const totalVolunteers = summary.total_volunteers;

  const chartData = [
    { x: "مفعلين", y: summary.active_members },
    { x: "مجمدين", y: summary.frozen_count },
    { x: "قائمة سوداء", y: summary.blacklisted_count },
  ];

  const colors = ["#4CAF50", "#FFC107", "#F44336"]; 

  return (
    <MotionBox
      initial={{ opacity: 0, x: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      sx={{
        width: "100%",
        height: "347px",
        backgroundColor: theme.palette.primary?.Appar2 || "#ffffff",
        borderRadius: "14px",
        padding: "24px", 
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: 2,
          textAlign: "right",
          direction: "rtl"
        }}
      >
        توزيع المتطوعين
      </Typography>

      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ position: "absolute", textAlign: "center", zIndex: 1 }}>
          <Typography sx={{ fontSize: "12px", color: theme.palette.primary.text3, fontWeight: 500 }}>
            الإجمالي
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: theme.palette.primary.text3,
            }}
          >
            <Counter value={totalVolunteers} delay={0.4} />
          </Typography>
        </Box>

        <MotionBox
          initial={{ rotate: -170, opacity: 0, scale: 0.9 }}
          whileInView={{ rotate: 7, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          sx={{ width: "160px", height: "160px" }}
        >          
          <VictoryPie
            data={chartData}
            padAngle={totalVolunteers > 0 ? 2 : 0}
            innerRadius={55}
            radius={75}      
            colorScale={colors}
            labels={() => null} 
            padding={0}        
            width={160}
            height={160}
            style={{
              data: {
                stroke: "#fff",
                strokeWidth: 2,
              },
            }}
          />
        </MotionBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mt: 3,
          borderTop: "1px solid rgba(240, 240, 240, 0.4)", 
          pt: 2,
          direction: "rtl"
        }}
      >
        {chartData.map((item, index) => (
          <motion.div
            key={item.x}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.15 }}
          >          
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "3px", backgroundColor: colors[index] }} />
              <Typography sx={{ fontSize: "12px", fontWeight: 600, color: theme.palette.primary.text3 }}>
                {item.x}: <span style={{ color: colors[index] }}>{item.y}</span>
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </MotionBox>
  );
};

export default VolunteerDistributionCard;