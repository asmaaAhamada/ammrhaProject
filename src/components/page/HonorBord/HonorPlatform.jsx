import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTheme } from "@mui/material/styles";
import { yallow } from "../../../style/color-main/color";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

function RankCard({ item }) {
  const theme = useTheme();

  const getRankDetails = (label) => {
    switch (label) {
      case "1st": 
        return { color: "#FFCC00", text: "الأول", isWinner: true, delay: 0.3 };
      case "2nd": 
        return { color: "#B0BEC5", text: "الثاني", isWinner: false, delay: 0.15 };
      case "3rd": 
        return { color: "#D2691E", text: "الثالث", isWinner: false, delay: 0.45 };
      default: 
        return { color: "#EEF2FF", text: "-", isWinner: false, delay: 0 };
    }
  };

  const rankDetails = getRankDetails(item.label);
  const rankColor = rankDetails.color;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15, delay: rankDetails.delay }
    }
  };

  const winnerAnimation = rankDetails.isWinner ? {
    scale: [1, 1.02, 1],
    boxShadow: [
      "0px 10px 30px rgba(255, 204, 0, 0.15)",
      "0px 20px 40px rgba(255, 204, 0, 0.35)",
      "0px 10px 30px rgba(255, 204, 0, 0.15)"
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  } : {};

  return (
    <MotionCard
      variants={cardVariants}
      animate={rankDetails.isWinner ? winnerAnimation : ""}
      whileHover={{ 
        y: -12, 
        scale: 1.04,
        boxShadow: rankDetails.isWinner 
          ? "0px 25px 50px rgba(255, 204, 0, 0.45)" 
          : "0px 20px 45px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      }}
      sx={{
        width: '245px',
        minHeight: {
          xs: '320px',
          md: rankDetails.isWinner ? '380px' : '330px'
        },
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.05)",
        backgroundColor: theme.palette.primary.Appar2 || "#ffffff",
        border: rankDetails.isWinner ? `2px solid ${rankColor}` : "1px solid rgba(0,0,0,0.03)",
        cursor: "pointer",
        position: "relative",
        overflow: "visible"
      }}
    >
      <CardContent
        sx={{
          width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
          p: 3, flexGrow: 1, "&:last-child": { pb: 3 }
        }}
      >
        <MotionBox
          animate={rankDetails.isWinner ? { rotate: [-6, 6, -6], scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          sx={{
            width: rankDetails.isWinner ? 54 : 46, height: rankDetails.isWinner ? 54 : 46,
            borderRadius: "50%", bgcolor: `${rankColor}18`, display: "flex", alignItems: "center",
            justifyContent: "center", border: `2px solid ${rankColor}`, mb: 2, boxShadow: `0px 6px 16px ${rankColor}30`,
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: rankDetails.isWinner ? 30 : 24, color: rankColor }} />
        </MotionBox>

        <Avatar
          src={item.avatar || `https://i.pravatar.cc/150?img=${item.id || 1}`}
          sx={{
            width: rankDetails.isWinner ? 100 : 85, height: rankDetails.isWinner ? 100 : 85,
            border: `4px solid ${rankColor}`, boxShadow: `0px 8px 20px ${rankColor}20`, mb: 2
          }}
        />

        <Typography
          fontWeight={700} fontSize={18} textAlign="center"
          sx={{ color: theme.palette.text.textc || "#1E293B", maxWidth: "100%", mb: 0.5, whiteSpace: "normal", lineHeight: 1.3 }}
        >
          {item.name}
        </Typography>

        <Typography
          variant="body2" textAlign="center" mb={2}
          sx={{ color: theme.palette.text.textcard || "#64748B", fontWeight: 500 }}
        >
          {item.department}
        </Typography>

        <Typography
          variant="h4" fontWeight={900}
          sx={{ mb: 2, mt: 'auto', color: yallow || "#FFCC00" }}
        >
          {item.points}
        </Typography>

        <Box
          sx={{
            minWidth: 75, height: 30, borderRadius: "30px", bgcolor: `${rankColor}15`, 
            color: rankColor, border: `1px solid ${rankColor}35`, fontSize: 14, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", px: 2,
          }}
        >
          {rankDetails.text}
        </Box>
      </CardContent>
    </MotionCard>
  );
}

const HonorPlatform = ({ rawData }) => {
  const formattedData = [];
  if (rawData && Array.isArray(rawData)) {
    if (rawData[1]) formattedData.push({ ...rawData[1], label: "2nd" });
    if (rawData[0]) formattedData.push({ ...rawData[0], label: "1st" });
    if (rawData[2]) formattedData.push({ ...rawData[2], label: "3rd" });
  }

  if (formattedData.length === 0) return null;

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "24px", md: "24px" },
        justifyContent: "center",
        alignItems: { xs: "center", md: "flex-end" },
        width: "100%",
      }}
    >
      {formattedData.map((item) => (
        <RankCard key={item.id || item.label} item={item} />
      ))}
    </MotionBox>
  );
};

export default HonorPlatform;