import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
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

const MainPerformanceAnalysis = () => {
  const theme = useTheme();
  const MotionBox = motion(Box);

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
              delay: index * 0.18,
              duration: 0.8,
              type: "spring",
              stiffness: 180,
              damping: 12,
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
                  delay: index * 0.18 + 0.2,
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
                  delay={index * 0.18 + 0.4}
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