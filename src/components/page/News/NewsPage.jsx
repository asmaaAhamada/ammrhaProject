// NeWsPage.jsx
import React, { lazy, Suspense, useCallback, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Alert
} from "@mui/material";
import NewsCard from "./NewsCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"; 
import { white } from "../../../style/color-main/color";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncement } from "../../../backend/slice/announcement/fetchAll";
import { Spin } from "antd"; 

// lazy-loading
const AddNews = lazy(() => import("./addNews"));
const EditNews = lazy(() => import("./edit"));
const DeletNews = lazy(() => import("./deletnew"));

export default function NeWsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // جلب بيانات الأخبار الحقيقية وحالة التحميل والخطأ من الريدوكس
  const { data: announcementResponse, isLoading, error } = useSelector((state) => state.fetchAnnouncement);

  // استخراج مصفوفة البيانات الحقيقية
  const actualCardsData = announcementResponse || [];

  // دالة جلب البيانات معزولة لتكرار استخدامها عند الإضافة أو الحذف
  const loadAnnouncements = useCallback(() => {
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  // جلب البيانات عند تحميل الصفحة لأول مرة
  React.useEffect(() => {
    loadAnnouncements(); 
  }, [loadAnnouncements]);

  const [open, setOpen] = useState(false);
  const [opendelet, setOpendelet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEdit = useCallback((card) => {
    setSelectedCard(card);
    setOpenEdit(true);
  }, []);

  const handleDelete = useCallback((card) => {
    setSelectedCard(card); 
    setOpendelet(true);
  }, []);

  const handleView = useCallback((card) => {
    navigate(`/News/${card.id}`);
  }, [navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
        direction: "rtl" 
      }}
    >
      {/* الهيدر الرئيسي صفحة الأخبار */}
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
          الأخبار
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
          إضافة خبر
          <AddIcon sx={{ width: "18px", height: "18px", mr: 1, ml: 0 }} />
        </Button>
      </Box>

      {/* 1. معالجة حالة التحميل */}
      {isLoading ? (
        <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Spin size="large" />
          <Typography style={{ color: theme.palette.primary.chip, fontWeight: 500 }}>
            جاري تحميل الأخبار...
          </Typography>
        </Box>
      ) : error ? (
        /* 2. معالجة حالة الأخطاء */
        <Box sx={{ mb: 3 }}>
          <Alert 
            severity="error" 
            variant="outlined"
            sx={{ borderRadius: "12px", fontWeight: 600 }}
          >
            {typeof error === "string" ? error : "حدث خطأ أثناء تحميل بيانات الأخبار."}
          </Alert>
        </Box>
      ) : actualCardsData.length === 0 ? (
        /* 3. معالجة حالة الفراغ */
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
            <CampaignOutlinedIcon 
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
            سجل الأخبار فارغ حالياً
          </Typography>
          
          <Typography 
            sx={{ 
              color: theme.palette.primary.text4, 
              fontSize: { xs: "13px", sm: "14px" }, 
              fontWeight: 500,
              maxWidth: "320px",
              lineHeight: 1.6
            }}
          >
            لم يتم نشر أي أخبار أو إعلانات جديدة بالنظام. يمكنك البدء بإضافة أول خبر من خلال الزر في الأعلى.
          </Typography>
        </Box>
      ) : (
        /* 4. عرض الكاردات بالبيانات الحقيقية */
        <Grid container spacing={3}>
          {actualCardsData.map((card) => (
            <NewsCard
              key={card.id}
              card={card}
              theme={theme}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </Grid>
      )}

      {/* دعم النوافذ المنبثقة بالليزي لودينغ */}
      <Suspense fallback={null}>
        {/* 👈 تم تمرير onSuccess هنا لإعادة جلب البيانات تلقائياً */}
        {open && <AddNews open={open} onClose={() => setOpen(false)} onSuccess={loadAnnouncements} />}
        {opendelet && <DeletNews open={opendelet} onClose={() => setOpendelet(false)} selectedCard={selectedCard} onSuccess={loadAnnouncements} />}
        {openEdit && <EditNews open={openEdit} onClose={() => setOpenEdit(false)} selectedCard={selectedCard} onSuccess={loadAnnouncements} />}
      </Suspense>
    </Box>
  );
}