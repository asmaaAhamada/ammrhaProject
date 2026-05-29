// AddNewsPopup.jsx
import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

export default function AddSection({ open, onClose }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // إدارة حالة العدد الأقصى (الافتراضي مثلاً 10)
  const [maxVolunteers, setMaxVolunteers] = useState(10);

  // عرض الحقول
  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";

  // عرض العنوان
  const topFieldWidth = isMobile ? "100%" : "231px";

  // دالتان للتحكم بالعداد
  const handleIncrement = () => setMaxVolunteers((prev) => prev + 1);
  const handleDecrement = () => setMaxVolunteers((prev) => (prev > 0 ? prev - 1 : 0)); // يمنع النزول تحت الصفر

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMaxVolunteers(isNaN(value) ? "" : value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.imagecard1,
          width: isMobile ? "95%" : "526px",
          borderRadius: "16px",
          p: isMobile ? 2 : 3,
          direction: "rtl",
        },
      }}
    >
      {/* العنوان الرئيسي */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: 2,
          textAlign: "right",
        }}
      >
        إضافة قسم
      </Typography>

      {/* الاسم */}
      <Box sx={{ width: topFieldWidth, mb: 2 }}>
        <Typography
          sx={{
            fontSize: "13px",
            mb: 1,
            color: theme.palette.primary.text4,
            textAlign: "right",
          }}
        >
          الاسم
        </Typography>

        <TextField
          placeholder="ادخل اسم القسم"
          fullWidth
          inputProps={{
            style: {
              textAlign: "right",
              backgroundColor: theme.palette.primary.inputt,
              color: theme.palette.primary.text7,
            },
          }}
        />
      </Box>

      {/* الصورة */}
      <Typography
        sx={{
          fontSize: "13px",
          mb: 1,
          color: theme.palette.primary.text4,
          textAlign: "right",
        }}
      >
        الصورة
      </Typography>

      <Box
        component="label"
        sx={{
          backgroundColor: theme.palette.primary.inputt,
          color: theme.palette.primary.text7,
          width: fieldWidth,
          height: isMobile ? "120px" : "160px",
          border: "1px dashed #ccc",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          mb: 2,
        }}
      >
        <input type="file" accept="image/*" hidden />
        <Typography sx={{ fontSize: "13px", mb: 1 }}>
          انقر لإضافة صورة
        </Typography>
        <UploadIcon />
      </Box>

      {/* العدد الأقصى المعدّل مع الستيبير (Stepper) */}
      <Box sx={{ width: fieldWidth, mb: 3 }}>
        <Typography
          sx={{
            fontSize: "13px",
            mb: 1,
            color: theme.palette.primary.text4,
            textAlign: "right",
          }}
        >
          العدد الأقصى للمتطوعين
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.primary.inputt,
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/* زر الناقص (-) جهة اليمين بناءً على الـ RTL */}
          <IconButton 
            onClick={handleDecrement} 
            sx={{ color: theme.palette.primary.text3, p: 1.5 }}
          >
            <RemoveIcon />
          </IconButton>

          {/* حقل الإدخال الرقمي المباشر بالوسط */}
          <TextField
            type="number"
            value={maxVolunteers}
            onChange={handleInputChange}
            placeholder="0"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            inputProps={{
              style: {
                textAlign: "center", // توسيط الرقم لتجربة مستخدم أفضل
                color: theme.palette.primary.text7,
                fontSize: "16px",
                fontWeight: 600,
              },
            }}
            sx={{
              flex: 1,
              // إخفاء أسهم المتصفح الافتراضية المزعجة للـ number input
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
            }}
          />

          {/* زر الزائد (+) جهة اليسار */}
          <IconButton 
            onClick={handleIncrement} 
            sx={{ color: theme.palette.primary.text3, p: 1.5 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* الأزرار */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
          }}
        >
          إضافة
        </Button>

        <Button
          onClick={onClose}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            border: "1px solid #ccc",
            color: theme.palette.primary.text3,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
          }}
        >
          إلغاء
        </Button>
      </Box>
    </Dialog>
  );
}