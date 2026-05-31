import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { VictoryPie } from "victory";

const VolunteerDistributionCard = () => {
  const theme = useTheme();

  const data = [
    { x: "مفعلين", y: 55 },
    { x: "مجمدين", y: 25 },
    { x: "قائمة سوداء", y: 20 },
  ];

  const colors = ["#4CAF50", "#FFC107", "#F44336"]; 
  const total = data.reduce((acc, item) => acc + item.y, 0);

  return (
    <Box
      sx={{
        width: "100%", // تغييرها لـ 100% لتأخذ حجم الحاوية المخصصة لها من ChartsSection
        height: "347px",
        backgroundColor: theme.palette.primary?.Appar2 || "#ffffff",
        borderRadius: "14px",
        padding: "24px", 
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      {/* العنوان العلوي */}
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: 2,
          textAlign: "center"
        }}
      >
        توزيع المتطوعين
      </Typography>

      {/* منطقة المخطط */}
      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* النص في منتصف الدائرة */}
        <Box sx={{ position: "absolute", textAlign: "center", zIndex: 1 }}>
          <Typography sx={{ fontSize: "12px", color: theme.palette.primary.text3, fontWeight: 500 }}>
            الإجمالي
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 700, color: theme.palette.primary.text3 }}>
            {total}
          </Typography>
        </Box>

        {/* المخطط الدائري */}
        <Box sx={{ width: "160px", height: "160px" }}>
          <VictoryPie
            data={data}
            padAngle={2}
            innerRadius={55}
            radius={75}      
            colorScale={colors}
            labels={() => null} 
            padding={0}        
            width={160}
            height={160}
            style={{
              data: {
                stroke: "#fff",
                strokeWidth: 2,
              },
            }}
          />
        </Box>
      </Box>

      {/* العناصر التوضيحية (Legend) بالأسفل */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mt: 3,
          borderTop: "1px solid #f0f0f0", 
          pt: 2,
        }}
      >
        {data.map((item, index) => (
          <Box key={item.x} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "3px", backgroundColor: colors[index] }} />
            <Typography sx={{ fontSize: "11px", fontWeight: 500, color: "#4B5563" }}>
              {item.x} ({item.y}%)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VolunteerDistributionCard;