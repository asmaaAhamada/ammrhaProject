import React, { useState } from "react";
import { Dialog, Box, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios"; // أو مكنزم الـ API الخاص بكِ

export default function TransferConfirmModal({ open, onClose, event, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!event) return;
    setLoading(true);
    try {
      // إرسال الطلب إلى الـ API بالـ ID الصحيح
      await axios.patch(`/v1/events/transfer-to-public/${event.id}`); 
      
      setLoading(false);
      onSuccess(); // استدعاء دالة النجاح لإغلاق المودال وتحديث الأب
    } catch (error) {
      setLoading(false);
      console.error("خطأ في النقل للعام", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: "16px", p: 4, direction: "rtl" } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 2 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          نقل الفعالية إلى القسم العام
        </Typography>

        <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
          هل أنتِ متأكدة من رغبتكِ في نقل الفعالية 
          <Box component="span" sx={{ fontWeight: "bold", color: "primary.main" }}> "{event?.title || event?.name}" </Box>
          إلى القسم العام؟
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2, width: "100%", justifyContent: "center" }}>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={loading}
            sx={{ backgroundColor: "#1e88e5", borderRadius: "12px", width: "130px", height: "43px" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "تأكيد النقل"}
          </Button>
          
          <Button onClick={onClose} disabled={loading} variant="text" sx={{ color: "text.secondary" }}>
            تراجع
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}