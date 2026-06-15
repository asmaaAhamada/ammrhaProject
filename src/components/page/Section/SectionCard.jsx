import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined"; 
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined"; 
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { baby_gray, red1, yallow1 } from "../../../style/color-main/color";
import { Tooltip } from "antd";
import { BaseUrl } from "../../../backend/Api";

function SectionCard({
  card,
  theme,
  onEdit,
  onDelete,
  onFreeze,
}) {
  
  // 🔹 دالة ذكية لمعالجة وبناء رابط الصورة الكامل لضمان ظهورها بالمتصفح دون كسر
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // إذا كان الرابط كاملاً جاهزاً من الباكيند
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    // إذا كان المسار راجع نسبياً مثل "storage/departments/..."
    const cleanBaseUrl = BaseUrl.replace("/v1", ""); 
    return `${cleanBaseUrl}/${imagePath}`;
  };

  // تأمين التقاط المسار سواء جاء تحت مسمى image أو image_url
  const finalImagePath = card.image_url || card.image;

  // 1. معالجة وتأمين قراءة الـ 0 لعدد المتطوعين الحاليين صراحةً ومنع اختفائه
  const currentCount = card.current_volunteers_count !== undefined && card.current_volunteers_count !== null 
    ? card.current_volunteers_count 
    : 0;

  // 2. التحقق إذا كان الحد الأقصى رقماً أو نصاً لتجنب تخريب التصميم
  const isMaxANumber = !isNaN(card.max_volunteers) && card.max_volunteers !== null && card.max_volunteers !== "";

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.Appar2,
        width: "100%",
        maxWidth: "352px",  
        height: "349px",    
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
      }}
    >
      {/* 🔹 فحص وتمرير رابط الصورة المصلح ديناميكياً */}
      {finalImagePath ? (
        <CardMedia
          component="img"
          image={getFullImageUrl(finalImagePath)} // 👈 تمرير الرابط بعد التجميع الذكي
          alt={card.name}
          loading="lazy"
          sx={{
            height: 154,
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            height: 154,
            backgroundColor: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            borderBottom: "1px solid #f0f0f0",
            color: "#9ca3af"
          }}
        >
          <ImageNotSupportedOutlinedIcon sx={{ fontSize: "28px" }} />
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>لا توجد صورة</Typography>
        </Box>
      )}

      {/* المحتوى */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          "&:last-child": { pb: 2 } 
        }}
      >
        <Box>
          {/* اسم القسم */}
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.text3,
              mb: 3,
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {card.name}
          </Typography>

          {/* سطر المتطوعين المدمج بالكامل */}
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between" 
            sx={{ width: "100%" }}
          >
            <Box display="flex" alignItems="center" sx={{ gap: 1, color: baby_gray }}>
              <PeopleAltOutlinedIcon sx={{ fontSize: "20px" }} />
              <Box display="flex" alignItems="center" sx={{ gap: 0.5 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: baby_gray
                  }}
                >
                  المتطوعين:
                </Typography>
                
                <Typography component="span" sx={{ fontSize: "14px", fontWeight: 700, color: theme.palette.primary.button1 || "#162d6b" }}>
                  {currentCount}
                </Typography>
                
                <Typography component="span" sx={{ fontSize: "14px", color: "#9ca3af" }}>
                  /
                </Typography>
                
                <Typography 
                  component="span" 
                  sx={{ 
                    fontSize: isMaxANumber ? "14px" : "11px", 
                    fontWeight: 600, 
                    color: isMaxANumber ? "#e11d48" : "#6b7280" 
                  }}
                >
                  {isMaxANumber ? card.max_volunteers : "مفتوح"}
                </Typography>
              </Box>
            </Box>

            {/* اليسار: الحالة */}
            {card.status === "نشط" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 6px #22c55e", 
                  }}
                />
                <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#22c55e" }}>
                  نشط
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        <Box>
          <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", marginBottom: "12px" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {/* عرض التفاصيل */}
            <Tooltip title="عرض تفاصيل القسم">
              <Button
                onClick={() => onDelete(card)} 
                startIcon={<VisibilityOutlinedIcon sx={{ ml: 0.5 }} />}
                sx={{
                  p: 0,
                  minWidth: "auto",
                  background: "transparent",
                  color: theme.palette.primary.button1, 
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { background: "transparent" }
                }}
              >
                عرض التفاصيل
              </Button>
            </Tooltip>
            
            {/* زر تجميد */}
            <Tooltip title="تجميد القسم">
              <Button
                onClick={() => onFreeze(card)}
                startIcon={<AcUnitOutlinedIcon sx={{ ml: 0.5 }} />}
                sx={{
                  p: 0,
                  minWidth: "auto",
                  background: "transparent",
                  color: yallow1,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { background: "transparent" }
                }}
              >
                تجميد
              </Button>
            </Tooltip>

            {/* زر تعديل */}
            <Tooltip title="تعديل القسم">
              <Button
                onClick={() => onEdit(card)}
                startIcon={<EditOutlinedIcon sx={{ ml: 0.5 }} />}
                sx={{
                  p: 0,
                  minWidth: "auto",
                  background: "transparent",
                  color: theme.palette.primary.text3,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { background: "transparent" }
                }}
              >
                تعديل
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default React.memo(SectionCard);