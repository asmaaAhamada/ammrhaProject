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
  Box,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../backend/slice/auth/logout";
import { blue, blue1 } from "../../style/color-main/color";

export default function Log_outModal({ open, onClose }) {
  const { isLoading, error } = useSelector((state) => state.Logout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
const [successOpen, setSuccessOpen] = useState(false);
  const handleLogout = () => {
   dispatch(Logout())
  .unwrap()
  .then(() => {
    onClose();          // إغلاق مودال التأكيد
    setSuccessOpen(true);
  
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
          sx={{ color:blue, fontSize: "20px", fontWeight: "700", textAlign: "right" }}
        >
          هل ترغب حقاً بتسجيل الخروج؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "16px", fontWeight: "500", textAlign: "right" ,color:blue, }}
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
              color: "rgb(14, 52, 74)",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            تراجع
          </Button>
        </DialogActions>
      </Dialog>

      {/* رسالة النجاح */}
      <Dialog
  open={successOpen}
  PaperProps={{
    sx: {
      direction: "rtl",
      borderRadius: 3,
      p: 2,
      textAlign: "center",
      minWidth: 360,
    },
  }}
>
  <DialogContent>

    <Box
      sx={{
        width: 70,
        height: 70,
        bgcolor: "#E8F5E9",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#2E7D32",
          fontSize: 40,
        }}
      >
        ✓
      </Typography>
    </Box>

    <Typography
      sx={{
        fontWeight: 700,
        fontSize: 22,
        mb: 1,color:blue1
      }}
    >
      تم تسجيل الخروج بنجاح
    </Typography>

    <Typography sx={{color:blue1}}>
      شكراً لاستخدامك التطبيق.
      <br />
      نتمنى رؤيتك مرة أخرى.
    </Typography>

    <Button
      fullWidth
      sx={{
        mt: 3,
        borderRadius: 2,backgroundColor:blue
      }}
      variant="contained"
      onClick={() => {
        setSuccessOpen(false);
        navigate("/login", { replace: true });
      }}
    >
      حسناً
    </Button>

  </DialogContent>
</Dialog>
    </>
  );
}