import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setformInfo, Add_Ranks } from "../../../backend/slice/Ranks/add";

// دالة الحركة الانزلاقية من الأعلى للأسفل
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const AddRankModal = ({ open, onClose, onSuccess }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات وحالة التحميل والخطأ من ستور الإضافة
  const { formInfo, isLoading, error } = useSelector((state) => state.Add_Ranks);

  // حالة التحكم بالـ Toast العلوي
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  // تنظيف الحقول وإعادتها فارغة فور إغلاق المودال أو فتحه مجدداً
  useEffect(() => {
    if (!open) {
      dispatch(resetForm());
    }
  }, [open, dispatch]);

  // مراقبة حالة الخطأ القادمة من السيرفر بشكل مباشر
  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء إضافة المعيار!",
        severity: "error",
      });
    }
  }, [error]);

  // تحديث بيانات الستور عند الكتابة داخل الحقول
  const handleChange = (key, value) => {
    dispatch(setformInfo({ [key]: value }));
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === 'error') {
      dispatch(resetForm()); // تصفير الخطأ عند إغلاق التنبيه يدوياً
    }
  };

  const handleSubmit = () => {
    // تحديث التحقق ليتوافق مع أسماء الحقول الجديدة min_points و min_hours
    if (!formInfo.name.trim() || !formInfo.min_points.toString().trim() || !formInfo.min_hours.toString().trim()) {
      setToast({
        open: true,
        message: "الرجاء ملء جميع الحقول المطلوبة أولاً",
        severity: "error",
      });
      return;
    }

    // 👈 تم تعديل اسم الدالة هنا إلى الـ Thunk الصحيح Add_Ranks
    dispatch(Add_Ranks())
      .unwrap()
      .then(() => {
        setToast({
          open: true,
          message: "تم إضافة الرتبة بنجاح!",
          severity: "success",
        });

        setTimeout(() => {
          if (typeof onSuccess === "function") onSuccess(); 
          if (typeof onClose === "function") onClose();       
        }, 1500);
      })
      .catch((err) => {
        console.error("فشلت عملية الإضافة:", err);
      });
  };

  // التحقق من صحة المدخلات لتفعيل زر الإضافة
  const isFormValid = formInfo.name?.trim() && formInfo.min_points?.toString().trim() && formInfo.min_hours?.toString().trim();

  return (
    <>
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
            '& .MuiAlert-icon': {
              marginLeft: '12px',
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
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.imagecard1,
            color: theme.palette.primary.text3,
            borderRadius: "12px",
            p: 1,
            direction: "rtl" 
          },
        }}
      >
        <DialogTitle
          sx={{
            color: theme.palette.primary.text3,
            textAlign: "right",
            fontWeight: 700,
            position: "relative",
            pt: 2
          }}
        >
          إضافة رتبة جديدة

          <IconButton
            onClick={onClose}
            disabled={isLoading}
            sx={{
              position: "absolute",
              left: 8,
              top: 12,
              color: theme.palette.primary.text3,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* حقل اسم الرتبة */}
          <TextField
            fullWidth
            placeholder="ادخل اسم الرتبة"
            value={formInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            margin="normal"
            disabled={isLoading}
            InputProps={{
              sx: {
                color: theme.palette.primary.text7,
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px",
              },
            }}
            inputProps={{
              style: {
                textAlign: "right",
              },
            }}
          />

          {/* حقل عدد النقاط */}
          <TextField
            fullWidth
            placeholder="عدد النقاط"
            value={formInfo.min_points}
            onChange={(e) => handleChange("min_points", e.target.value)}
            margin="normal"
            inputMode="numeric"
            disabled={isLoading}
            InputProps={{
              sx: {
                color: theme.palette.primary.text7,
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px",
              },
            }}
            inputProps={{
              style: {
                textAlign: "right",
              },
            }}
          />

          {/* حقل عدد الساعات */}
          <TextField
            fullWidth
            placeholder="عدد الساعات"
            value={formInfo.min_hours}
            onChange={(e) => handleChange("min_hours", e.target.value)}
            margin="normal"
            inputMode="numeric"
            disabled={isLoading}
            InputProps={{
              sx: {
                color: theme.palette.primary.text7,
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px",
              },
            }}
            inputProps={{
              style: {
                textAlign: "right",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid} // تم تعديل شرط التعطيل هنا
            sx={{
              mt: 3,
              py: 1.2,
              backgroundColor: theme.palette.primary.button1,
              color: white,
              fontWeight: 600,
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: theme.palette.primary.button1,
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "إضافة"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddRankModal;