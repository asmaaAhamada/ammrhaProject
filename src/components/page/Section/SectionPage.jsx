import React, { lazy, Suspense, useCallback, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import SectionCard from "./SectionCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { white } from "../../../style/color-main/color";
import { useNavigate } from "react-router-dom";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

// الـ Lazy loading للمودالات - تأكدي أن اسم الملف يطابق تماماً ملف المودال في نفس المجلد
const AddSection = lazy(() => import("./AddSection"));
const EditSection = lazy(() => import("./EditSection"));
// 💡 تأكدي أن الملف في المجلد اسمه SectionDetailsModal.jsx تماماً بالصياغة الحرفية
const SectionDetailsModal = lazy(() => import("./SectionDetailsModal"));
export default function SectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data, isLoading, error } = useSelector((state) => state.fetchDepartment);
  const departmentsList = Array.isArray(data) ? data : data?.data || [];

  React.useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false); 
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEdit = useCallback((card) => {
    setSelectedCard(card);
    setOpenEdit(true);
  }, []);

  const handleViewDetails = useCallback((card) => {
    console.log("تم الضغط على عرض التفاصيل للقسم:", card);
    setSelectedCard(card);
    setOpenDetails(true); // 👈 تفعيل الفتح بشكل صحيح
  }, []);

  const handleFreeze = useCallback((card) => {
    console.log("تم تجميد القسم بنجاح، معرف القسم:", card.id);
  }, []);

  const handleSuccess = useCallback(() => {
    dispatch(fetchDepartment()); 
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 }, boxSizing: "border-box" }}>
      
      {/* الهيدر */}
      <Box sx={{ width: "100%", minHeight: "36px", display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: { xs: "20px", sm: "22px", md: "26px" }, fontWeight: 700, color: theme.palette.primary.text3 }}>
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
            fontWeight: 600,
            "&:hover": { backgroundColor: "#162d6b" },
          }}
        >
          إضافة قسم
          <AddIcon sx={{ width: "18px", height: "18px", mr: 2 }} />
        </Button>
      </Box>

      {/* عرض المحتوى */}
      {isLoading ? (
        <Box sx={{ py: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Spin size="large" />
          <Typography style={{ color: theme.palette.primary.chip }}>جاري تحميل الاقسام...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ p: 5, width: "100%", textAlign: "center" }}>
          <Typography color="error" sx={{ fontWeight: 500 }}>حدث خطأ أثناء تحميل البيانات.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="flex-start">
          {departmentsList.map((department) => {
            const currentCount = department.current_volunteers_count !== undefined && department.current_volunteers_count !== null ? department.current_volunteers_count : 0;
            const isMaxANumber = !isNaN(department.max_volunteers) && department.max_volunteers !== null && department.max_volunteers !== "";

            const processedCard = {
              ...department,
              title: department.name,
              displayImage: department.image ? (
                <img src={department.image} alt={department.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
              ) : (
                <Box sx={{ width: "100%", height: "140px", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px dashed #e5e7eb" }}>
                  <ImageNotSupportedOutlinedIcon sx={{ fontSize: 32, color: "#9ca3af" }} />
                </Box>
              ),
              volunteersInfo: (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: "14px", color: theme.palette.primary.text3 }}>المتطوعين:</Typography>
                    <Typography component="span" sx={{ fontSize: "14px", fontWeight: 700, color: theme.palette.primary.button1 }}>{currentCount}</Typography>
                    <Typography component="span" sx={{ fontSize: "14px", color: "#9ca3af" }}>/</Typography>
                    <Typography component="span" sx={{ fontSize: "14px", fontWeight: 600, color: isMaxANumber ? "#e11d48" : "#6b7280" }}>
                      {isMaxANumber ? department.max_volunteers : "مفتوح"}
                    </Typography>
                  </Box>
                  {department.status === "نشط" && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <Box sx={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#22c55e" }}>نشط</Typography>
                    </Box>
                  )}
                </Box>
              ),
            };

            return (
              <Grid item key={department.id} xs={12} sm={6} md={4} lg={4} display="flex" justifyContent="center">
                <SectionCard
                  card={processedCard}
                  theme={theme}
                  onEdit={handleEdit}
                  onDelete={handleViewDetails} // 👈 يمرر هنا دالة الفتح
                  onFreeze={handleFreeze}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* المودالات */}
      <Suspense fallback={null}>
        {open && <AddSection open={open} onClose={() => setOpen(false)} onSuccess={handleSuccess} />}
        
        {openEdit && <EditSection open={openEdit} onClose={() => setOpenEdit(false)} selectedCard={selectedCard} onSuccess={handleSuccess} />}
        
        {/* مودال تفاصيل القسم الاستدعاء والتأكيد الشرطي */}
        {openDetails && (
          <SectionDetailsModal 
            open={openDetails} 
            onClose={() => setOpenDetails(false)} 
            sectionId={selectedCard?.id} 
          />
        )}
      </Suspense>
    </Box>
  );
}