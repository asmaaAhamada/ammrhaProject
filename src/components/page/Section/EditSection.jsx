import React, { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Slide
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

import { useDispatch, useSelector } from "react-redux";
import { Edit_Department, setformInfo, resetForm } from "../../../backend/slice/department/Edit";

// دالة الحركة الانزلاقية اللطيفة من الأعلى للأسفل
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function EditSection({ open, onClose, selectedCard, onSuccess }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { formInfo, isLoading, error, success } = useSelector((state) => state.Edit_Department);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";
  const topFieldWidth = isMobile ? "100%" : "231px";

  // حالة التحكم بإشعار التنبيه العلوي (Toast)
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' أو 'error'
  });

  // تعبئة البيانات بشكل صحيح بناءً على مسميات الباك-إند
  useEffect(() => {
    if (selectedCard) {
      dispatch(setformInfo({
        name: selectedCard.name || "",
        max_volunteers: selectedCard.max_volunteers || "", 
        image: selectedCard.image || null,
      }));
    }
  }, [selectedCard, dispatch]);

  // مراقبة حالة النجاح القادمة من الـ Redux
  useEffect(() => {
    if (success) {
      setToast({
        open: true,
        message: "تم تعديل القسم بنجاح!",
        severity: "success",
      });

      // ننتظر قليلاً ليرى المستخدم رسالة النجاح، ثم نغلق الـ Dialog ونحدث البيانات
      const timer = setTimeout(() => {
        if (onSuccess) onSuccess(); 
        onClose();
        dispatch(resetForm());
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, onClose, dispatch, onSuccess]);

  // مراقبة حالة الخطأ القادمة من الـ Redux
  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء حفظ التعديلات!",
        severity: "error",
      });
    }
  }, [error]);

  // دالة إغلاق الـ Toast
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === 'error') {
      dispatch(resetForm()); // تصفير الخطأ لتهيئة المكون للمرة القادمة
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setformInfo({ image: file }));
    }
  };

  const handleSave = () => {
    if (!formInfo.name.trim()) {
      setToast({
        open: true,
        message: "الرجاء إدخال عنوان القسم أولاً",
        severity: "error",
      });
      return;
    }
    if (selectedCard?.id) {
      dispatch(Edit_Department(selectedCard.id));
    }
  };

  return (
    <>
      {/* التنبيه العلوي اللطيف (Toast) المتوافق مع الثيم والـ RTL */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        sx={{ direction: "rtl" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled" // ألوان ممتلئة وواضحة مأخوذة مباشرة من ألوان الـ theme الأساسية
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", // تأثير ظل ناعم للطفو
            fontFamily: "inherit",
            '& .MuiAlert-icon': {
              marginLeft: '12px', // ضبط اتجاه الأيقونة ليتطابق مع الـ RTL
              marginRight: 0
            }
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.imagecard1,
            width: isMobile ? "95%" : "526px",
            borderRadius: "16px",
            p: isMobile ? 2 : 3,
            direction: "rtl",
          },
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 700, mb: 2, color: theme.palette.primary.text3 }}>
          تعديل قسم
        </Typography>

        {/* حقل الاسم */}
        <Box sx={{ width: topFieldWidth, mb: 2 }}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>
            العنوان
          </Typography>
          <TextField
            fullWidth
            value={formInfo.name}
            onChange={(e) => dispatch(setformInfo({ name: e.target.value }))}
            inputProps={{
              style: {
                textAlign: "right",
                backgroundColor: theme.palette.primary.inputt,
                color: theme.palette.primary.text7,
                borderRadius: "8px",
              },
            }}
          />
        </Box>

        {/* حقل الصورة */}
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>
          الصورة
        </Typography>
        <Box
          component="label"
          sx={{
            backgroundColor: theme.palette.primary.inputt,
            width: fieldWidth,
            height: isMobile ? "120px" : "160px",
            border: "1px dashed #ccc",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            mb: 2,
            overflow: "hidden",
          }}
        >
          <input 
            type="file" 
            accept="image/*" 
            hidden 
            onChange={handleImageChange} 
          />

          {formInfo.image ? (
            <img
              src={formInfo.image instanceof File ? URL.createObjectURL(formInfo.image) : formInfo.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Department"
            />
          ) : (
            <>
              <Typography sx={{ ml: 1 }}>انقر لإضافة صورة</Typography>
              <UploadIcon />
            </>
          )}
        </Box>

        {/* العدد الأقصى للمتطوعين */}
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>
          العدد (الحد الأقصى للمتطوعين)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={formInfo.max_volunteers}
          onChange={(e) => dispatch(setformInfo({ max_volunteers: e.target.value }))}
          sx={{ width: fieldWidth, mb: 3 }}
          inputProps={{
            style: {
              textAlign: "right",
              backgroundColor: theme.palette.primary.inputt,
              color: theme.palette.primary.text7,
              borderRadius: "8px",
            },
          }}
        />

        {/* أزرار التحكم */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isLoading}
            sx={{
              width: isMobile ? "100%" : "106px",
              height: "43px",
              backgroundColor: theme.palette.primary.button1,
              color: white,
              borderRadius: '12px',
              fontWeight: 600,
            }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: white }} /> : "حفظ"}
          </Button>

          <Button
            onClick={onClose}
            disabled={isLoading}
            sx={{
              width: isMobile ? "100%" : "106px",
              height: "43px",
              color: theme.palette.primary.text4,
              borderRadius: '12px',
              border: "1px solid #ccc",
              fontWeight: 600,
            }}
          >
            تراجع
          </Button>
        </Box>
      </Dialog>
    </>
  );
}