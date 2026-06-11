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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined"; // أيقونة التجميد (Ice/Freeze)
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined"; // أيقونة غياب الصورة

import { baby_gray, red1, yallow1 } from "../../../style/color-main/color";
import { Tooltip } from "antd";

function SectionCard({
  card,
  theme,
  onEdit,
  onDelete,
  onFreeze,
}) {
  // 1. معالجة وتأمين قراءة الـ 0 لعدد المتطوعين الحاليين صراحةً ومنع اختفائه
  const currentCount = card.current_volunteers_count !== undefined && card.current_volunteers_count !== null 
    ? card.current_volunteers_count 
    : 0;

  // 2. التحقق إذا كان الحد الأقصى رقماً أو نصاً (مثل قسم علاقات عامة) لتجنب تخريب التصميم
  const isMaxANumber = !isNaN(card.max_volunteers) && card.max_volunteers !== null && card.max_volunteers !== "";

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.Appar2,
        width: "100%",
        maxWidth: "352px",  // العرض المطلوب
        height: "349px",    // الطول الثابت المطلوب للـ 3 كاردات
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
      }}
    >
      {/* الصورة: إذا كانت null يعرض مربّع رمادي دافئ يحافظ على أبعاد الكارد الثابتة */}
      {card.image ? (
        <CardMedia
          component="img"
          image={card.image}
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
          "&:last-child": { pb: 2 } // لإلغاء البادينغ التلقائي الإضافي من الماتيريال ديزاين
        }}
      >
        <Box>
          {/* اسم القسم القادم من السلايس */}
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

          {/* سطر المتطوعين المدمج بالكامل مع الحالة النشطة والنقطة الخضراء بأقصى اليسار */}
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between" // لتوزيع الأعداد على اليمين والحالة على اليسار تماماً
            sx={{ width: "100%" }}
          >
            {/* اليمين: الأيقونة والأعداد بجانب بعضها تماماً */}
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
                
                {/* الرقم الحالي بلون الثيم المميز لإبرازه */}
                <Typography component="span" sx={{ fontSize: "14px", fontWeight: 700, color: theme.palette.primary.button1 || "#162d6b" }}>
                  {currentCount}
                </Typography>
                
                <Typography component="span" sx={{ fontSize: "14px", color: "#9ca3af" }}>
                  /
                </Typography>
                
                {/* الحد الأقصى بلون مختلف (وردي/أحمر غامق) أو كلمة مفتوح إذا كانت داتا نصية */}
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

            {/* اليسار: النقطة الخضراء المشعة مع كلمة نشط */}
            {card.status === "نشط" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 6px #22c55e", // تأثير التوهج الأخضر الأنيق
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

          {/* الأزرار السفليّة كما هي بدون تعديل في الـ Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            
            {/* زر حذف */}
            <Tooltip title="حذف القسم">
              <Button
                onClick={() => onDelete(card)}
                startIcon={<DeleteOutlineOutlinedIcon sx={{ ml: 0.5 }} />}
                sx={{
                  p: 0,
                  minWidth: "auto",
                  background: "transparent",
                  color: red1,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { background: "transparent" }
                }}
              >
                حذف
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