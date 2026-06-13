// deletnew.jsx
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
import { deletAnnouncement } from "../../../backend/slice/announcement/delet";
import { useDispatch, useSelector } from "react-redux";

export default function DeletNews({ open, onClose, selectedCard, onSuccess }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // لتوحيد المسميات وضمان التوافق مع البيانات الممررة من الصفحة الأساسية
  const selectedData = selectedCard;

  // جلب حالة التحميل والخطأ من السلايس الخاص بحذف الخبر
  const { isLoading, error } = useSelector((state) => state.deletAnnouncement);

  const handleDelete = () => {
    if (!selectedData?.id) return;

    dispatch(deletAnnouncement(selectedData.id))
      .unwrap()
      .then(() => {
        // تنفيذ الـ Refresh في الصفحة الأساسية مباشرة فور النجاح لإخفاء الكارد
        if (typeof onSuccess === "function") onSuccess();
        // إغلاق المودال
        if (typeof onClose === "function") onClose();
      })
      .catch((err) => {
        console.error("فشلت عملية حذف الخبر:", err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* عنوان النافذة */}
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          color: theme.palette.text.textc,
          direction: "rtl",
          fontSize: "22px",
          fontWeight: "700",
          backgroundColor: theme.palette.primary.Appar2,
        }}
      >
        هل ترغب حقاً بحذف هذا الخبر؟
      </DialogTitle>

      {/* محتوى النافذة النصي المتناسق */}
      <DialogContent sx={{ backgroundColor: theme.palette.primary.Appar2 }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: theme.palette.primary.Appar2,
            color: theme.palette.primary.text6,
            direction: "rtl",
            lineHeight: "1.6"
          }}
        >
          {selectedData?.title ? (
            <span>
              سيتم حذف الخبر:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {selectedData.title}
              </span>
              . لن تستطيع التراجع إذا قمت بالضغط على تأكيد الحذف.
            </span>
          ) : (
            "لن تستطيع التراجع إذا قمت بالضغط على تأكيد الحذف."
          )}
        </DialogContentText>

        {/* عرض رسالة الخطأ في حال فشل السيرفر في تنفيذ العملية */}
        {error && (
          <DialogContentText color="error" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold", direction: "rtl" }}>
            حدث خطأ: {typeof error === "string" ? error : "فشلت عملية الحذف من الخادم"}
          </DialogContentText>
        )}
      </DialogContent>

      {/* أزرار التحكم مصفوفة جهة اليمين (RTL) بشكل مثالي */}
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
          onClick={handleDelete}
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
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "تأكيد الحذف"}
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