import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// ضفنا VictoryGroup لتطبيق الأنميشن على العناصر سوا
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup } from "victory";
import { motion, useMotionValue, useTransform, animate as framerAnimate } from "framer-motion";

function Counter({ value, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = framerAnimate(count, value, {
      duration: 2,
      delay,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, delay]);

  return <motion.span>{rounded}</motion.span>;
}

const VolunteerGrowth = () => {
  const theme = useTheme();
  const MotionBox = motion(Box);

  const data = [
    { x: "Jan", y: 200 },
    { x: "Feb", y: 380 },
    { x: "Mar", y: 300 },
    { x: "Apr", y: 550 },
    { x: "May", y: 450 },
    { x: "Jun", y: 700 },
  ];

  return (
    <MotionBox
      initial={{
        opacity: 0,
        x: 40,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      whileHover={{
        y: -6,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
      }}
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
      {/* العنوان العلوي */}
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          textAlign: "right",
          color: theme.palette.primary.text3,
          mb: 1,
        }}
      >
        نمو المتطوعين
      </Typography>

      {/* منطقة المخطط البياني المستجيب */}
      <MotionBox
        initial={{
          opacity: 0,
          scaleY: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scaleY: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <MotionBox
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          sx={{
            width: "100%",
            height: "210px",
          }}
        >
          <VictoryChart
            responsive={true}
            padding={{ top: 10, bottom: 35, left: 45, right: 20 }}
            height={200}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284C7" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0284C7" stopOpacity={0.00} />
              </linearGradient>
            </defs>

            {/* المحور الأفقي X */}
            <VictoryAxis
              tickValues={data.map((d) => d.x)}
              style={{
                axis: { stroke: "#E2E8F0", strokeWidth: 1 },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "#64748B", fontSize: 10, fontFamily: "inherit", padding: 5 },
              }}
            />

            {/* المحور الرأسي Y */}
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "transparent" },
                grid: { stroke: "#F1F5F9", strokeDasharray: "4, 4" },
                tickLabels: { fill: "#94A3B8", fontSize: 10, fontFamily: "inherit", padding: 8 },
              }}
            />

            {/* 🛠️ هون السحر: جمعنا عناصر الرسم بـ VictoryGroup وعطيناها أنميشن رسم تدريجي سلس */}
            <VictoryGroup
              animate={{
                duration: 1500, // مدة الرسم ثانية ونصف
                onLoad: { duration: 1500 } // يبدأ الأنميشن فوراً عند تحميل الصفحة
              }}
            >
              <VictoryArea
                data={data}
                interpolation="natural"
                style={{ data: { fill: "url(#areaGradient)" } }}
              />

              <VictoryLine
                data={data}
                interpolation="natural"
                style={{ data: { stroke: "#0284C7", strokeWidth: 3 } }}
              />

              <VictoryScatter
                data={data}
                size={3.5}
                style={{ data: { fill: "#ffffff", stroke: "#0284C7", strokeWidth: 2 } }}
              />
            </VictoryGroup>
          </VictoryChart>
        </MotionBox>

        {/* التوضيح السفلي (Legend) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, justifyContent: "flex-start", px: 2 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "3px", backgroundColor: "#0284C7" }} />
          <Typography sx={{ fontSize: "13px", fontWeight: 500, color: theme.palette.primary.text3 }}>
            المتطوعين الجدد
          </Typography>
        </Box>
      </MotionBox>
    </MotionBox>
  );
};

export default VolunteerGrowth;