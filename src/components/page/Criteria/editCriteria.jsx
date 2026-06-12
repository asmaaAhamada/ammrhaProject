import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { setformInfo, Edit_Criteria, resetForm } from "../../../backend/slice/Criteria/Edit";

const EditCriteriaModal = ({ open, onClose, selectedData, onSuccess }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات والحالات من الستور الصحيح
  const { formInfo, isLoading, error } = useSelector((state) => state.Edit_Criteria);

  // حقن البيانات القادمة من الجدول داخل الستور عند فتح المودال فقط
  useEffect(() => {
    if (open && selectedData) {
      dispatch(setformInfo({
        name: selectedData.name || "",
        points: selectedData.points || selectedData.formatted_points || "",
      }));
    }
    // نقوم بتنظيف الفورم عند إغلاق المودال
    return () => {
      dispatch(resetForm());
    };
  }, [selectedData, open, dispatch]);

  // تحديث الستور مباشرة عند الكتابة
  const handleChange = (key, value) => {
    dispatch(setformInfo({ [key]: value }));
  };

  const handleSubmit = () => {
    if (!selectedData?.id) return;

    // إرسال معرف المعيار إلى الـ Thunk
    dispatch(Edit_Criteria(selectedData.id))
      .unwrap()
      .then(() => {
        if (typeof onSuccess === "function") onSuccess(); // تحديث جدول صفحة المعايير فوراً
        if (typeof onClose === "function") onClose();       // إغلاق المودال
      })
      .catch((err) => {
        console.error("فشلت عملية التعديل:", err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.imagecard1,
          color: theme.palette.primary.text3,
          borderRadius: "12px",
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.palette.primary.text3,
          textAlign: "right",
          fontWeight: 700,
          position: "relative",
        }}
      >
        تعديل المعيار

        <IconButton
          onClick={onClose}
          disabled={isLoading}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.primary.text3,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          value={formInfo.name}
          placeholder="تعديل اسم المعيار"
          onChange={(e) => handleChange("name", e.target.value)}
          margin="normal"
          disabled={isLoading}
          InputProps={{
            sx: { color: theme.palette.primary.text7, textAlign: "right" },
          }}
          inputProps={{ style: { textAlign: "right" } }}
        />

        <TextField
          fullWidth
          value={formInfo.points}
          placeholder="عدد النقاط"
          onChange={(e) => handleChange("points", e.target.value)}
          margin="normal"
          inputMode="numeric"
          disabled={isLoading}
          InputProps={{
            sx: { color: theme.palette.primary.text7 },
          }}
          inputProps={{ style: { textAlign: "right" } }}
        />

        {error && (
          <div style={{ color: "red", textAlign: "right", marginTop: "10px", fontWeight: "bold" }}>
            {error}
          </div>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{
            mt: 3,
            py: 1.2,
            backgroundColor: theme.palette.primary.button1,
            color: white,
            "&:hover": {
              backgroundColor: theme.palette.primary.button1,
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "حفظ التعديلات"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCriteriaModal;