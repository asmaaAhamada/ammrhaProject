import React, { useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

import { useDispatch, useSelector } from "react-redux";
import { Edit_Department, setformInfo, resetForm } from "../../../backend/slice/department/Edit";

export default function EditSection({ open, onClose, selectedCard, onSuccess }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { formInfo, isLoading, error, success } = useSelector((state) => state.Edit_Department);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fieldWidth = isMobile ? "100%" : isTablet ? "90%" : "478px";
  const topFieldWidth = isMobile ? "100%" : "231px";

  // تعبئة البيانات بشكل صحيح بناءً على مسميات الباك-إند
  useEffect(() => {
    if (selectedCard) {
      dispatch(setformInfo({
        name: selectedCard.name || "",
        max_volunteers: selectedCard.max_volunteers || "", // تم تعديل المسمى هنا ليطابق بيانات الكارد تماماً
        image: selectedCard.image || null,
      }));
    }
  }, [selectedCard, dispatch]);

  // عند نجاح التعديل: نقوم بتحديث القائمة الرئيسية وإغلاق المودال
  useEffect(() => {
    if (success) {
      if (onSuccess) onSuccess(); // استدعاء الدالة لتحديث القائمة دون ريفريش للرابط
      onClose();
      dispatch(resetForm());
    }
  }, [success, onClose, dispatch, onSuccess]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setformInfo({ image: file }));
    }
  };

  const handleSave = () => {
    if (selectedCard?.id) {
      dispatch(Edit_Department(selectedCard.id));
    }
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
      <Typography sx={{ fontSize: "18px", fontWeight: 700, mb: 2, color: theme.palette.primary.text3 }}>
        تعديل قسم
      </Typography>

      {error && (
        <Box sx={{ mb: 2, p: 1.5, borderRadius: "8px", backgroundColor: "rgba(211, 47, 47, 0.1)", border: "1px solid #d32f2f" }}>
          <Typography sx={{ color: "#d32f2f", fontSize: "14px", fontWeight: 500 }}>
            {error}
          </Typography>
        </Box>
      )}

      <Box sx={{ width: topFieldWidth, mb: 2 }}>
        <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>
          العنوان
        </Typography>
        <TextField
          fullWidth
          value={formInfo.name}
          onChange={(e) => dispatch(setformInfo({ name: e.target.value }))}
          inputProps={{
            style: {
              textAlign: "right",
              backgroundColor: theme.palette.primary.inputt,
              color: theme.palette.primary.text7,
            },
          }}
        />
      </Box>

      <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>
        الصورة
      </Typography>
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
        <input 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={handleImageChange} 
        />

        {formInfo.image ? (
          <img
            src={formInfo.image instanceof File ? URL.createObjectURL(formInfo.image) : formInfo.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Department"
          />
        ) : (
          <>
            <Typography sx={{ ml: 1 }}>انقر لإضافة صورة</Typography>
            <UploadIcon />
          </>
        )}
      </Box>

      <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>
        العدد (الحد الأقصى للمتطوعين)
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={formInfo.max_volunteers}
        onChange={(e) => dispatch(setformInfo({ max_volunteers: e.target.value }))}
        sx={{ width: fieldWidth, mb: 3 }}
        inputProps={{
          style: {
            textAlign: "right",
            color: theme.palette.primary.text7,
          },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isLoading}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            borderRadius: '12px',
          }}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: white }} /> : "حفظ"}
        </Button>

        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            color: theme.palette.primary.text4,
            borderRadius: '12px',
            border: "1px solid #ccc",
          }}
        >
          تراجع
        </Button>
      </Box>
    </Dialog>
  );
}