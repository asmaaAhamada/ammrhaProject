import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../backend/slice/auth/logout";

export default function Log_outModal({ open, onClose }) {
  const { isLoading, error } = useSelector((state) => state.Log_out || { isLoading: false, error: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    dispatch(Logout())
      .unwrap()
      .then(() => {
        setSuccessMessage("تم تسجيل الخروج بنجاح ✔");
        // ننتظر ثانية واحدة ليرى المستخدم رسالة النجاح ثم نوجهه
        setTimeout(() => {
          onClose();
          navigate("/login", { replace: true });
        }, 1200);
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <>
      {/* عرض رسالة الخطأ بشكل منبثق لطيف فوق المودال */}
      {error && (
        <Box
          sx={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "red",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            zIndex: 2100,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {error}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={isLoading ? null : onClose} // منع إغلاق المودال بالخطأ أثناء التحميل
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { direction: "rtl", p: 1 } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: "rgb(14,74,35)", fontSize: "20px", fontWeight: "700", textAlign: "right" }}
        >
          هل ترغب حقاً بتسجيل الخروج؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "16px", fontWeight: "500", textAlign: "right" }}
          >
            لن تستطيع التراجع إذا قمت بالضغط على موافق.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", gap: 1, px: 3, pb: 2 }}>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            sx={{ color: "red", fontSize: "16px", fontWeight: "700" }}
          >
            {isLoading ? <CircularProgress size={24} color="error" /> : "موافق"}
          </Button>
          <Button
            onClick={onClose}
            disabled={isLoading}
            sx={{
              color: "rgb(14,74,35)",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            تراجع
          </Button>
        </DialogActions>
      </Dialog>

      {/* رسالة النجاح */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 2200 }}
      >
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}