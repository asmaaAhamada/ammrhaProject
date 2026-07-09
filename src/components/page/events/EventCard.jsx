import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button, Chip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EventIcon from "@mui/icons-material/Event";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { babygreen, red1 } from "../../../style/color-main/color";
import PublicIcon from "@mui/icons-material/Public";

export default function EventCard({ card, theme, onEdit, onDelete, onView, onTransfer, userRole }) {  
  // تخصيص الألوان بناءً على نوع الفعالية من الباك إند
  const getTypeDetail = (type) => {
    if (type === "مستعجلة" || type === "urgent") {
      return { label: "مستعجلة", color: "#d32f2f", bgColor: "rgba(211, 47, 47, 0.1)" };
    }
    if (type === "اجتماع") {
      return { label: "اجتماع", color: "#ed6c02", bgColor: "rgba(237, 108, 2, 0.1)" };
    }
    return { label: card?.type || "عادية", color: "#757575", bgColor: "rgba(117, 117, 117, 0.1)" };
  };

  // تخصيص ألوان شارة الحالة 
  const getStatusDetail = (status) => {
    if (status === "قادمة" || status === "upcoming") {
      return { label: "قادمة", color: "#0288d1", bgColor: "rgba(2, 136, 209, 0.1)" };
    }
    if (status === "نشطة" || status === "active") {
      return { label: "نشطة", color: "#2e7d32", bgColor: "rgba(46, 125, 50, 0.1)" };
    }
    return { label: card?.status || "منتهية", color: "#9e9e9e", bgColor: "rgba(158, 158, 158, 0.1)" };
  };

  const typeInfo = getTypeDetail(card?.type);
  const statusInfo = getStatusDetail(card?.status);

  if (!card) return null;

  // 🌟 التحقق بشكل صارم إن كان المستخدم هو مدير عام للموارد البشرية
  const isHrGeneral = userRole === "hr_general";

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: theme.palette.primary.Appar2,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* منطقة عرض الصورة أو البديل */}
        <Box sx={{ position: "relative" }}>
          {card.image ? (
            <CardMedia
              component="img"
              height="180"
              image={card.image}
              alt={card.name}
              sx={{ objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "180px",
                backgroundColor: "#f8f9fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
                gap: 1
              }}
            >
              <ImageNotSupportedOutlinedIcon sx={{ fontSize: 40, color: "#9ca3af" }} />
              <Typography sx={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>لا يتوفر صورة للفعالية</Typography>
            </Box>
          )}

          <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 1, flexDirection: "column" }}>
            <Chip label={typeInfo.label} size="small" sx={{ backgroundColor: typeInfo.bgColor, color: typeInfo.color, fontWeight: 700, borderRadius: "6px" }} />
            <Chip label={statusInfo.label} size="small" sx={{ backgroundColor: statusInfo.bgColor, color: statusInfo.color, fontWeight: 700, borderRadius: "6px" }} />
          </Box>
        </Box>

        {/* تفاصيل الكارد ومحتواه الداخلي */}
        <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
          
          <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "17px", fontWeight: 700, mb: 2 }}>
            {card.name || "بدون عنوان"}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 3 }}>
            {card?.department?.name && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LayersOutlinedIcon sx={{ fontSize: "17px", color: 'red' }} />
                <Typography sx={{ color: theme?.palette?.primary?.text3 || "#333", fontSize: "13.5px", fontWeight: 500 }}>
                  القسم: <Box component="span" sx={{ fontWeight: 600, color:theme?.palette?.primary?.text6 }}>{card.department.name}</Box>
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EventIcon sx={{ fontSize: "17px", color: "#4caf50" }} />
              <Typography sx={{ color:theme?.palette?.primary?.text3, fontSize: "13.5px", fontWeight: 500 }}>
                التاريخ: <Box component="span" sx={{ fontWeight: 600 ,color:theme?.palette?.primary?.text6}}>{card.date || "غير محدد"}</Box>
              </Typography>
            </Box>
          </Box>

          {/* منطقة أزرار الإجراءات */}
          <Box 
            sx={{ 
              mt: "auto", 
              pt: 2, 
              borderTop: "1px solid rgba(0,0,0,0.06)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            {/* زر عرض - يظهر دائماً */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => onView && onView(card)}
                startIcon={<RemoveRedEyeOutlinedIcon sx={{ ml: 0.5, mr: 0 }} />}
                sx={{ p: 0, minWidth: "auto", color: theme?.palette?.primary?.text3 || "#000", fontWeight: 600, fontSize: "14px" }}
              >
                عرض
              </Button>
            </Box>

            {/* زر تعديل - يظهر دائماً */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", borderRight: "1px solid rgba(0,0,0,0.06)", borderLeft: isHrGeneral ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
              <Button
                onClick={() => onEdit && onEdit(card)}
                startIcon={<EditOutlinedIcon sx={{ ml: 0.5, mr: 0 }} />}
                sx={{ p: 0, minWidth: "auto", color: babygreen || "#000", fontWeight: 500, fontSize: "14px" }}
              >
                تعديل
              </Button>
            </Box>

            {/* 🌟 كتل أزرار الحذف والنقل: لن تظهر نهائياً من الـ DOM إذا كان المستخدم hr_general */}
            {!isHrGeneral && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 1, flexDirection: "column", alignItems: "center" }}>
                <Button
                  onClick={() => onDelete && onDelete(card)}
                  startIcon={<DeleteOutlineOutlinedIcon sx={{ ml: 0.5, mr: 0 }} />}
                  sx={{ p: 0, minWidth: "auto", color: red1 || "#ff0000", fontWeight: 500, fontSize: "14px", mb: card.department?.id !== 10 ? 0.5 : 0 }}
                >
                  حذف
                </Button>

                {card.department?.name !== "علاقات عامة" && (
                  <Button 
                    onClick={() => onTransfer && onTransfer(card)}
                    startIcon={<PublicIcon sx={{ ml: 0.5, mr: 0, color: "#2196f3" }} />}
                    sx={{ 
                      color: "#1e88e5", 
                      fontWeight: 600,
                      fontSize: "13px",
                      p: 0,
                      minWidth: "auto",
                      "&:hover": {
                        backgroundColor: "rgba(33, 150, 243, 0.08)"
                      }
                    }}
                  >
                    نقل للعام
                  </Button>
                )}
              </Box>
            )}
          </Box>

        </CardContent>
      </Card>
    </Grid>
  );
}