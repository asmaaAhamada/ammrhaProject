import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";
import BlockIcon from "@mui/icons-material/Block";

import { babygreen, yallow } from "../../../style/color-main/color";

const VolunteersStatsCards = () => {
  const theme = useTheme();

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
              {card.count} متطوع
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

export default VolunteersStatsCards;