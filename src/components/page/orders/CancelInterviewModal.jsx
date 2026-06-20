import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from "@mui/material";
import { red2 } from "../../../style/color-main/color";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { cancelInterviewByHr } from "../../../backend/slice/volnteers/request/cancelHrSlice";

export default function CancelInterviewModal({ open, onClose, selectedInterview }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب حالة التحميل والخطأ من السلايس الخاص بإلغاء المقابلة
  const { isLoading, error } = useSelector((state) => state.cancelHr);

  const handleCancel = () => {
    if (!selectedInterview?.id) return;

    dispatch(cancelInterviewByHr(selectedInterview.id))
      .unwrap()
      .then(() => {
        if (typeof onClose === "function") onClose();
      })
      .catch((err) => {
        console.error("فشلت عملية إلغاء الموعد:", err);
      });
  };

  // دالة مساعدة لاستخراج الوقت فقط لعرضه في رسالة التأكيد
  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const parts = dateTimeStr.split(" ");
    return parts[1] || dateTimeStr;
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose} // منع إغلاق المودال أثناء المعالجة
      aria-labelledby="cancel-dialog-title"
      aria-describedby="cancel-dialog-description"
    >
      <DialogTitle
        id="cancel-dialog-title"
        sx={{
          color: theme.palette.text.textc,
          direction: "rtl",
          fontSize: "22px",
          fontWeight: "700",
          backgroundColor: theme.palette.primary.Appar2,
        }}
      >
        هل ترغب حقاً بإلغاء فترة المقابلة الشاغرة؟
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: theme.palette.primary.Appar2 }}>
        <DialogContentText
          id="cancel-dialog-description"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: theme.palette.primary.Appar2,
            color: theme.palette.primary.text6,
            direction: "rtl",
            lineHeight: "1.6",
            mt: 1
          }}
        >
          {selectedInterview?.interview_at ? (
            <span>
              سيتم إلغاء وحذف فترة المقابلة المحددة في الساعة:{" "}
              <span style={{ color: red2, fontWeight: "bold" }}>
                {formatTime(selectedInterview.interview_at)}
              </span>
              . لن تستطيع التراجع إذا قمت بالضغط على تأكيد الإلغاء.
            </span>
          ) : (
            "لن تستطيع التراجع إذا قمت بالضغط على تأكيد الإلغاء."
          )}
        </DialogContentText>

        {error && (
          <DialogContentText color="error" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold", direction: "rtl" }}>
            حدث خطأ: {typeof error === "string" ? error : "فشلت عملية الإلغاء من الخادم"}
          </DialogContentText>
        )}
      </DialogContent>

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
          onClick={handleCancel}
          disabled={isLoading}
          variant="contained"
          sx={{
            backgroundColor: red2,
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            "&:hover": { backgroundColor: red2 }
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "تأكيد الإلغاء"}
        </Button>

        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            color: theme.palette.primary.text3,
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          تراجع
        </Button>
      </DialogActions>
    </Dialog>
  );
}