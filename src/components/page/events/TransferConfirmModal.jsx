import React, { useState } from "react";
import { Dialog, Box, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios"; // أو مكنزم الـ API الخاص بكِ
import { transfer_to_public } from "../../../backend/slice/events/transfer-to-public";
import { blue } from "../../../style/color-main/color";

export default function TransferConfirmModal({
    open,
    onClose,
    event,
    onConfirm,
    loading
}) { 

 const handleConfirm = () => {
    onConfirm();
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
        <Typography sx={{ fontSize: "20px", fontWeight: 700 ,color:"#1e88e5" }}>
          نقل الفعالية إلى القسم العام
        </Typography>

        <Typography sx={{ fontSize: "14px", color: blue }}>
          هل أنتِ متأكدة من رغبتكِ في نقل الفعالية 
          <Box component="span" sx={{ fontWeight: "bold", color: blue }}> "{event?.title || event?.name}" </Box>
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
          
          <Button onClick={onClose} disabled={loading} variant="text" sx={{ color: blue ,borderColor:"#1e88e5" }}>
            تراجع
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}