// NewsDetails.jsx
import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { red1, white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsAnnouncement, resetDetails } from "../../../backend/slice/announcement/deteails";
import { fetchAnnouncement } from "../../../backend/slice/announcement/fetchAll"; // لجلب الأخبار مجدداً بعد الحذف أو التعديل
import { Spin } from "antd";

// استيراد النوافذ المنبثقة بنفس الطريقة
const EditNews = lazy(() => import("./edit"));
const DeletNews = lazy(() => import("./deletnew"));

export default function NewsDetails() {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const theme = useTheme();
  const navigate = useNavigate();

  // حالات التحكم بالـ Modals محلياً داخل صفحة التفاصيل
  const [opendelet, setOpendelet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data, isLoading, error } = useSelector((state) => state.fetchDetailsAnnouncement);

  // دالة تحديث البيانات بعد الحذف أو التعديل
  const handleSuccess = useCallback(() => {
    dispatch(fetchAnnouncement()); // تحديث قائمة الأخبار برا
    if (id) dispatch(fetchDetailsAnnouncement(id)); // تحديث تفاصيل الخبر الحالي
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsAnnouncement(id));
    }
    return () => {
      dispatch(resetDetails());
    };
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minHeight: "60vh", justifyContent: "center" }}>
        <Spin size="large" />
        <Typography style={{ color: theme.palette.primary.chip, fontWeight: 500 }}>
          جاري تحميل تفاصيل الخبر...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography sx={{ color: "error.main", fontSize: "18px", fontWeight: 600, mb: 2 }}>
          {error || "الخبر المطلوب غير موجود أو تم حذفه"}
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/News")}>
          العودة لقائمة الأخبار
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 }, direction: "rtl" }}>
      {/* الهيدر */}
      <Box sx={{ width: "100%", minHeight: "36px", display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: { xs: "20px", sm: "22px", md: "26px" }, fontWeight: 700, color: theme.palette.primary.text3 }}>
          تفاصيل خبر
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/News")}
          sx={{
            width: { xs: "130px", sm: "150px", md: "177px" },
            height: "43px",
            borderRadius: "12px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            boxShadow: "none",
            fontWeight: 600,
            fontSize: '16px'
          }}
        >
          رجوع
          <ArrowBackIosNewOutlinedIcon sx={{ mr: 2 }} />
        </Button>
      </Box>

      {/* الكارد */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "100%", maxWidth: "1136px", borderRadius: "16px", overflow: "hidden", backgroundColor: theme.palette.primary.Appar2, display: "flex", flexDirection: "column" }}>
          <CardMedia component="img" image={data.image_url || data.image} alt={data.title} sx={{ height: { xs: 220, sm: 350 }, objectFit: "cover" }} />
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ color: theme.palette.primary.text5, fontSize: "20px", mb: 1 }}>
              {data.created_at ? new Date(data.created_at).toLocaleDateString('ar-EG') : ""}
            </Typography>
            <Typography sx={{ color: theme.palette.primary.text3, fontSize: { xs: "18px", md: "22px" }, fontWeight: 700, mb: 2 }}>
              {data.title}
            </Typography>
            <Typography sx={{ color: theme.palette.primary.text6, fontSize: { xs: "14px", md: "16px" }, fontWeight: 500, lineHeight: 1.8, mb: 2 }}>
              {data.description}
            </Typography>

            {/* الأزرار */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3, borderTop: "1px solid rgba(0,0,0,0.05)", pt: 2 }}>
              <Button
                onClick={() => setOpendelet(true)} // فتح مودال الحذف محلياً
                startIcon={<DeleteOutlineOutlinedIcon sx={{ ml: 1 }} />}
                sx={{ p: 0, minWidth: "auto", background: "transparent", color: red1, fontWeight: 500 }}
              >
                حذف
              </Button>
              <Button
                onClick={() => setOpenEdit(true)} // فتح مودال التعديل محلياً
                startIcon={<EditOutlinedIcon sx={{ ml: 1 }} />}
                sx={{ p: 0, minWidth: "auto", background: "transparent", color: theme.palette.primary.text3, fontWeight: 500 }}
              >
                تعديل
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* النوافذ المنبثقة مدعومة محلياً هنا في صفحة التفاصيل */}
      <Suspense fallback={null}>
        {opendelet && <DeletNews open={opendelet} onClose={() => setOpendelet(false)} selectedCard={data} onSuccess={() => { setOpendelet(false); navigate("/News"); handleSuccess(); }} />}
        {openEdit && <EditNews open={openEdit} onClose={() => setOpenEdit(false)} selectedCard={data} onSuccess={handleSuccess} />}
      </Suspense>
    </Box>
  );
}