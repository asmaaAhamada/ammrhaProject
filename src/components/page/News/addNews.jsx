// AddNewsPopup.jsx

import React from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  useMediaQuery,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

export default function AddNews({ open, onClose }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // عرض الحقول
  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";

  // عرض العنوان + السيلكت
  const topFieldWidth = isMobile ? "100%" : "231px";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
            backgroundColor:theme.palette.primary.imagecard1,
          width: isMobile ? "95%" : "526px",
          borderRadius: "16px",
          p: isMobile ? 2 : 3,
          direction: "rtl",
        },
      }}
    >
      {/* العنوان */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: theme.palette.primary.text3,
          mb: 2,
          textAlign: "right",
        }}
      >
        إضافة خبر
      </Typography>

      {/* العنوان + القسم */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: isMobile ? "column" : "row",
          mb: 2,
        }}
      >
        {/* العنوان */}
        <Box sx={{ width: topFieldWidth }}>
          <Typography
            sx={{
              fontSize: "13px",
              mb: 1,
              color: theme.palette.primary.text4,
              textAlign: "right",
            }}
          >
            العنوان
          </Typography>

          <TextField
            placeholder="ادخل اسم الخبر"
            fullWidth
            inputProps={{ style: { textAlign: "right",backgroundColor: theme.palette.primary.inputt,
color:theme.palette.primary.text7, } }}
          />
        </Box>

        {/* السيلكت */}
        <Box sx={{ width: topFieldWidth ,
 }}>
          <Typography
            sx={{
              fontSize: "13px",
              mb: 1,
              color: theme.palette.primary.text4,
              textAlign: "right",
            }}
          >
            القسم
          </Typography>

          <FormControl fullWidth>
            <Select sx={{backgroundColor: theme.palette.primary.inputt}} defaultValue="" displayEmpty>
              <MenuItem sx={{ backgroundColor: theme.palette.primary.logo,
  color: theme.palette.primary.button3,}} value="">اختر القسم</MenuItem>
              <MenuItem sx={{ backgroundColor: theme.palette.primary.logo,
  color: theme.palette.primary.button3,}} value="politics">سياسة</MenuItem>
              <MenuItem sx={{ backgroundColor: theme.palette.primary.logo,
  color: theme.palette.primary.button3,}} value="sports">رياضة</MenuItem>
              <MenuItem sx={{ backgroundColor: theme.palette.primary.logo,
  color: theme.palette.primary.button3,}} value="tech">تقنية</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
  {/* input الحقيقي */}
  <input
    type="file"
    accept="image/*"
    hidden
  />

  <Typography sx={{ fontSize: "13px", mb: 1 }}>
    انقر لإضافة صورة
  </Typography>

  <UploadIcon />
</Box>

      {/* المحتوى */}
      <Typography
        sx={{
          fontSize: "13px",
          mb: 1,
          color: theme.palette.primary.text4,
          textAlign: "right",
        }}
      >
        المحتوى
      </Typography>

      <TextField
      
        placeholder="اكتب محتوى الخبر"
        multiline
        rows={isMobile ? 3 : 4}
        fullWidth
        sx={{ width: fieldWidth, mb: 3 ,backgroundColor: theme.palette.primary.inputt,}}
 
        inputProps={{ style: { textAlign: "right",color:theme.palette.primary.text7, } }}
      />

      {/* الأزرار */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "flex-start", // 👈 هذا أهم تعديل
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