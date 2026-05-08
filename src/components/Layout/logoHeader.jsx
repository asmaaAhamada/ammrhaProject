import { Box, Typography } from "@mui/material";
import logo from "../../assets/image/logo/Logo Container.svg";
import { lightgray } from "../../style/color-main/color";

export default function LogoHeader() {
  return (
    <Box
      sx={{
        height: 100,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        px: 2,
        direction: "rtl",
      }}
    >
          {/* اللوجو */}
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          width: 65,
          height: 64,
          objectFit: "contain",
        }}
      />
      {/* النص */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            color: lightgray,
          }}
        >
           نظام المتطوعين
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: lightgray,
          
          }}
        >
          لوحة الادارة
        </Typography>
      </Box>

    
    </Box>
  );
}