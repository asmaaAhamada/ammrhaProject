import React, { useEffect, useState } from "react";
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

export default function EditNews({ open, onClose, selectedCard }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";
  const topFieldWidth = isMobile ? "100%" : "231px";

  // ===== state filled from parent =====
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  // fill data when card selected
  useEffect(() => {
    if (selectedCard) {
      setForm({
        title: selectedCard.description || "",
        category: selectedCard.category || "",
        content: selectedCard.content || "",
        image: selectedCard.image || "",
      });
    }
  }, [selectedCard]);

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
      {/* title */}
      <Typography sx={{ fontSize: "18px", fontWeight: 700, mb: 2 ,          color: theme.palette.primary.text3,
 }}>
        تعديل خبر
      </Typography>

      {/* title + category */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: isMobile ? "column" : "row",
          mb: 2,
        }}
      >
        {/* title */}
        <Box sx={{ width: topFieldWidth }}>
          <Typography sx={{ fontSize: "13px", mb: 1 ,              color: theme.palette.primary.text4,
}}>العنوان</Typography>

          <TextField
            fullWidth
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            inputProps={{
              style: {
                textAlign: "right",
                backgroundColor: theme.palette.primary.inputt,
                color: theme.palette.primary.text7,
              },
            }}
          />
        </Box>

        {/* category */}
        <Box sx={{ width: topFieldWidth }}>
          <Typography sx={{ fontSize: "13px", mb: 1,              color: theme.palette.primary.text4,
 }}>القسم</Typography>

          <FormControl fullWidth>
            <Select
            sx={{backgroundColor: theme.palette.primary.inputt}}
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              sx={{ backgroundColor: theme.palette.primary.inputt }}
            >
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

      {/* image */}
      <Typography sx={{ fontSize: "13px", mb: 1 ,              color: theme.palette.primary.text4,
}}>الصورة</Typography>

      <Box
        component="label"
        sx={{
          backgroundColor: theme.palette.primary.inputt,
          width: fieldWidth,
          height: isMobile ? "120px" : "160px",
          border: "1px dashed #ccc",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          mb: 2,
          overflow: "hidden",
        }}
      >
        <input type="file" accept="image/*" hidden />

        {form.image ? (
          <img
            src={form.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <Typography>انقر لإضافة صورة</Typography>
            <UploadIcon />
          </>
        )}
      </Box>

      {/* content */}
      <Typography sx={{ fontSize: "13px", mb: 1 ,              color: theme.palette.primary.text4,
}}>المحتوى</Typography>

      <TextField
        multiline
        rows={isMobile ? 3 : 4}
        fullWidth
        value={form.content}
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
        sx={{ width: fieldWidth, mb: 3 }}
        inputProps={{
          style: {
            textAlign: "right",
            color: theme.palette.primary.text7,
          },
        }}
      />

      {/* buttons */}
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
            color: white,borderRadius:'12px',

          }}
        >
          حفظ
        </Button>

        <Button
          onClick={onClose}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",              color: theme.palette.primary.text4,
borderRadius:'12px',
            border: "1px solid #ccc",
          }}
        >
          إلغاء
        </Button>
      </Box>
    </Dialog>
  );
}