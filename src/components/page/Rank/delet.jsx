import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from "@mui/material";
import { red, red1, red2 } from "../../../style/color-main/color";
import { useTheme } from "@mui/material/styles";
import { deletCriteria } from "../../../backend/slice/Criteria/delet";
import { useDispatch, useSelector } from "react-redux";
import { deletRanks } from "../../../backend/slice/Ranks/delet";

export default function DeletRankModal({ open, onClose, selectedData, onSuccess }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // جلب حالة التحميل والخطأ من السلايس
  const { isLoading, error } = useSelector((state) => state.deletRanks);

  const handleDelete = () => {
    if (!selectedData?.id) return;

    dispatch(deletRanks(selectedData.id))
      .unwrap()
      .then(() => {
        // تنفيذ الـ Refresh في الصفحة الأساسية مباشرة فور النجاح
        if (typeof onSuccess === "function") onSuccess();
        // إغلاق المودال
        if (typeof onClose === "function") onClose();
      })
      .catch((err) => {
        console.error("فشلت عملية الحذف:", err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
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
        هل ترغب حقاً بحذف هذا المعيار؟
      </DialogTitle>

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
          {selectedData?.name ? (
            <span>
              سيتم حذف المعيار:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {selectedData.name}
              </span>
              . لن تستطيع التراجع إذا قمت بالضغط على موافق.
            </span>
          ) : (
            "لن تستطيع التراجع إذا قمت بالضغط على موافق."
          )}
        </DialogContentText>

        {/* عرض رسالة الخطأ إذا فشل السيرفر في الحذف */}
        {error && (
          <DialogContentText color="error" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold", direction: "rtl" }}>
            حدث خطأ: {error}
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