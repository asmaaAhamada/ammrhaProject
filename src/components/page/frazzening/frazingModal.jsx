import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  TextField
} from "@mui/material";
import { yallow } from "../../../style/color-main/color"; // استخدام لون التجميد الأصفر
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { volunteer_freeze, setformInfo, resetForm } from "../../../backend/slice/frazzring/add";

export default function Frezzen_Modal({ open, onClose, selectedCard, onSuccess }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب البيانات، حالة اللودينغ، والخطأ مباشرة من السلايس
  const { isLoading, error, formInfo } = useSelector((state) => state.volunteer_freeze);

  const handleConfirmFreeze = () => {
    if (!selectedCard?.id) return;
    
    // التحقق من وجود سبب التجميد داخل الـ Store
    if (!formInfo?.reason?.trim()) {
      alert("الرجاء إدخال سبب التجميد أولاً");
      return;
    }

    // إرسال الطلب عبر الـ Thunk
    dispatch(volunteer_freeze())
      .unwrap()
      .then(() => {
        if (typeof onSuccess === "function") onSuccess(); // تحديث داتا الجدول الرئيسي
        dispatch(resetForm()); // تفريغ حقول الفورم بالكامل وإرجاع السلايس للـ initialState
        if (typeof onClose === "function") onClose(); // إغلاق المودال
      })
      .catch((err) => {
        console.error("فشلت عملية تجميد حساب المتطوع:", err);
      });
  };

  const handleCancel = () => {
    dispatch(resetForm()); // تنظيف الداتا من الحقول تماماً عند التراجع
    if (typeof onClose === "function") onClose();
  };

  // عند فتح المودال والتأكد من وجود المتطوع المحدد، نقوم بتحديث الـ id بالـ Store
  React.useEffect(() => {
    if (open && selectedCard?.id) {
      dispatch(setformInfo({ volunteer_id: selectedCard.id }));
    }
  }, [open, selectedCard, dispatch]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="freeze-dialog-title"
      aria-describedby="freeze-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      {/* عنوان النافذة */}
      <DialogTitle
        id="freeze-dialog-title"
        sx={{
          color: theme.palette.text.textc,
          direction: "rtl",
          fontSize: "20px",
          fontWeight: "700",
          backgroundColor: theme.palette.primary.Appar2,
        }}
      >
        تجميد حساب المتطوع
      </DialogTitle>

      {/* محتوى النافذة النصي */}
      <DialogContent sx={{ backgroundColor: theme.palette.primary.Appar2 }}>
        <DialogContentText
          id="freeze-dialog-description"
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            color: theme.palette.primary.text6,
            direction: "rtl",
            lineHeight: "1.6",
            mb: 2
          }}
        >
          {selectedCard?.full_name ? (
            <span>
              هل أنت متأكد من تجميد المتطوع:{" "}
              <span style={{ color: yallow, fontWeight: "bold" }}>
                {selectedCard.full_name}
              </span>
              ؟ سيتم تعليق حساب نشاطه مؤقتاً في النظام.
            </span>
          ) : (
            "هل أنت متأكد من رغبتك في تجميد هذا المتطوع؟"
          )}
        </DialogContentText>

        {/* حقل إدخال سبب التجميد */}
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="اكتب سبب التجميد هنا (مطلوب)..."
          value={formInfo?.reason || ""}
          onChange={(e) => dispatch(setformInfo({ reason: e.target.value }))}
          disabled={isLoading}
          slotProps={{
            htmlInput: {
              style: { direction: "rtl", textAlign: "right" }
            }
          }}
          sx={{
            mt: 1,
            "& .MuiOutlinedInput-root": {
              color: theme.palette.primary.chip,
              backgroundColor: theme.palette.primary.logo,
              borderRadius: "8px",
            }
          }}
        />

        {/* عرض رسالة الخطأ القادمة من السيرفر إن وجدت */}
        {error && (
          <DialogContentText color="error" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold", direction: "rtl" }}>
            حدث خطأ: {typeof error === "string" ? error : "فشلت عملية التجميد من الخادم"}
          </DialogContentText>
        )}
      </DialogContent>

      {/* أزرار التحكم مصفوفة جهة اليمين بدعم الـ RTL */}
      <DialogActions
        sx={{
          backgroundColor: theme.palette.primary.Appar2,
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          px: 3,
          pb: 2
        }}
      >
        <Button
          onClick={handleConfirmFreeze}
          disabled={isLoading}
          variant="contained"
          sx={{
            backgroundColor: yallow,
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
            px: 3,
            borderRadius: "8px",
            "&:hover": { backgroundColor: yallow }
          }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : "تأكيد التجميد"}
        </Button>

        <Button
          onClick={handleCancel}
          disabled={isLoading}
          sx={{
            color: theme.palette.primary.text3,
            fontSize: "15px",
            fontWeight: "700",
          }}
        >
          تراجع
        </Button>
      </DialogActions>
    </Dialog>
  );
}