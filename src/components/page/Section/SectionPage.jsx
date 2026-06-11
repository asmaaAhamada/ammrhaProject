import React, { lazy, Suspense, useCallback, useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import SectionCard from "./SectionCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { white } from "../../../style/color-main/color";
import { useNavigate } from "react-router-dom";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

// lazy-loading للمودالات
const AddSection = lazy(() => import("./AddSection"));
const EditSection = lazy(() => import("./EditSection"));
const DeletSection = lazy(() => import("./DeletSection"));

export default function SectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // جلب البيانات وحالة التحميل والخطأ من الـ Redux Store
  const { data, isLoading, error } = useSelector((state) => state.fetchDepartment);
  
  // الوصول لمصفوفة الأقسام الحقيقية من الريسبونس
  const departmentsList = Array.isArray(data) ? data : data?.data || [];

  React.useEffect(() => {
    console.log("Fetching departments...");
    dispatch(fetchDepartment());
  }, [dispatch]);

  // حالات التحكم بالمودالات
  const [open, setOpen] = useState(false);
  const [opendelet, setOpendelet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // التوابع الخاصة بالكاردات
  const handleEdit = useCallback((card) => {
    setSelectedCard(card);
    setOpenEdit(true);
  }, []);

  const handleDelete = useCallback((card) => {
    setSelectedCard(card);
    setOpendelet(true);
  }, []);

  const handleFreeze = useCallback((card) => {
    console.log("تم تجميد القسم بنجاح، معرف القسم:", card.id);
  }, []);
  const handleSuccess = useCallback(() => {
  dispatch(fetchDepartment()); // 👈 إعادة تحميل البيانات
}, [dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      {/* الهيدر ثابت تماماً ولا يختفي أثناء التحميل */}
      <Box
        sx={{
          width: "100%",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: { xs: 1, sm: 1.5, md: 2 },
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            fontWeight: 700,
            color: theme.palette.primary.text3,
            whiteSpace: "nowrap",
          }}
        >
          الأقسام
        </Typography>

        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            width: { xs: "140px", sm: "160px", md: "177px" },
            height: "43px",
            borderRadius: "12px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            boxShadow: "none",
            fontSize: { xs: "13px", sm: "14px", md: "15px" },
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#162d6b",
              boxShadow: "none",
            },
          }}
        >
          إضافة قسم
          <AddIcon sx={{ width: "18px", height: "18px", mr: 2 }} />
        </Button>
      </Box>

      {/* منطقة عرض الكاردات أو مؤشر التحميل (اللودر) */}
      {isLoading ? (
        
                 <Box sx={{ py: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                   <Spin size="large" />
                   <Typography style={{ color: theme.palette.primary.chip }}>جاري تحميل الاقسام...</Typography>
                 </Box>
              
      ) : error ? (
        <Box sx={{ p: 5, width: "100%", textAlign: "center" }}>
          <Typography color="error" sx={{ fontWeight: 500 }}>
            حدث خطأ أثناء تحميل البيانات. يرجى مراجعة الإتصال بالسيرفر والمحاولة لاحقاً.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="flex-start">
          {departmentsList.map((department) => {
            
            // التأكد من قراءة الصفر بشكل سليم للأقسام الفارغة ومنع اختفائه
            const currentCount = department.current_volunteers_count !== undefined && department.current_volunteers_count !== null 
              ? department.current_volunteers_count 
              : 0;

            // فحص حقل الحد الأقصى إذا كان رقماً أو نصاً طويلاً (مثل قسم علاقات عامة)
            const isMaxANumber = !isNaN(department.max_volunteers);

            // صياغة الكارد مع دمج شروط التنسيق الخاصة بك
            const processedCard = {
              ...department,
              title: department.name, // الاسم فقط
              
              // معالجة الصورة المفقودة
              displayImage: department.image ? (
                <img 
                  src={department.image} 
                  alt={department.name} 
                  style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} 
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "140px",
                    backgroundColor: "#f9fafb",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    borderRadius: "8px",
                    border: "1px dashed #e5e7eb",
                  }}
                >
                  <ImageNotSupportedOutlinedIcon sx={{ fontSize: 32, color: "#9ca3af" }} />
                  <Typography sx={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}>
                    لا توجد صورة لهذا القسم
                  </Typography>
                </Box>
              ),

              // صياغة سطر المتطوعين مع الحالة ومحاذاتها بأقصى اليسار
              volunteersInfo: (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // توزيع العناصر على الأطراف بالتساوي
                    width: "100%",
                    mt: 2,
                  }}
                >
                  {/* جهة اليمين: الأعداد مدمجة وملونة */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: "14px", color: theme.palette.primary.text3, fontWeight: 500 }}>
                      المتطوعين:
                    </Typography>
                    <Typography component="span" sx={{ fontSize: "14px", fontWeight: 700, color: theme.palette.primary.button1 }}>
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
                      {isMaxANumber ? department.max_volunteers : "مفتوح"}
                    </Typography>
                  </Box>

                  {/* جهة اليسار تماماً وعلى نفس المحاذاة: نقطة خضراء متوهجة مع الحالة */}
                  {department.status === "نشط" && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <Box
                        sx={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#22c55e",
                          boxShadow: "0 0 6px #22c55e", // توهج خفيف للنقطة الخضراء
                        }}
                      />
                      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#22c55e" }}>
                        نشط
                      </Typography>
                    </Box>
                  )}
                </Box>
              ),
            };

            return (
              <Grid
                item
                key={department.id}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                display="flex"
                justifyContent="center"
              >
                <SectionCard
                  card={processedCard}
                  theme={theme}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onFreeze={handleFreeze}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* مودالات الليزي لودنغ */}
      <Suspense fallback={null}>
        {open && <AddSection open={open} onClose={() => setOpen(false)}     onSuccess={handleSuccess} // 👈 هنا
 />}
        {opendelet && <DeletSection open={opendelet} onClose={() => setOpendelet(false)} />}
        {openEdit && (
          <EditSection
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            selectedCard={selectedCard}
          />
        )}
      </Suspense>
    </Box>
  );
}