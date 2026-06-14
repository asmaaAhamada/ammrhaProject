import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import EventIcon from "@mui/icons-material/Event";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, CardMedia, Typography, Button, Chip, Alert, Grid } from "@mui/material";
import { red1, white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { fetchDetailsEvents, resetDetails } from "../../../backend/slice/events/deteails";

export default function EventDetails() {
  const { id } = useParams(); 
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // جلب بيانات الفعالية المحددة وحالات التحميل من الريدوكس
  const { data: eventData, isLoading, error } = useSelector((state) => state.fetchDetailsEvents);

  // استدعاء الـ API بناءً على المعرف القادم من الـ URL وتنظيف البيانات عند مغادرة الصفحة
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsEvents(id));
    }
    return () => {
      dispatch(resetDetails());
    };
  }, [id, dispatch]);

  // دالة لتنظيف اسم القسم من الأكواد والرموز العشوائية المضافة بالباك إند
  const cleanDepartmentName = (name) => {
    if (!name) return "";
    return name.replace(/[a-z0-9]{8,}/gi, '').trim();
  };

  // دوال جلب الألوان لشارات النوع والحالة بالتفاصيل لتطابق ردود الباك إند العربية والإنجليزية
  const getTypeDetail = (type) => {
    if (type === "مستعجلة" || type === "urgent") {
      return { label: "مستعجلة", color: "#d32f2f", bgColor: "rgba(211, 47, 47, 0.1)" };
    }
    if (type === "اجتماع") {
      return { label: "اجتماع", color: "#ed6c02", bgColor: "rgba(237, 108, 2, 0.1)" };
    }
    return { label: type || "عادية", color: "#757575", bgColor: "rgba(117, 117, 117, 0.1)" };
  };

  const getStatusDetail = (status) => {
    if (status === "قادمة" || status === "upcoming") {
      return { label: "قادمة", color: "#0288d1", bgColor: "rgba(2, 136, 209, 0.1)" };
    }
    if (status === "نشطة" || status === "active") {
      return { label: "نشطة", color: "#2e7d32", bgColor: "rgba(46, 125, 50, 0.1)" };
    }
    return { label: status || "منتهية", color: "#9e9e9e", bgColor: "rgba(158, 158, 158, 0.1)" };
  };

  // 1. معالجة حالة التحميل (Loading) باستخدام الـ Spin الموحد
  if (isLoading) {
    return (
      <Box sx={{ py: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "100%" }}>
        <Spin size="large" />
        <Typography style={{ color: theme?.palette?.primary?.button1 || "#162d6b", fontWeight: 500 }}>
          جاري تحميل تفاصيل الفعالية...
        </Typography>
      </Box>
    );
  }

  // 2. معالجة حالة وجود خطأ من السيرفر (Error)
  if (error) {
    return (
      <Box sx={{ p: 3, width: "100%", direction: "rtl" }}>
        <Alert severity="error" variant="outlined" sx={{ borderRadius: "12px", fontWeight: 600, mb: 3 }}>
          {typeof error === "string" ? error : "حدث خطأ أثناء جلب تفاصيل الفعالية."}
        </Alert>
        <Button variant="contained" onClick={() => navigate("/Events")} sx={{ backgroundColor: theme?.palette?.primary?.button1, borderRadius: "10px" }}>
          العودة لقائمة الفعاليات
        </Button>
      </Box>
    );
  }

  // 3. معالجة حالة عدم العثور على الفعالية
  if (!eventData) {
    return (
      <Box sx={{ p: 5, textAlign: "center", width: "100%", direction: "rtl" }}>
        <Typography sx={{ color: "error.main", fontSize: "18px", fontWeight: 700, mb: 3 }}>
          الفعالية المطلوبة غير موجودة أو لا تملك صلاحية الوصول إليها.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/Events")} sx={{ borderRadius: "10px" }}>
          العودة لقائمة الفعاليات
        </Button>
      </Box>
    );
  }

  const typeInfo = getTypeDetail(eventData.type);
  const statusInfo = getStatusDetail(eventData.status);

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 }, boxSizing: "border-box", direction: "rtl" }}>
      
      {/* هيدر صفحة التفاصيل العلوي */}
      <Box sx={{ width: "100%", minHeight: "36px", display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography sx={{ fontSize: { xs: "20px", sm: "22px", md: "26px" }, fontWeight: 700, color: theme?.palette?.primary?.text3 || "#000" }}>
          تفاصيل الفعالية
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/Events")}
          sx={{
            width: { xs: "130px", sm: "150px", md: "160px" },
            height: "40px",
            borderRadius: "10px",
            backgroundColor: theme?.palette?.primary?.button1 || "#162d6b",
            color: white || "#fff",
            boxShadow: "none",
            fontWeight: 600,
            fontSize: '15px',
            "&:hover": { backgroundColor: theme?.palette?.primary?.button1, opacity: 0.9, boxShadow: "none" }
          }}
        >
          رجوع
          <ArrowBackIosNewOutlinedIcon sx={{ mr: 1.5, fontSize: "16px" }} />
        </Button>
      </Box>

      {/* عرض كارد التفاصيل الشامل للمعلومات الجديدة */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "100%", maxWidth: "1136px", borderRadius: "16px", overflow: "hidden", backgroundColor: theme?.palette?.primary?.imagecard1 || "#fff", boxShadow: "0px 4px 20px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
          
          {/* حاوية الصورة الأساسية أو البديل في حال غيابها */}
          <Box sx={{ position: "relative" }}>
            {eventData.image ? (
              <CardMedia 
                component="img" 
                image={eventData.image} 
                alt={eventData.name} 
                sx={{ height: { xs: 240, sm: 380 }, objectFit: "cover" }} 
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: 300 },
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  borderBottom: "1px solid rgba(0,0,0,0.04)"
                }}
              >
                <ImageNotSupportedOutlinedIcon sx={{ fontSize: 52, color: "#9ca3af" }} />
                <Typography sx={{ fontSize: "14px", color: "#9ca3af", fontWeight: 600 }}>لا يتوفر صورة لهذه الفعالية</Typography>
              </Box>
            )}
            
            {/* الشارات العائمة الملونة فوق الصورة */}
            <Box sx={{ position: "absolute", bottom: 16, right: 16, display: "flex", gap: 1.5 }}>
              <Chip label={typeInfo.label} sx={{ backgroundColor: typeInfo.bgColor, color: typeInfo.color, fontWeight: 700, px: 1, fontSize: "13px" }} />
              <Chip label={statusInfo.label} sx={{ backgroundColor: statusInfo.bgColor, color: statusInfo.color, fontWeight: 700, px: 1, fontSize: "13px" }} />
            </Box>
          </Box>

          <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
            
            {/* عنوان الفعالية الرئيسي */}
            <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: { xs: "20px", sm: "24px", md: "28px" }, fontWeight: 800, mb: 3 }}>
              {eventData.name}
            </Typography>

            {/* شبكة البيانات التفصيلية (Grid) المنظمة */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              
              {/* تاريخ الفعالية */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <EventIcon sx={{ color: "#4caf50", fontSize: "22px" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500 }}>تاريخ الفعالية</Typography>
                    <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "15px", fontWeight: 600 }}>{eventData.date || "غير محدد"}</Typography>
                  </Box>
                </Box>
              </Grid>

              {/* التوقيت (وقت البداية والنهاية) */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <AccessTimeOutlinedIcon sx={{ color: "#0288d1", fontSize: "22px" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500 }}>توقيت الفعالية</Typography>
                    <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "15px", fontWeight: 600 }}>
                      من {eventData.start_time || "--:--"} إلى {eventData.end_time || "--:--"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* الموقع الجغرافي */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PlaceOutlinedIcon sx={{ color: "#e11d48", fontSize: "22px" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500 }}>الموقع والجهة</Typography>
                    <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "15px", fontWeight: 600 }}>{eventData.location || "غير محدد"}</Typography>
                  </Box>
                </Box>
              </Grid>

              {/* القسم المسؤول بعد تنظيفه */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <LayersOutlinedIcon sx={{ color: theme?.palette?.primary?.button1 || "#162d6b", fontSize: "22px" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500 }}>القسم التنظيمي</Typography>
                    <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "15px", fontWeight: 600 }}>
                      {cleanDepartmentName(eventData.department)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* المتطوعين المطلوبين */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PeopleAltOutlinedIcon sx={{ color: "#ed6c02", fontSize: "22px" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500 }}>المتطوعين المطلوبين</Typography>
                    <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "15px", fontWeight: 600 }}>{eventData.required_volunteers || 0} متطوعين</Typography>
                  </Box>
                </Box>
              </Grid>

              {/* عدد الدعم اللوجستي وعمليات الميديا */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <AssignmentTurnedInOutlinedIcon sx={{ color: "#9c27b0", fontSize: "22px" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: "12px", fontWeight: 500 }}>الخدمات اللوجستية / الميديا</Typography>
                    <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "15px", fontWeight: 600 }}>
                      {eventData.logistic_count || 0} لوجستيات | {eventData.media_count || 0} إعلامي
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* تفاصيل منشئ الفعالية ووقت الإنشاء */}
            <Box sx={{ p: 2, mb: 3, borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.01)", border: "1px dashed rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: "18px", color: "#6b7280" }} />
              <Typography sx={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
                بواسطة: <Box component="span" sx={{ fontWeight: 600, color: "#333" }}>{eventData.created_by || "غير معروف"}</Box>
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#9ca3af", mx: { sm: 1 }, display: { xs: "none", sm: "block" } }}>|</Typography>
              <Typography sx={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
                تاريخ النشر: <Box component="span" sx={{ fontWeight: 600 }}>{eventData.created_at || "--"}</Box>
              </Typography>
            </Box>

            {/* الوصف الشامل والبيان للفعالية */}
            <Typography sx={{ color: "#9ca3af", fontSize: "14px", fontWeight: 700, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              الوصف التفصيلي للفعالية
            </Typography>
            <Typography sx={{ color: theme?.palette?.primary?.text6 || "#555", fontSize: { xs: "15px", md: "16px" }, fontWeight: 500, lineHeight: 1.8, mb: 4, textAlign: "justify" }}>
              {eventData.description || "لا يوجد وصف تفصيلي متوفر لهذه الفعالية حالياً."}
            </Typography>

            {/* أسفل الكارد: أزرار عمليات الإدارة (تعديل وحذف) */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3, borderTop: "1px solid rgba(0,0,0,0.06)", pt: 2.5 }}>
              <Button
                onClick={() => console.log("حذف الفعالية الحقيقية، ID:", eventData.id)}
                startIcon={<DeleteOutlineOutlinedIcon sx={{ ml: 1, mr: 0 }} />}
                sx={{ p: 1, px: 2, minWidth: "auto", background: "transparent", color: red1 || "#d32f2f", fontWeight: 600, fontSize: "14.5px", borderRadius: "8px", "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.04)" } }}
              >
                حذف الفعالية
              </Button>
              <Button
                onClick={() => console.log("تعديل الفعالية الحقيقية، ID:", eventData.id)}
                startIcon={<EditOutlinedIcon sx={{ ml: 1, mr: 0 }} />}
                sx={{ p: 1, px: 2, minWidth: "auto", background: "transparent", color: theme?.palette?.primary?.button1 || "#162d6b", fontWeight: 600, fontSize: "14.5px", borderRadius: "8px", "&:hover": { backgroundColor: "rgba(22, 45, 107, 0.04)" } }}
              >
                تعديل البيانات
              </Button>
            </Box>

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}