import React, { lazy, Suspense, useCallback, useState } from "react";
import { Box, Typography, Button, Grid, Alert } from "@mui/material";
import SectionCard from "./SectionCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined"; // 👈 أيقونة رسمية ممتازة لتمثيل الهيكلية والأقسام
import { white } from "../../../style/color-main/color";
import { useNavigate } from "react-router-dom";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined"; // أيقونة للتفعيل
import { Spin } from "antd";
import Swal from "sweetalert2";
import { Deactive } from "../../../backend/slice/department/deactive";
import { fetchDepartmentList } from "../../../backend/slice/department/fetchList";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
// الـ Lazy loading للمودالات
const AddSection = lazy(() => import("./AddSection"));
const EditSection = lazy(() => import("./EditSection"));
const SectionDetailsModal = lazy(() => import("./SectionDetailsModal"));
const FreezeDepartmentModal = lazy(() => import("./FreezeDepartmentModal"));
const ActivateDepartmentModal = lazy(() =>
    import("./ActivateDepartmentModal")
);
import { executeActiveDepartment } from "../../../backend/slice/department/active";
export default function SectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data, isLoading, error } = useSelector((state) => state.fetchDepartmentList);
  console.log(data)
  const departmentsList = Array.isArray(data) ? data : data?.data || [];

  React.useEffect(() => {
    dispatch(fetchDepartmentList());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false); 
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openActivate, setOpenActivate] = useState(false);
const [openFreeze, setOpenFreeze] = useState(false); // حالة فتح مودال التجميد
  const handleEdit = useCallback((card) => {
    setSelectedCard(card);
    setOpenEdit(true);
  }, []);

  const handleViewDetails = useCallback((card) => {
    console.log("تم الضغط على عرض التفاصيل للقسم:", card);
    setSelectedCard(card);
    setOpenDetails(true); 
  }, []);

const handleFreeze = useCallback((card) => {

    setSelectedCard(card);

    if(card.status==="مجمد"){
        setOpenActivate(true);
    }else{
        setOpenFreeze(true);
    }

},[]);
const handleConfirmActivate = async (departmentId) => {

    try{

        Swal.fire({
            title:"جاري تفعيل القسم...",
            allowOutsideClick:false,
            didOpen:()=>Swal.showLoading()
        });

        await dispatch(executeActiveDepartment(departmentId)).unwrap();

        Swal.fire({
            icon:"success",
            title:"تم التفعيل",
            text:"تم تفعيل القسم بنجاح.",
            confirmButtonColor:"#22c55e"
        });

        setOpenActivate(false);

        dispatch(fetchDepartmentList());

    }catch(err){

        Swal.fire({
            icon:"error",
            title:"فشل العملية",
            text:err
        });

    }

};
 // 1. تأكدي من استيراد الـ Thunk الخاص بالتجميد في أعلى ملف SectionPage.js

// 2. تحديث دالة handleConfirmFreeze داخل المكون لتصبح كالتالي:
const handleConfirmFreeze = async (departmentId, excludedVolunteerIds) => {
  try {
    // إظهار لودر انتظار قبل بدء العملية
    Swal.fire({
      title: "جاري تجميد القسم...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // تنفيذ الـ API عبر Redux Thunk وتمرير البيانات المطلوبة بالأسماء الصحيحة (id و volunteer_ids)
    const resultAction = await dispatch(Deactive({ id: departmentId, volunteer_ids: excludedVolunteerIds })).unwrap();

    // في حال نجاح العملية:
    Swal.fire({
      icon: "success",
      title: "تمت العملية بنجاح",
      text: "تم تجميد القسم وتحديث حالة المتطوعين بنجاح.",
      confirmButtonText: "موافق",
      confirmButtonColor: "#162d6b",
    });

    setOpenFreeze(false);
    dispatch(fetchDepartmentList()); // تحديث واجهة الأقسام الرئيسية

  } catch (serverError) {
    console.error("Freeze Error:", serverError);

    // إظهار مودال الفشل بالرسالة القادمة من الباكيند مباشرة
    Swal.fire({
      icon: "error",
      title: "فشل العملية",
      text: typeof serverError === "string" ? serverError : "حدث خطأ غير متوقع أثناء تجميد القسم.",
      confirmButtonText: "موافق",
      confirmButtonColor: "#d33", 
    });
  }
};

  const handleSuccess = useCallback(() => {
    dispatch(fetchDepartmentList()); 
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 }, boxSizing: "border-box", direction: "rtl" }}>
      
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

      {/* عرض المحتوى مع معالجة كافة الحالات بالتفصيل */}
      {isLoading ? (
        <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Spin size="large" />
          <Typography style={{ color: theme.palette.primary.chip, fontWeight: 500 }}>جاري تحميل الأقسام...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ mb: 3 }}>
          <Alert 
            severity="error" 
            variant="outlined"
            sx={{ borderRadius: "12px", fontWeight: 600 }}
          >
            {typeof error === "string" ? error : "حدث خطأ أثناء تحميل بيانات الأقسام."}
          </Alert>
        </Box>
      ) : departmentsList.length === 0 ? (
        /* 👈 حالة الفراغ المتطابقة والموحدة مع صفحة الأخبار */
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            minHeight: "45vh", 
            width: "100%",
            textAlign: "center",
            py: 4
          }}
        >
          {/* حاوية الدائرة الخلفية والأيقونة الشجرية للأقسام */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.inputt || "rgba(0, 0, 0, 0.03)",
              mb: 2.5
            }}
          >
            <AccountTreeOutlinedIcon 
              sx={{ 
                fontSize: "52px", 
                color: theme.palette.primary.text4,
                opacity: 0.7
              }} 
            />
          </Box>

          <Typography 
            sx={{ 
              color: theme.palette.primary.text3, 
              fontSize: { xs: "16px", sm: "18px" }, 
              fontWeight: 700,
              mb: 1
            }}
          >
            لا توجد أقسام مضافة حالياً
          </Typography>
          
          <Typography 
            sx={{ 
              color: theme.palette.primary.text4, 
              fontSize: { xs: "13px", sm: "14px" }, 
              fontWeight: 500,
              maxWidth: "340px",
              lineHeight: 1.6
            }}
          >
            النظام لا يحتوي على أي أقسام تنظيمية أو تطوعية في الوقت الحالي. يمكنك البدء بتأسيس أول قسم من خلال زر الإضافة المتاح بالأعلى.
          </Typography>
        </Box>
      ) : (
        /* عرض قائمة الكاردات الحقيقية */
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
                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
  {department.status === "نشط" ? (
    <>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#22c55e",
          boxShadow: "0 0 6px #22c55e",
        }}
      />
      <Typography sx={{ color: "#22c55e", fontWeight: 600, fontSize: 13 }}>
        نشط
      </Typography>
    </>
  ) : (
    <>
      <AcUnitOutlinedIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
      <Typography sx={{ color: "#f59e0b", fontWeight: 600, fontSize: 13 }}>
        مجمد
      </Typography>
    </>
  )}
</Box>
                </Box>
              ),
            };

            return (
              <Grid item key={department.id} xs={12} sm={6} md={4} lg={4} display="flex" justifyContent="center">
                <SectionCard
                  card={processedCard}
                  theme={theme}
                  onEdit={handleEdit}
                  onDelete={handleViewDetails} 
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
        {openDetails && (
          <SectionDetailsModal 
            open={openDetails} 
            onClose={() => setOpenDetails(false)} 
            sectionId={selectedCard?.id} 
          />
        )}
        {openFreeze && (
           <FreezeDepartmentModal
             open={openFreeze}
             onClose={() => setOpenFreeze(false)}
             department={selectedCard}
             onConfirm={handleConfirmFreeze}
           />
         )}
         <ActivateDepartmentModal
    open={openActivate}
    onClose={() => setOpenActivate(false)}
    department={selectedCard}
    onConfirm={handleConfirmActivate}
/>
      </Suspense>
    </Box>
  );
}