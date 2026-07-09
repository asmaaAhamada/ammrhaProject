import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTheme } from "@mui/material/styles";
import { yallow } from "../../../style/color-main/color";
import { motion } from "framer-motion"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchHonor } from "../../../backend/slice/honor/fetchAll";

// استيراد المكونات المنفصلة الجديدة
import HonorPlatform from "./HonorPlatform";
import HonorBoardTable from "./HonorBoardTable";
import { useNavigate } from "react-router-dom";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

export default function RankingSection() {
  const navigate = useNavigate();

const handleView = (volunteer) => {
   navigate(`/volunteers/${volunteer.id}`);
};
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchHonor);

  useEffect(() => {
    dispatch(fetchHonor());
  }, [dispatch]);

  // اللودر الكلي للصفحة
  if (isLoading && (!rawData || rawData.length === 0)) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "450px", width: "100%", position: "relative" }}>
        <MotionBox
          animate={{ scale: [0.8, 1.8, 2.2], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          sx={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", border: `2px solid ${yallow || '#FFCC00'}`, filter: "blur(4px)" }}
        />
        <MotionBox
          animate={{ 
            y: [0, -15, 0], scale: [1, 1.08, 1],
            filter: ["drop-shadow(0px 5px 15px rgba(255,204,0,0.4))", "drop-shadow(0px 15px 30px rgba(255,204,0,0.7))", "drop-shadow(0px 5px 15px rgba(255,204,0,0.4))"]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          sx={{ width: 90, height: 90, borderRadius: "50%", bgcolor: `${yallow || '#FFCC00'}15`, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${yallow || '#FFCC00'}`, mb: 4, zIndex: 2 }}
        >
          <EmojiEventsIcon sx={{ fontSize: 50, color: yallow || '#FFCC00' }} />
        </MotionBox>
        <MotionTypography animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} variant="h6" fontWeight={700} sx={{ color: theme.palette.text.textc || '#1E293B', textAlign: 'center', direction: 'rtl' }}>
          جاري تجهيز منصة التتويج...
        </MotionTypography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F1F5F9", 
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: { xs: 4, md: 6 }, 
        pb: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box 
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: 6 // مسافة عمودية ممتازة ومريحة تفصل المنصة عن الجدول بالأسفل
        }}
      >
        {/* 1. استدعاء منصة الكروت (تمرير الداتا كـ Props) */}
        <HonorPlatform rawData={rawData} />

        {/* 2. استدعاء جدول لوحة الشرف (تمرير الداتا والـ Loading كـ Props) */}
        <Box sx={{ width: "100%" }}>
          <HonorBoardTable 
            rawData={rawData} 
            isLoading={isLoading} 
            error={error} 
              onView={handleView}
          />
        </Box>
      </Box>
    </Box>
  );
}