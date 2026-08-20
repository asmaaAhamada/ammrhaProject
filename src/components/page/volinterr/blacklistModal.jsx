import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
  Slide
} from "@mui/material";
import { red2 } from "../../../style/color-main/color"; // استخدام لون البلاك ليست الأحمر
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Add_black_List, setformInfo, resetForm, clearError } from "../../../backend/slice/blakList/add";

// دالة الحركة الانزلاقية من الأعلى للأعضاء
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function AddBlack_ListModal({ open, onClose, selectedCard, onSuccess }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب البيانات، حالة اللودينغ، والخطأ مباشرة من السلايس
  const { isLoading, error, formInfo } = useSelector((state) => state.Add_black_List);

  // حالة التحكم بالـ Toast العلوي المتطابق مع هيكلية التجميد
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "error", // القيمة الافتراضية
  });

  // مراقبة حالة الخطأ القادمة من السيرفر بشكل مباشر لعرضها بالـ Toast
  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === "string" ? error : "فشلت عملية الحظر من الخادم",
        severity: "error",
      });
    }
  }, [error]);

  // عند إغلاق المودال أو فتحه، يتم تصفير الداتا لتجنب بقاء البيانات القديمة
  useEffect(() => {
    if (!open) {
      dispatch(resetForm());
    }
  }, [open, dispatch]);

  // عند فتح المودال والتأكد من وجود المتطوع المحدد، نقوم بتحديث الـ id بالـ Store
 useEffect(() => {
  if (open && selectedCard?.id) {
    dispatch(setformInfo({ 
      volunteer_id: selectedCard.id,
      type: "حظر" 
    }));
  }
}, [open, selectedCard, dispatch]);

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === "error") {
      dispatch(clearError()); // تنظيف الخطأ من الستور عند إغلاق التنبيه
    }
  };

  const handleConfirmBlock = () => {
    if (!selectedCard?.id) return;
    
    // التحقق من وجود سبب الحظر داخل الـ Store
    if (!formInfo?.reason?.trim()) {
      setToast({
        open: true,
        message: "الرجاء إدخال سبب الحظر أولاً",
        severity: "error",
      });
      return;
    }

    // إرسال الطلب عبر الـ Thunk
    dispatch(Add_black_List())
      .unwrap()
      .then((response) => {
        // عرض الرسالة الديناميكية الراجعة من الباك إند باللون الأحمر الخاص بالقائمة السوداء
        setToast({
          open: true,
          message: response?.message || "تم إرسال الطلب بنجاح بانتظار موافقة الإدارة",
          severity: "warning", // نستخدم warning مخصص أو نتركه يعتمد على الباك جراوند الممرر بالأسفل
        });

        // تأخير إغلاق المودال قليلاً ليرى المستخدم التنبيه بشكل مريح
        setTimeout(() => {
          if (typeof onSuccess === "function") onSuccess(); // تحديث داتا الجدول الرئيسي
          dispatch(resetForm()); // تفريغ حقول الفورم بالكامل وإرجاع السلايس للـ initialState
          if (typeof onClose === "function") onClose(); // إغلاق المودال
        }, 2000);
      })
      .catch((err) => {
        console.error("فشلت عملية إضافة المتطوع للقائمة السوداء:", err);
      });
  };

  const handleCancel = () => {
    dispatch(resetForm()); // تنظيف الداتا من الحقول تماماً عند التراجع
    if (typeof onClose === "function") onClose();
  };

  return (
    <>
      {/* التنبيه العلوي اللطيف (Toast) المتوافق مع اللون الأحمر والـ RTL والأنيميشن الانزلاقي */}
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
            // تلوين الخلفية باللون الأحمر الخاص بك في حال كانت العملية ناجحة لتتناسب مع ثيم الحظر
            backgroundColor: toast.severity === "warning" ? red2 : undefined,
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
        onClose={handleCancel}
        aria-labelledby="block-dialog-title"
        aria-describedby="block-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        {/* عنوان النافذة */}
        <DialogTitle
          id="block-dialog-title"
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
            id="block-dialog-description"
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
                <span style={{ color: red2, fontWeight: "bold" }}>
                  {selectedCard.full_name}
                </span>
                ؟ لن يتمكن من المشاركة في أي فعاليات مجدداً.
              </span>
            ) : (
              "هل أنت متأكد من رغبتك في حظر هذا المتطوع؟"
            )}
          </DialogContentText>

          {/* حقل إدخال سبب الحظر */}
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
        </DialogContent>

        {/* أزرار التحكم مصفوفة جهة اليمين بدعم الـ RTL */}
        <DialogActions
          sx={{
            backgroundColor: theme.palette.primary.Appar2,
            display: "flex",
            justify: "flex-start",
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
    </>
  );
}