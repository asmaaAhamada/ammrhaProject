import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { Edit_Ranks, resetForm, setformInfo } from "../../../backend/slice/Ranks/Edit";

// دالة الحركة الانزلاقية اللطيفة من الأعلى للأسفل
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const EditRankModal = ({ open, onClose, selectedData, onSuccess }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات والحالات من الستور الصحيح
  const { formInfo, isLoading, error } = useSelector((state) => state.Edit_Ranks);

  // حالة التحكم بالـ Toast العلوي
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' أو 'error'
  });

  // حقن البيانات القادمة من الجدول داخل الستور عند فتح المودال فقط
  useEffect(() => {
    if (open && selectedData) {
      dispatch(setformInfo({
        name: selectedData.name || "",
        min_points: selectedData.min_points || selectedData.formatted_points || "",
                min_hours: selectedData.min_hours || selectedData.formatted_points || "",

      }));
    }
    // نقوم بتنظيف الفورم عند إغلاق المودال
    return () => {
      dispatch(resetForm());
    };
  }, [selectedData, open, dispatch]);

  // مراقبة أخطاء الباكيند عند حدوثها بشكل فوري
  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء تعديل المعيار!",
        severity: "error",
      });
    }
  }, [error]);

  // تحديث الستور مباشرة عند الكتابة
  const handleChange = (key, value) => {
    dispatch(setformInfo({ [key]: value }));
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === 'error') {
      dispatch(resetForm()); // تصفير الخطأ عند إغلاق التنبيه
    }
  };

  const handleSubmit = () => {
    if (!selectedData?.id) return;
    if (!formInfo.name.toString().trim() || !formInfo.min_points.toString().trim() || !formInfo.min_hours.toString().trim()) {
      setToast({
        open: true,
        message: "الرجاء التأكد من ملء الحقول قبل الحفظ",
        severity: "error",
      });
      return;
    }

    // إرسال معرف المعيار إلى الـ Thunk
    dispatch(Edit_Ranks(selectedData.id))
      .unwrap()
      .then(() => {
        setToast({
          open: true,
          message: "تم تعديل المعيار بنجاح!",
          severity: "success",
        });

        // تأخير بسيط لإعطاء المستخدم فرصة لرؤية إشعار النجاح العلوي
        setTimeout(() => {
          if (typeof onSuccess === "function") onSuccess(); 
          if (typeof onClose === "function") onClose();       
        }, 1500);
      })
      .catch((err) => {
        console.error("فشلت عملية التعديل:", err);
      });
  };

  return (
    <>
      {/* التنبيه العلوي اللطيف (Toast) المتوافق مع الـ RTL وألوان الثيم */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        sx={{ direction: "rtl" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            fontFamily: "inherit",
            '& .MuiAlert-icon': {
              marginLeft: '12px',
              marginRight: 0
            }
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

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
            direction: "rtl"
          },
        }}
      >
        <DialogTitle
          sx={{
            color: theme.palette.primary.text3,
            textAlign: "right",
            fontWeight: 700,
            position: "relative",
            pt: 2
          }}
        >
          تعديل المعيار

          <IconButton
            onClick={onClose}
            disabled={isLoading}
            sx={{
              position: "absolute",
              left: 8,
              top: 12,
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
            placeholder="تعديل اسم الرتبة"
            onChange={(e) => handleChange("name", e.target.value)}
            margin="normal"
            disabled={isLoading}
            InputProps={{
              sx: { 
                color: theme.palette.primary.text7, 
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px"
              },
            }}
            inputProps={{ style: { textAlign: "right" } }}
          />

          <TextField
            fullWidth
            value={formInfo.min_points}
            placeholder="عدد النقاط"
            onChange={(e) => handleChange("min_points", e.target.value)}
            margin="normal"
            inputMode="numeric"
            disabled={isLoading}
            InputProps={{
              sx: { 
                color: theme.palette.primary.text7,
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px"
              },
            }}
            inputProps={{ style: { textAlign: "right" } }}
          />
           <TextField
            fullWidth
            value={formInfo.min_hours}
            placeholder="عدد النقاط"
            onChange={(e) => handleChange("min_hours", e.target.value)}
            margin="normal"
            inputMode="numeric"
            disabled={isLoading}
            InputProps={{
              sx: { 
                color: theme.palette.primary.text7,
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px"
              },
            }}
            inputProps={{ style: { textAlign: "right" } }}
          />

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
              fontWeight: 600,
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: theme.palette.primary.button1,
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "حفظ التعديلات"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditRankModal;