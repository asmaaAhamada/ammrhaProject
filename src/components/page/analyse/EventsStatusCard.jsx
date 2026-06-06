import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import { light_blue, white } from "../../../style/color-main/color";
import { motion } from "framer-motion"; // استيراد framer-motion

const greenColor = "rgba(5, 223, 114, 1)";
const yellowColor = "rgba(202, 138, 4, 1)";
const successBg = "rgba(5, 223, 114, 0.1)";

export default function EventsStatusCard() {
  const theme = useTheme();

  // تنظيم البيانات بمصفوفة يسهل التحكم بـ أبعاد الأنيميشن وتتابعها (Delay) بشكل نظيف
  const barData = [
    { label: "المنتهية", value: "48", targetHeight: 100, color: greenColor },
    { label: "الجارية", value: "12", targetHeight: 35, color: light_blue },
    { label: "قيد الانتظار", value: "20", targetHeight: 50, color: yellowColor },
  ];

  return (
    <Box
      dir="rtl"
      sx={{
        width: "100%",
        maxWidth: 502,
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.button1,
            width: 40,
            height: 40,
          }}
        >
          <CalendarTodayIcon 
            fontSize="small" 
            sx={{ 
              backgroundColor: theme.palette.primary.button1,
              color: white,
            }} 
          />
        </Avatar>

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.text3, fontWeight: "bold", fontSize: "1.1rem" }}>
            حالة الفعاليات
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.primary.text3 }}>
            الجارية والمنتهية
          </Typography>
        </Box>
      </Box>

      {/* Chart منطقه الأعمدة */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end", // دفع الأعمدة لترتكز على قاعدة واحدة بالأسفل
          gap: { xs: 4, sm: 6 },
          height: 120, // تثبيت الارتفاع يمنع اهتزاز النصوص بالأسفل أثناء الموشن
          my: 2,
        }}
      >
        {barData.map((bar, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* العمود المتحرك بالـ Scroll والـ Bounce */}
            <Box
              component={motion.div}
              style={{ originY: 1 }} // التمدد ينطلق من الأسفل إلى الأعلى
              initial={{ height: 0 }}
              whileInView={{
                height: [
                  0, 
                  bar.targetHeight + 15, // يرتفع متجاوزاً الهدف
                  bar.targetHeight - 10, // ينزل تحته
                  bar.targetHeight + 5,  // ارتداد أخير للأعلى
                  bar.targetHeight       // يستقر عند الارتفاع الأصلي
                ]
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                delay: index * 0.12 // ظهور متتالي ناعم وسلس
              }}
              sx={{
                width: 35,
                bgcolor: bar.color,
                borderRadius: "6px 6px 4px 4px",
              }}
            />

            <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: bar.color }}>
              {bar.value}
            </Typography>

            <Typography variant="caption" sx={{ color: bar.color, fontWeight: 600 }}>
              {bar.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
        <Box sx={{ flex: 1, bgcolor: "rgba(5, 223, 114, 0.1)", p: 1.5, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(59, 133, 254, 1)', fontWeight: 'bold' }}>معدل الإنجاز </Typography>
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