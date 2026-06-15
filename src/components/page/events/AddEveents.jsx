import React, { useState, useRef, useEffect } from "react";
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
  IconButton,
  Grid
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

export default function AddEventModal({ open, onClose }) {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // حالة محليّة لتخزين المدخلات مؤقتاً من أجل التصميم والمعاينة
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    status: "upcoming",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    volunteersCount: "",
    mediaCount: "",
    logisticCount: "",
    description: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  // تحديث الحقول نصياً
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // معالجة اختيار الصورة للمعاينة فقط
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // تنظيف الذاكرة عند إغلاق المودال
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleClearAndClose = () => {
    setFormData({
      name: "",
      department: "",
      status: "upcoming",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      volunteersCount: "",
      mediaCount: "",
      logisticCount: "",
      description: ""
    });
    setImagePreview(null);
    onClose();
  };

  // التنسيق الموحد للمداخل (الألوان والحدود متطابقة مع الهوية البصرية)
  const inputStyleProps = {
    style: { 
      textAlign: "right", 
      backgroundColor: theme.palette.primary.inputt, 
      color: theme.palette.primary.text7, 
      borderRadius: "8px" 
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClearAndClose} 
      fullWidth 
      maxWidth="md" 
      PaperProps={{ 
        sx: { 
          backgroundColor: theme.palette.primary.imagecard1, 
          borderRadius: "16px", 
          p: isMobile ? 2 : 4, 
          direction: "rtl" 
        } 
      }}
    >
      {/* عنوان الواجهة */}
      <Typography sx={{ fontSize: "20px", fontWeight: 700, color: theme.palette.primary.text3, mb: 3, textAlign: "right" }}>
        إنشاء فعالية جديدة
      </Typography>

      {/* شبكة توزيع الحقول - حقلين بجانب بعضهما على اللابتوب */}
      <Grid container spacing={2.5}>
        
        {/* اسم الفعالية */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            اسم الفعالية
          </Typography>
          <TextField 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="مثال: حفلة تشجير مدرسة" 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* القسم المسؤول */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            القسم
          </Typography>
          <FormControl fullWidth>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: theme.palette.primary.inputt, color: theme.palette.primary.text7, borderRadius: "8px" }}
              renderValue={(selected) => {
                if (!selected) return <span style={{ color: '#aaa' }}>اختر القسم التابع له الفعالية</span>;
                return selected;
              }}
            >
              {/* خيارات تجريبية للتصميم فقط حالياً */}
              <MenuItem value="قسم البرمجيات">قسم البرمجيات</MenuItem>
              <MenuItem value="قسم التصميم">قسم التصميم</MenuItem>
              <MenuItem value="قسم العلاقات العامة">قسم العلاقات العامة</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* نوع الفعالية أو الحالة */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            نوع الفعالية
          </Typography>
          <FormControl fullWidth>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              sx={{ backgroundColor: theme.palette.primary.inputt, color: theme.palette.primary.text7, borderRadius: "8px" }}
            >
              <MenuItem value="upcoming">عادية / قادمة</MenuItem>
              <MenuItem value="active">نشطة حالياً</MenuItem>
              <MenuItem value="completed">منتهية</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* المكان */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            المكان
          </Typography>
          <TextField 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="مثال: صحنايا" 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* التاريخ */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            التاريخ
          </Typography>
          <TextField 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* وقت البدء */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            وقت البدء
          </Typography>
          <TextField 
            type="time" 
            name="startTime" 
            value={formData.startTime} 
            onChange={handleChange} 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* وقت النهاية */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            وقت النهاية
          </Typography>
          <TextField 
            type="time" 
            name="endTime" 
            value={formData.endTime} 
            onChange={handleChange} 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* العدد الأعظمي للمتطوعين */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            العدد الأعظمي للمتطوعين
          </Typography>
          <TextField 
            type="number" 
            name="volunteersCount" 
            value={formData.volunteersCount} 
            onChange={handleChange} 
            placeholder="50" 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* عدد الإعلاميين */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            عدد الإعلاميين
          </Typography>
          <TextField 
            type="number" 
            name="mediaCount" 
            value={formData.mediaCount} 
            onChange={handleChange} 
            placeholder="2" 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* عدد اللوجستيين */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            عدد اللوجستيين
          </Typography>
          <TextField 
            type="number" 
            name="logisticCount" 
            value={formData.logisticCount} 
            onChange={handleChange} 
            placeholder="0" 
            fullWidth 
            inputProps={inputStyleProps} 
          />
        </Grid>

        {/* مساحة رفع الصورة (تطابق الهيكل والارتفاع المعتمد بالخبر) */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            إضافة صورة للفعالية
          </Typography>
          <input 
            type="file" 
            accept="image/*" 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            id="event-visual-upload" 
          />
          <label htmlFor="event-visual-upload" style={{ width: "100%" }}>
            <Box 
              sx={{ 
                backgroundColor: theme.palette.primary.inputt, 
                color: theme.palette.primary.text7, 
                width: "100%", 
                height: "140px", 
                border: "1px dashed #ccc", 
                borderRadius: "12px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                cursor: "pointer", 
                position: "relative", 
                overflow: "hidden" 
              }}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <IconButton 
                    onClick={handleRemoveImage} 
                    sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "rgba(0,0,0,0.6)", color: white, "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography sx={{ fontSize: "13px", mb: 0.5 }}>انقر لإضافة صورة الفعالية</Typography>
                  <UploadIcon sx={{ color: theme.palette.primary.text4 }} />
                </>
              )}
            </Box>
          </label>
        </Grid>

        {/* وصف الفعالية */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            الوصف
          </Typography>
          <TextField 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="وصف الفعالية..." 
            multiline 
            rows={3} 
            fullWidth 
            sx={{ backgroundColor: theme.palette.primary.inputt }} 
            inputProps={{ style: { textAlign: "right", color: theme.palette.primary.text7 } }} 
          />
        </Grid>
      </Grid>

      {/* أزرار التحكم السفلية */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 4, flexDirection: isMobile ? "column" : "row" }}>
        <Button 
          onClick={() => console.log("بيانات النموذج للتأكد من الواجهة:", formData)} 
          variant="contained" 
          sx={{ 
            width: isMobile ? "100%" : "140px", 
            height: "43px", 
            backgroundColor: theme.palette.primary.button1, 
            color: white, 
            fontWeight: 600, 
            textTransform: "none", 
            borderRadius: "12px", 
            "&:hover": { backgroundColor: "#162d6b" } 
          }}
        >
          إنشاء الفعالية
        </Button>
        <Button 
          onClick={handleClearAndClose} 
          sx={{ 
            width: isMobile ? "100%" : "106px", 
            height: "43px", 
            border: "1px solid #ccc", 
            color: theme.palette.primary.text3, 
            fontWeight: 600, 
            textTransform: "none", 
            borderRadius: "12px" 
          }}
        >
          إلغاء
        </Button>
      </Box>
    </Dialog>
  );
}