import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import VolunteerDistributionCard from "./VolunteerDistributionCard";
import VolunteerGrowth from "./Volunteer Growth";
import { useTheme } from "@mui/material/styles";
import EventsStatusCard from "./EventsStatusCard";
import OrdersDistributionCard from "./OrdersDistributionCard";

const ChartsSection = () => {
  const theme = useTheme();

  return (
    <>
    <Box sx={{ width: "100%", p: { xs: 1, md: 2 } }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          mb: 2,
          mr: { md: 2 },
          color: theme.palette.primary.text3,
          textAlign: "right", // ليتناسب مع الواجهة العربية
        }}
      >
        الأداء الرئيسية
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }, // تحت شاشات lg ينزلوا تحت بعض
          gap: 3,
          width: "100%",
          alignItems: "stretch", // توحيد الارتفاع تلقائياً
          justifyContent: "center",
        }}
      >
        {/* الـ Card الأيمن - توزيع المتطوعين */}
        <Box
          sx={{
            width: { xs: "100%", lg: "407px" }, // حجم ثابت فقط على الشاشات الكبيرة، ومرن بالكامل على الصغير
            maxWidth: "100%",
            height: "347px",
          }}
        >
          <VolunteerDistributionCard />
        </Box>

        {/* الـ Card الأيسر - نمو المتطوعين (مرن ومستجيب تماماً) */}
        <Box
          sx={{
            flex: 1, // يأخذ باقي المساحة المتوفرة بالكامل
            width: "100%",
            maxWidth: "100%",
            height: "347px",
          }}
        >
          <VolunteerGrowth />
        </Box>
      </Box>
      

      
    </Box>
 <Box
  sx={{
    width: "100%",
    p: { xs: 2, md: 4 },
  }}
>
  <Box
    sx={{
      display: "flex",
      flexDirection: {
        xs: "column",
        sm: "column",
        lg: "row",
      },
      gap: 3,
      alignItems: "stretch",
      direction: "rtl",
    }}
  >
    <OrdersDistributionCard />
    <EventsStatusCard />
  </Box>
</Box>
    </>
  );
};

export default ChartsSection;