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
import { red2 } from "../../../style/color-main/color";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Add_black_List, setformInfo, resetForm } from "../../../backend/slice/blakList/add";

export default function AddBlack_ListModal({ open, onClose, selectedCard, onSuccess }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب البيانات وحالة التحميل والخطأ مباشرة من السلايس الخاص بك
  const { isLoading, error, formInfo } = useSelector((state) => state.Add_black_List);

  const handleConfirmBlock = () => {
    if (!selectedCard?.id) return;
    
    // التحقق من وجود السبب من داخل الـ Redux Store
    if (!formInfo?.reason?.trim()) {
      alert("الرجاء إدخال سبب الحظر أولاً");
      return;
    }

    // إرسال الطلب (الـ Thunk يقرأ تلقائياً الـ volunteer_id والـ reason عبر getState)
    dispatch(Add_black_List())
      .unwrap()
      .then(() => {
        if (typeof onSuccess === "function") onSuccess();
        dispatch(resetForm()); // تنظيف الفورم وإعادة الـ Slice للحالة الابتدائية
        if (typeof onClose === "function") onClose();
      })
      .catch((err) => {
        console.error("فشلت عملية إضافة المتطوع للقائمة السوداء:", err);
      });
  };

  const handleCancel = () => {
    dispatch(resetForm()); // تنظيف الداتا عند التراجع لإفراغ الحقول
    if (typeof onClose === "function") onClose();
  };

  // عند فتح المودال والتأكد من وجود مصفوفة المتطوع المحدد، نقوم بتحديث الـ id بالـ Store
  React.useEffect(() => {
    if (open && selectedCard?.id) {
      dispatch(setformInfo({ volunteer_id: selectedCard.id }));
    }
  }, [open, selectedCard, dispatch]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      {/* عنوان النافذة */}
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          color: theme.palette.text.textc,
          direction: "rtl",
          fontSize: "20px",
          fontWeight: "700",
          backgroundColor: theme.palette.primary.Appar2,
        }}
      >
        إضافة المتطوع إلى القائمة السوداء
      </DialogTitle>

      {/* محتوى النافذة النصي */}
      <DialogContent sx={{ backgroundColor: theme.palette.primary.Appar2 }}>
        <DialogContentText
          id="alert-dialog-description"
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
              هل أنت متأكد من حظر المتطوع:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {selectedCard.full_name}
              </span>
              ؟ لن يتمكن من المشاركة في أي فعاليات مجدداً.
            </span>
          ) : (
            "هل أنت متأكد من رغبتك في حظر هذا المتطوع؟"
          )}
        </DialogContentText>

        {/* حقل إدخال سبب الحظر - مربوط بالـ Redux Store مباشرة */}
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="اكتب سبب الحظر هنا (مطلوب)..."
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
            حدث خطأ: {typeof error === "string" ? error : "فشلت عملية الحظر من الخادم"}
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
          onClick={handleConfirmBlock}
          disabled={isLoading}
          variant="contained"
          sx={{
            backgroundColor: red2,
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
            px: 3,
            borderRadius: "8px",
            "&:hover": { backgroundColor: red2 }
          }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : "تأكيد الحظر"}
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