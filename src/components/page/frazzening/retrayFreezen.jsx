import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Slide
} from "@mui/material";
import { red2 } from "../../../style/color-main/color";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Deletvolunteer_freeze, resetDetails } from "../../../backend/slice/frazzring/delet";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function DeletList({ open, onClose, selectedCard, onSuccess }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedData = selectedCard;

  // جلب حالة التحميل والخطأ من السلايس الخاص بإلغاء التجميد
  const { isLoading, error } = useSelector((state) => state.Deletvolunteer_freeze);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  // تصفير ستيت الخطأ والداتا داخل الـ Slice عند إغلاق أو فتح المودال
  useEffect(() => {
    if (!open) {
      dispatch(resetDetails());
    }
  }, [open, dispatch]);

  // مراقبة الأخطاء القادمة من السيرفر وعرضها في الـ Toast تلقائياً
  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === "string" ? error : "حدث خطأ ما أثناء إلغاء التجميد!",
        severity: "error",
      });
    }
  }, [error]);

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === "error") {
      dispatch(resetDetails());
    }
  };

  const handleCancelBlock = () => {
    if (!selectedData?.id) return;

    dispatch(Deletvolunteer_freeze(selectedData.id))
      .unwrap()
      .then(() => {
        setToast({
          open: true,
          message: "تم إلغاء تجميد المتطوع بنجاح وإزالته من القائمة!",
          severity: "success",
        });

        // انتظار انتهاء ظهور الـ Toast ثم إغلاق المودال وتحديث الجدول
        setTimeout(() => {
          if (typeof onSuccess === "function") onSuccess();
          if (typeof onClose === "function") onClose();
        }, 1500);
      })
      .catch((err) => {
        console.error("فشلت عملية إلغاء تجميد المتطوع:", err);
      });
  };

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
            "& .MuiAlert-icon": {
              marginLeft: "12px",
              marginRight: 0,
            },
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
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
          إلغاء تجميد المتطوع
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: theme.palette.primary.Appar2 }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: "15px",
              fontWeight: "500",
              color: theme.palette.primary.text6,
              direction: "rtl",
              lineHeight: "1.6",
              mt: 1,
            }}
          >
            {selectedData?.volunteer_name ? (
              <span>
                هل أنت متأكد من إزالة المتطوع:{" "}
                <span style={{ color: red2, fontWeight: "bold" }}>
                  {selectedData.volunteer_name}
                </span>{" "}
                من الحسابات المجمدة؟ سيعود لامتلاك كافة صلاحياته السابقة.
              </span>
            ) : (
              "هل أنت متأكد من رغبتك في إلغاء تجميد هذا المتطوع؟"
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: theme.palette.primary.Appar2,
            display: "flex",
            justifyContent: "flex-start",
            gap: 1,
            px: 3,
            pb: 2,
          }}
        >
          <Button
            onClick={handleCancelBlock}
            disabled={isLoading}
            variant="contained"
            sx={{
              backgroundColor: red2,
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              px: 3,
              borderRadius: "8px",
              "&:hover": { backgroundColor: red2 },
            }}
          >
            {isLoading ? <CircularProgress size={22} color="inherit" /> : "تأكيد الإزالة"}
          </Button>

          <Button
            onClick={onClose}
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