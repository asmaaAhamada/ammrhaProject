import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useSelector, useDispatch } from "react-redux";
import { Add_Department, resetForm, setformInfo } from "../../../backend/slice/department/add";

export default function AddSection({ open, onClose, onSuccess }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // مرجع للتحكم بحقل الملفات برمجياً
  
  const { formInfo, isLoading, error, success } = useSelector((state) => state.Add_Department);

  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
  if (success) {
    setShowSuccess(true);

    const timer = setTimeout(() => {
      setShowSuccess(false);
      dispatch(resetForm());
      setImagePreview(null);

      if (typeof onSuccess === "function") onSuccess(); // 👈 مهم
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [success, dispatch, onClose, onSuccess]);

  // تنظيف الروابط المؤقتة لمنع تسريب الذاكرة (Memory Leak)
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handlAdd_Department = () => {
    if (!formInfo.name.trim()) {
      alert("الرجاء إدخال اسم القسم أولاً");
      return;
    }
    dispatch(Add_Department());
  };

  // التقاط الملف بشكل آمن وصحيح
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // حفظ كائن الـ File الفعلي في Redux ليرسله Thunk داخل FormData
      dispatch(setformInfo({ image: file })); 
      
      // إنشاء رابط عرض محلي للمعاينة فقط
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // إزالة الصورة وتصفير الحقل تماماً
  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation(); // منع فتح نافذة اختيار الملفات عند الضغط على زر الحذف
    dispatch(setformInfo({ image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // تصفير قيمة الـ input الفعلي
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";
  const topFieldWidth = isMobile ? "100%" : "231px";

  const handleIncrement = () => {
    const currentVal = parseInt(formInfo.max_volunteers, 10) || 0;
    dispatch(setformInfo({ max_volunteers: currentVal + 1 }));
  };

  const handleDecrement = () => {
    const currentVal = parseInt(formInfo.max_volunteers, 10) || 0;
    dispatch(setformInfo({ max_volunteers: currentVal > 0 ? currentVal - 1 : 0 }));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setformInfo({ max_volunteers: isNaN(value) ? 0 : value }));
  };

  return (
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
      {/* العنوان الرئيسي */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: 2,
          textAlign: "right",
        }}
      >
        إضافة قسم جديد
      </Typography>

      {/* حقل الاسم */}
      <Box sx={{ width: topFieldWidth, mb: 2 }}>
        <Typography
          sx={{
            fontSize: "13px",
            mb: 1,
            color: theme.palette.primary.text4,
            textAlign: "right",
          }}
        >
          الاسم
        </Typography>

        <TextField
          placeholder="ادخل اسم القسم"
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
      <Typography
        sx={{
          fontSize: "13px",
          mb: 1,
          color: theme.palette.primary.text4,
          textAlign: "right",
        }}
      >
        الصورة
      </Typography>

      {/* حقل رفع الملفات المخفي */}
      <input 
        type="file" 
        accept="image/*" 
        hidden 
        ref={fileInputRef}
        onChange={handleImageChange} 
        id="contained-button-file"
      />

      <label htmlFor="contained-button-file" style={{ width: '100%' }}>
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
                  position: "absolute", 
                  top: 8, 
                  left: 8, 
                  backgroundColor: "rgba(0,0,0,0.6)", 
                  color: "#fff", 
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } 
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: "13px", mb: 1 }}>
                انقر لإضافة صورة للقسم
              </Typography>
              <UploadIcon />
            </>
          )}
        </Box>
      </label>

      {/* العدد الأقصى للمتطوعين */}
      <Box sx={{ width: fieldWidth, mb: 3 }}>
        <Typography
          sx={{
            fontSize: "13px",
            mb: 1,
            color: theme.palette.primary.text4,
            textAlign: "right",
          }}
        >
          العدد الأقصى للمتطوعين
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.primary.inputt,
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <IconButton 
            onClick={handleDecrement} 
            sx={{ color: theme.palette.primary.text3, p: 1.5 }}
          >
            <RemoveIcon />
          </IconButton>

          <TextField
            type="number"
            value={formInfo.max_volunteers}
            onChange={handleInputChange}
            placeholder="0"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            inputProps={{
              style: {
                textAlign: "center",
                color: theme.palette.primary.text7,
                fontSize: "16px",
                fontWeight: 600,
              },
            }}
            sx={{
              flex: 1,
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
            }}
          />

          <IconButton 
            onClick={handleIncrement} 
            sx={{ color: theme.palette.primary.text3, p: 1.5 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* عرض رسالة الخطأ بشكل واضح إذا رفض الـ Backend الطلب */}
      {error && (
        <Typography sx={{ color: "error.main", mb: 2, fontSize: "14px", fontWeight: 500, textAlign: 'right' }}>
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </Typography>
      )}

      {/* رسالة النجاح */}
      {showSuccess && (
        <Typography sx={{ color: "success.main", mb: 2, fontSize: "14px", fontWeight: 600, textAlign: 'right' }}>
          تم إضافة القسم بنجاح!
        </Typography>
      )}

      {/* الأزرار */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Button
          onClick={handlAdd_Department}
          variant="contained"
          disabled={isLoading}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
          }}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: white }} /> : "إضافة"}
        </Button>

        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            border: "1px solid #ccc",
            color: theme.palette.primary.text3,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
          }}
        >
          إلغاء
        </Button>
      </Box>
    </Dialog>
  );
}