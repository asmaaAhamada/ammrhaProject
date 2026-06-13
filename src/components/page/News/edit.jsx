// EditNews.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Slide,
  IconButton
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setformInfo ,Update_Announcement } from "../../../backend/slice/announcement/Edit";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function EditNews({ open, onClose, selectedCard, onSuccess }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";
  const topFieldWidth = isMobile ? "100%" : "231px";

  // جلب بيانات التعديل من الريدوكس
  const { formInfo, isLoading, error, success } = useSelector((state) => state.Update_Announcement);
  
  // جلب حقول قائمة الأقسام لربطها بالسيلكت
  const { data: departmentsData } = useSelector((state) => state.fetchDepartment);
  const departmentsList = Array.isArray(departmentsData) ? departmentsData : departmentsData?.data || [];

  // حالة محلية لمعاينة الصورة (سواء كانت رابط من السيرفر أو ملف مرفوع جديد)
  const [imagePreview, setImagePreview] = useState(null);

  // نظام التنبيهات العلوي اللطيف (Toast)
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // 1. حشو البيانات المحددة فور فتح المودال وجلب قائمة الأقسام
  useEffect(() => {
    if (open) {
      dispatch(fetchDepartment());
    }
    if (open && selectedCard) {
      dispatch(setformInfo({
        id: selectedCard.id || "",
        title: selectedCard.title || "",
        description: selectedCard.description || "",
        department_id: selectedCard.departments?.[0]?.id || selectedCard.department_id || "",
        image: null // نتركها فارغة إلا لو قام المسؤول برفع ملف جديد
      }));
      
      // إعداد المعاينة البدئية إذا كان للخبر صورة مخزنة مسبقاً على السيرفر
      if (selectedCard.image) {
        setImagePreview(selectedCard.image);
      }
    }
  }, [open, selectedCard, dispatch]);

  // 2. مراقبة نجاح عملية التعديل
  useEffect(() => {
    if (success) {
      setToast({
        open: true,
        message: "تم تعديل الخبر بنجاح!",
        severity: "success",
      });

      const timer = setTimeout(() => {
        dispatch(resetForm());
        setImagePreview(null);
        if (typeof onSuccess === "function") onSuccess(); 
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, onClose, onSuccess]);

  // 3. مراقبة فشل عملية التعديل
  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء التعديل!",
        severity: "error",
      });
    }
  }, [error]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === 'error') {
      dispatch(resetForm());
    }
  };

  // تنظيف الروابط المحلية المؤقتة
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // معالجة تغيير حقول النصوص والسيلكت داخل الريدوكس مباشرة
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setformInfo({ [name]: value }));
  };

  // تغيير الصورة ومعاينتها محلياً
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setformInfo({ image: file })); 
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // حذف المعاينة الحالية وتصفيرها
  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    dispatch(setformInfo({ image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  const handleSubmit = () => {
    if (!formInfo.title.trim()) {
      setToast({ open: true, message: "الرجاء إدخال العنوان أولاً", severity: "error" });
      return;
    }
    dispatch(Update_Announcement());
  };

  return (
    <>
      {/* التنبيه اللطيف العلوي المتطابق */}
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
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            fontFamily: "inherit",
            '& .MuiAlert-icon': { marginLeft: '12px', marginRight: 0 }
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
          تعديل خبر
        </Typography>

        {/* حقل العنوان وحقل القسم المنسدل */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row", mb: 2 }}>
          {/* حقل العنوان */}
          <Box sx={{ width: topFieldWidth }}>
            <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>العنوان</Typography>
            <TextField
              fullWidth
              name="title"
              value={formInfo.title}
              onChange={handleInputChange}
              inputProps={{
                style: {
                  textAlign: "right",
                  backgroundColor: theme.palette.primary.inputt,
                  color: theme.palette.primary.text7,
                  borderRadius: "8px"
                },
              }}
            />
          </Box>

          {/* حقل القسم الديناميكي */}
          <Box sx={{ width: topFieldWidth }}>
            <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>القسم</Typography>
            <FormControl fullWidth>
              <Select
                name="department_id"
                value={formInfo.department_id}
                onChange={handleInputChange}
                sx={{ backgroundColor: theme.palette.primary.inputt, color: theme.palette.primary.text7 }}
              >
                {departmentsList.map((dept) => (
                  <MenuItem 
                    key={dept.id} 
                    sx={{ backgroundColor: theme.palette.primary.logo, color: theme.palette.primary.button3 }} 
                    value={dept.id}
                  >
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* رفع الصورة واختيار ملف جديد مع ميزة الحذف الذكي */}
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>الصورة</Typography>
        <input 
          type="file" 
          accept="image/*" 
          hidden 
          ref={fileInputRef}
          onChange={handleImageChange} 
          id="edit-button-file"
        />

        <label htmlFor="edit-button-file" style={{ width: '100%' }}>
          <Box
            component="span"
            sx={{
              backgroundColor: theme.palette.primary.inputt,
              color: theme.palette.primary.text7,
              width: fieldWidth,
              height: isMobile ? "120px" : "160px",
              border: "1px dashed #ccc",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              mb: 2,
              position: "relative",
              overflow: "hidden"
            }}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <IconButton 
                  onClick={handleRemoveImage}
                  sx={{ 
                    position: "absolute", top: 8, left: 8, 
                    backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", 
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } 
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: "13px", mb: 1 }}>انقر لتعديل صورة القسم</Typography>
                <UploadIcon />
              </>
            )}
          </Box>
        </label>

        {/* حقل المحتوى (الوصف) */}
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>المحتوى</Typography>
        <TextField
          multiline
          rows={isMobile ? 3 : 4}
          fullWidth
          name="description"
          value={formInfo.description}
          onChange={handleInputChange}
          sx={{ width: fieldWidth, mb: 3, backgroundColor: theme.palette.primary.inputt }}
          inputProps={{ style: { textAlign: "right", color: theme.palette.primary.text7 } }}
        />

        {/* أزرار التحكم والـ Loading */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading}
            sx={{
              width: isMobile ? "100%" : "106px",
              height: "43px",
              backgroundColor: theme.palette.primary.button1,
              color: white,
              borderRadius: '12px',
              fontWeight: 600
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
              fontWeight: 600
            }}
          >
            إلغاء
          </Button>
        </Box>
      </Dialog>
    </>
  );
}