import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { setformInfo, Add_Criteria, resetForm } from "../../../backend/slice/Criteria/Add"; // تأكدي من مسار مأخذ السلايس التابع للإضافة

const AddCriteriaModal = ({ open, onClose, onSuccess }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات وحالة التحميل والخطأ من ستور الإضافة الصحيح
  const { formInfo, isLoading, error } = useSelector((state) => state.Add_Criteria);

  // تنظيف الحقول وإعادتها فارغة فور إغلاق المودال أو فتحه مجدداً لكي لا تظهر البيانات القديمة
  useEffect(() => {
    if (!open) {
      dispatch(resetForm());
    }
  }, [open, dispatch]);

  // تحديث بيانات الستور عند الكتابة داخل الحقول
  const handleChange = (key, value) => {
    dispatch(setformInfo({ [key]: value }));
  };

  const handleSubmit = () => {
    // التحقق من أن الحقول ليست فارغة قبل الإرسال للسيرفر
    if (!formInfo.name.trim() || !formInfo.points.trim()) return;

    dispatch(Add_Criteria())
      .unwrap()
      .then(() => {
        if (typeof onSuccess === "function") onSuccess(); // تحديث فوري للجدول الرئيسي
        if (typeof onClose === "function") onClose();       // إغلاق المودال 
      })
      .catch((err) => {
        console.error("فشلت عملية الإضافة:", err);
      });
  };

  return (
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
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.palette.primary.text3,
          textAlign: "right",
          fontWeight: 700,
          position: "relative",
        }}
      >
        إضافة المعيار

        <IconButton
          onClick={onClose}
          disabled={isLoading}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.primary.text3,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* حقل اسم المعيار */}
        <TextField
          fullWidth
          placeholder="ادخل اسم المعيار"
          value={formInfo.name}
          onChange={(e) => handleChange("name", e.target.value)}
          margin="normal"
          disabled={isLoading}
          InputProps={{
            sx: {
              color: theme.palette.primary.text7,
              textAlign: "right",
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
          value={formInfo.points}
          onChange={(e) => handleChange("points", e.target.value)}
          margin="normal"
          inputMode="numeric"
          disabled={isLoading}
          InputProps={{
            sx: {
              color: theme.palette.primary.text7,
            },
          }}
          inputProps={{
            style: {
              textAlign: "right",
            },
          }}
        />

        {/* طباعة الخطأ في حال حدوث مشكلة من الباكيند */}
        {error && (
          <div style={{ color: "red", textAlign: "right", marginTop: "10px", fontWeight: "bold" }}>
            {error}
          </div>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading || !formInfo.name.trim() || !formInfo.points.trim()}
          sx={{
            mt: 3,
            py: 1.2,
            backgroundColor: theme.palette.primary.button1,
            color: white,
            "&:hover": {
              backgroundColor: theme.palette.primary.button1,
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "إضافة"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCriteriaModal;