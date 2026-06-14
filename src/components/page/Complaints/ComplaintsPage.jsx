import React, { lazy, Suspense } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ComplaintsTable = lazy(() => import("./ComplaintsTable"));
const ComplaintsStatsCards = lazy(() => import("./cardStatics"));

const ComplaintsPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 }, // بادينغ متجاوب لمنع ضياع المساحات بالموبايل
        maxWidth: "100vw",           // يمنع الصفحة من التمدد أفقياً نهائياً
        overflowX: "hidden",         // إخفاء أي تمدد زائد يسبب سكرول خارجي
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "22px", sm: "26px", md: "28px" }, // حجم خط مرن للتوب بار
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        الشكاوي
      </Typography>

      <Suspense fallback={<Skeleton variant="rect" height={90} sx={{ mb: 4 }} />}>
        <ComplaintsStatsCards />
      </Suspense>

      {/* حاوية الجدول لمنع دفع الصفحة وعمل سكرول داخلي نظيف */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
          <ComplaintsTable />
        </Suspense>
      </Box>
    </Box>
  );
};

export default ComplaintsPage;