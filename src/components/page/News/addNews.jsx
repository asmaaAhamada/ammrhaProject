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
  IconButton,
  Chip, // 👈 استيراد اختياري إذا رغبتِ بعرضها كبطاقات صغيرة
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { setformInfo, Add_Announcement, resetForm } from "../../../backend/slice/announcement/add";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function AddNews({ open, onClose, onSuccess }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { formInfo, isLoading, error, success } = useSelector((state) => state.Add_Announcement);
  const { data: departmentsData, isLoading: isDepartmentsLoading } = useSelector((state) => state.fetchDepartment);
  const departmentsList = Array.isArray(departmentsData) ? departmentsData : departmentsData?.data || [];

  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (open) {
      dispatch(fetchDepartment());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (success) {
      setToast({ open: true, message: "تم إضافة الخبر بنجاح!", severity: "success" });
      const timer = setTimeout(() => {
        dispatch(resetForm());
        setImagePreview(null);
        if (typeof onSuccess === "function") onSuccess();
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, onClose, onSuccess]);

  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === "string" ? error : "حدث خطأ ما أثناء إضافة الخبر!",
        severity: "error",
      });
    }
  }, [error]);

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === "error") {
      dispatch(resetForm());
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";
  const topFieldWidth = isMobile ? "100%" : "231px";

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setformInfo({ [name]: value }));
  };

  // دالة مخصصة لمعالجة اختيار الأقسام المتعددة وتخزينها كمصفوفة
  const handleDepartmentChange = (event) => {
    const { value } = event.target;
    // الـ value ستأتي تلقائياً كمصفوفة بسبب خاصية multiple
    dispatch(setformInfo({ department_ids: typeof value === 'string' ? value.split(',') : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setformInfo({ image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setformInfo({ image: null }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!formInfo.title.trim()) {
      setToast({ open: true, message: "الرجاء إدخال عنوان الخبر أولاً", severity: "error" });
      return;
    }
    // 👈 التحقق من أن مصفوفة الأقسام ليست فارغة
    if (!formInfo.department_ids || formInfo.department_ids.length === 0) {
      setToast({ open: true, message: "الرجاء اختيار قسم واحد على الأقل موجه له الخبر", severity: "error" });
      return;
    }
    dispatch(Add_Announcement());
  };

  const handleCancel = () => {
    dispatch(resetForm());
    setImagePreview(null);
    onClose();
  };

  return (
    <>
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={handleCloseToast} anchorOrigin={{ vertical: "top", horizontal: "center" }} TransitionComponent={TransitionDown} sx={{ direction: "rtl" }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: "100%", borderRadius: "12px", fontSize: "14px", fontWeight: 600, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", fontFamily: "inherit", "& .MuiAlert-icon": { marginLeft: "12px", marginRight: 0 } }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm" PaperProps={{ sx: { backgroundColor: theme.palette.primary.imagecard1, width: isMobile ? "95%" : "526px", borderRadius: "16px", p: isMobile ? 2 : 3, direction: "rtl" } }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 700, color: theme.palette.primary.text3, mb: 2, textAlign: "right" }}>
          إضافة خبر
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row", mb: 2 }}>
          {/* حقل العنوان */}
          <Box sx={{ width: topFieldWidth }}>
            <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
              العنوان
            </Typography>
            <TextField name="title" value={formInfo.title} onChange={handleChange} placeholder="ادخل اسم الخبر" fullWidth inputProps={{ style: { textAlign: "right", backgroundColor: theme.palette.primary.inputt, color: theme.palette.primary.text7 } }} />
          </Box>

          {/* حقل الأقسام المتعددة */}
          <Box sx={{ width: topFieldWidth }}>
            <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
              الأقسام الموجه لها
            </Typography>
            <FormControl fullWidth>
              <Select
                name="department_ids"
                multiple // 👈 تفعيل الاختيار المتعدد
                value={formInfo.department_ids || []} // 👈 يجب أن تبدأ بمصفوفة فارغة
                onChange={handleDepartmentChange}
                sx={{ backgroundColor: theme.palette.primary.inputt, color: theme.palette.primary.text7 }}
                displayEmpty
                // 👈 دالة لعرض أسماء الأقسام المختارة داخل الحقل بشكل جميل ومقروء
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span style={{ color: '#aaa' }}>اختر الأقسام</span>;
                  }
                  // تحويل كود القسم إلى اسمه الحقيقي المعروض للمستخدم
                  return selected
                    .map((id) => departmentsList.find((d) => d.id === id)?.name)
                    .filter(Boolean)
                    .join(" ، ");
                }}
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

        {/* الصورة */}
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
          الصورة
        </Typography>
        <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} id="news-image-upload" />
        <label htmlFor="news-image-upload" style={{ width: "100%" }}>
          <Box component="span" sx={{ backgroundColor: theme.palette.primary.inputt, color: theme.palette.primary.text7, width: fieldWidth, height: isMobile ? "120px" : "160px", border: "1px dashed #ccc", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", mb: 2, position: "relative", overflow: "hidden" }}>
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <IconButton onClick={handleRemoveImage} sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } }}>
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: "13px", mb: 1 }}>انقر لإضافة صورة</Typography>
                <UploadIcon />
              </>
            )}
          </Box>
        </label>

        {/* المحتوى */}
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
          المحتوى
        </Typography>
        <TextField name="description" value={formInfo.description} onChange={handleChange} placeholder="اكتب محتوى الخبر" multiline rows={isMobile ? 3 : 4} fullWidth sx={{ width: fieldWidth, mb: 3, backgroundColor: theme.palette.primary.inputt }} inputProps={{ style: { textAlign: "right", color: theme.palette.primary.text7 } }} />

        {/* الأزرار */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          <Button onClick={handleSubmit} variant="contained" disabled={isLoading} sx={{ width: isMobile ? "100%" : "106px", height: "43px", backgroundColor: theme.palette.primary.button1, color: white, fontWeight: 600, textTransform: "none", borderRadius: "12px", "&:hover": { backgroundColor: "#162d6b" } }}>
            {isLoading ? <CircularProgress size={24} sx={{ color: white }} /> : "إضافة"}
          </Button>
          <Button onClick={handleCancel} disabled={isLoading} sx={{ width: isMobile ? "100%" : "106px", height: "43px", border: "1px solid #ccc", color: theme.palette.primary.text3, fontWeight: 600, textTransform: "none", borderRadius: "12px" }}>
            إلغاء
          </Button>
        </Box>
      </Dialog>
    </>
  );
}