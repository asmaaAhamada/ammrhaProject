import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

import { babygreen, yallow } from "../../../style/color-main/color";

const ComplaintsStatsCards = () => {
  const theme = useTheme();

  const cards = [
    {
      title: "منتهية",
      count: 24,
      color: babygreen,
      bg: "rgba(5, 223, 114, 0.08)",
      icon: <TaskAltIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "قيد المعالجة",
      count: 12,
      color: yallow,
      bg: "rgba(255, 152, 0, 0.08)",
      icon: <PendingActionsIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "مفتوحة",
      count: 7,
      color: theme.palette.primary.button1,
      bg: "rgba(25, 118, 210, 0.08)",
      icon: <MarkEmailUnreadIcon sx={{ fontSize: 40 }} />,
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
      {cards.map((card) => (
        <Box
          key={card.title}
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
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}
        >
          <Box>
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
              {card.count} شكوى
            </Typography>
          </Box>

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
        </Box>
      ))}
    </Box>
  );
};

export default ComplaintsStatsCards;