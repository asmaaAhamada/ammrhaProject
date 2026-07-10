import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutSection() {
  return (
    <Box
      sx={{
        width: "167px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        border: "1.5px solid #ef4444",
        borderRadius: "16px",
        backgroundColor: "#d19595",
        color: "#dc2626",
        cursor: "pointer",
        transition: "all 0.25s ease",

      
      }}
    >
      <LogoutIcon sx={{ fontSize: 22 }} />

      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 700,
          color: "inherit",
        }}
      >
        تسجيل الخروج
      </Typography>
    </Box>
  );
}