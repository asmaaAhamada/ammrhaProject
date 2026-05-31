import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import { blue5, light_blue, white } from "../../../style/color-main/color";

const greenColor = "rgba(5, 223, 114, 1)";
const yellowColor = "rgba(202, 138, 4, 1)";
const totalBg = "rgba(161, 169, 195, 0.05)";
const successBg = "rgba(5, 223, 114, 0.1)";

export default function EventsStatusCard() {
  const theme = useTheme();

  return (
    <Box
      dir="rtl"
      sx={{
        width: "100%",
        maxWidth: 502,
                height: { xs: 'auto', md: 346 },

        height: 346,
        backgroundColor: theme.palette.primary.Appar2,
        borderRadius: 4,
        p: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Avatar
          sx={{
backgroundColor:
                              theme.palette.primary.button1,            
            width: 40,
            height: 40,
          }}
        >
          <CalendarTodayIcon fontSize="small" sx={{ backgroundColor:
                              theme.palette.primary.button1,
                            color: white,}} />
        </Avatar>

        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.text3,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            حالة الفعاليات
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: theme.palette.primary.text3,
            }}
          >
            الجارية والمنتهية
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: { xs: 4, sm: 6 },
          my: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 100,
              bgcolor: greenColor,
              borderRadius: "6px 6px 4px 4px",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: "bold",
              color: greenColor,
            }}
          >
            48
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: greenColor,
              fontWeight: 600,
            }}
          >
            المنتهية
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 35,
              bgcolor: light_blue,
              borderRadius: "6px 6px 4px 4px",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: "bold",
              color: light_blue,
            }}
          >
            12
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: light_blue,
              fontWeight: 600,
            }}
          >
            الجارية
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 50,
              bgcolor: yellowColor,
              borderRadius: "6px 6px 4px 4px",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: "bold",
              color: yellowColor,
            }}
          >
            20
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: yellowColor,
              fontWeight: 600,
            }}
          >
            قيد الانتظار
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
             <Box sx={{ flex: 1, bgcolor: blue5, p: 1.5, borderRadius: 3, textAlign: 'center' }}>
               <Typography variant="caption" sx={{ color: 'rgba(59, 133, 254, 1)', fontWeight: 'bold' }}>نعدل الإنجاز </Typography>
               <Typography variant="h6" sx={{ color: 'rgba(59, 133, 254, 1)', fontWeight: 'bold', mt: 0.5 }}>١٨٠</Typography>
             </Box>
             <Box sx={{ flex: 1, bgcolor: successBg, p: 1.5, borderRadius: 3, textAlign: 'center' }}>
               <Typography variant="caption" sx={{ color: greenColor, fontWeight: 'bold' }}> الإجمالي</Typography>
               <Typography variant="h6" sx={{ color: greenColor, fontWeight: 'bold', mt: 0.5 }}>٩٣٪</Typography>
             </Box>
           </Box>
    </Box>
  );
}