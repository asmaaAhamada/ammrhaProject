import React from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  useMediaQuery
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

export default function TransferSuccessModal({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // اللون الأزرق الحيوي المعتمد للكارد والأزرار المشرقة
  const customBlue = "#1e88e5";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs" // مقاس أصغر ومناسب لرسائل التأكيد والنجاح
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.imagecard1, // نفس خلفية مودال الإنشاء المعتمد لديكِ
          borderRadius: "16px",
          p: isMobile ? 3 : 4,
          direction: "rtl"
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2
        }}
      >
        {/* أيقونة النجاح باللون الأزرق المشرق */}
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: "65px", 
            color: customBlue 
          }} 
        />

        {/* عنوان رسالة النجاح */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: theme.palette.primary.text3, // نفس تلوين عناوين المودالات لديكِ
            mt: 1
          }}
        >
          تم نقل الفعالية بنجاح
        </Typography>

        {/* نص توضيحي فرعي */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: theme.palette.primary.text4,
            lineHeight: "1.5",
            px: 2
          }}
        >
          تمت العملية بنجاح، ونُقلت الفعالية المحددة إلى القسم العام وأصبحت مرئية للجميع الآن.
        </Typography>

        {/* زر الإغلاق المتناسق تماماً مع زر "إنشاء الفعالية" */}
        <Button
          onClick={onClose} // ستقوم هذه الدالة الآن بإغلاق المودال وتصفير الـ state تماماً في الأب
          variant="contained"
          sx={{
            width: isMobile ? "100%" : "140px",
            height: "43px",
            backgroundColor: theme.palette.primary.button1, // أزرق النيلي الخاص بالتطبيق
            color: white,
            fontWeight: 600,
            fontSize: "15px",
            textTransform: "none",
            borderRadius: "12px",
            mt: 2,
            boxShadow: "none",
            "&:hover": { 
              backgroundColor: "#162d6b" // نفس الـ hover المعتمد لديكِ
            }
          }}
        >
          حسناً
        </Button>
      </Box>
    </Dialog>
  );
}