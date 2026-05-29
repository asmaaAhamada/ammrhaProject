import React, { lazy } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const ComplaintsTable = lazy(() => import("./ComplaintsTable"));
const ComplaintsStatsCards = lazy(() => import("./cardStatics"));


const ComplaintsPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: 4,
        }}
      >
        الشكاوي
      </Typography>

      <ComplaintsStatsCards />

      <ComplaintsTable />
    </Box>
  );
};

export default ComplaintsPage;