import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { resetDetails } from "../../../backend/slice/complaints/deteails";
import { resetForm, setformInfo, Update_Complaints } from "../../../backend/slice/complaints/Edit";

const ComplaintDetailsModal = ({ isOpen, onClose, onRefreshList }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data: detailData, isLoading: isDetailsLoading, error: detailsError } = useSelector(
    (state) => state.fetchDetailsComplaints
  );
console.log(detailData)
  const { formInfo, isLoading: isUpdating, success: isUpdateSuccess, error: updateError } = useSelector(
    (state) => state.Update_Complaints
  );

  // فحص ما إذا كانت الشكوى تمت معالجتها وإغلاقها مسبقاً
  const isResolved = detailData?.status === "تمت المعالجة";

  // تحديث البيانات عند فتح تفاصيل الشكوى
  useEffect(() => {
    if (detailData?.id) {
      dispatch(
        setformInfo({ 
          id: detailData.id, 
          status: 'resolved', // التعديل الصحيح بناءً على الـ API الخاص بك لتفادي الـ Validation Error
          admin_reply: isResolved ? detailData.admin_reply : '' 
        })
      );
    }
  }, [detailData, dispatch, isResolved]);

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(resetForm());
      dispatch(resetDetails());
      if (onRefreshList) onRefreshList();
      onClose();
    }
  }, [isUpdateSuccess, dispatch, onClose, onRefreshList]);

  const handleClose = () => {
    dispatch(resetForm());
    dispatch(resetDetails());
    onClose();
  };

  const handleReplyChange = (e) => {
    dispatch(setformInfo({ admin_reply: e.target.value }));
  };

  const handleProcessComplaint = () => {
    dispatch(Update_Complaints());
  };

  const primaryColor = theme.palette.primary.button1;

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "-", time: "-" };
    const dateObj = new Date(dateString);
    const date = dateObj.toLocaleDateString('ar-EG', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const time = dateObj.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  };

  const { date: complaintDate, time: complaintTime } = formatDateTime(detailData?.created_at);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.imagecard1,
          color: theme.palette.primary.text3,
          borderRadius: "12px",
          p: 1,
          direction: "rtl",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.palette.primary.text3,
          textAlign: "right",
          fontWeight: 700,
          position: "relative",
          pt: 2,
          pb: 1
        }}
      >
        تفاصيل الشكوى رقم #{detailData?.id || ""}
        <IconButton
          onClick={handleClose}
          disabled={isDetailsLoading || isUpdating}
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

      <DialogContent sx={{ mt: 1 }}>
        <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.09)" }} />

        {isDetailsLoading && (
          <Box sx={{ py: 6, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size={40} color="inherit" />
          </Box>
        )}

        {detailsError && !isDetailsLoading && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography sx={{ color: "error.main", fontWeight: 600 }}>
              حدث خطأ أثناء تحميل التفاصيل: {detailsError}
            </Typography>
          </Box>
        )}

        {!isDetailsLoading && !detailsError && detailData && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: primaryColor, mb: 1.5, textAlign: "right" }}>
                {detailData.title || "بدون عنوان"}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.primary.text7,
                  lineHeight: 1.7,
                  backgroundColor: theme.palette.primary.inputt,
                  p: 2,
                  borderRadius: "8px",
                  borderLeft: `4px solid ${primaryColor}`, 
                  textAlign: "right"
                }}
              >
                {detailData.description}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8, mt: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PersonOutlineOutlinedIcon sx={{ color: primaryColor, fontSize: "20px" }} />
                <Typography variant="body2" sx={{ color: theme.palette.primary.text3 }}>
                  <strong>المقدم:</strong> {detailData.creator?.name || "غير معروف"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <BusinessOutlinedIcon sx={{ color: primaryColor, fontSize: "20px" }} />
                <Typography variant="body2" sx={{ color: theme.palette.primary.text3 }}>
                  <strong>القسم:</strong> {detailData.department?.name || "عام"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CalendarTodayOutlinedIcon sx={{ color: primaryColor, fontSize: "18px" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: "row" }}>
                  <Typography variant="body2" sx={{ color: theme.palette.primary.text3 }}>
                    <strong>التاريخ:</strong> {complaintDate}
                  </Typography>
                  <AccessTimeOutlinedIcon sx={{ color: primaryColor, fontSize: "16px", mr: 1, ml: 0.5 }} />
                  <Typography variant="body2" sx={{ color: theme.palette.primary.text3 }}>
                    {complaintTime}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 0.5, borderColor: "rgba(255, 255, 255, 0.09)" }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ReplyOutlinedIcon sx={{ color: primaryColor, fontSize: "20px" }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.text3 }}>
                  {isResolved ? "الإجراء المتخذ مسبقاً واكتمل:" : "رد إدارة النظام / الإجراء المتخذ:"}
                </Typography>
              </Box>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder={isResolved ? "" : "اكتب تفاصيل الإجراء المتخذ أو الرد هنا لتغيير حالة الشكوى لمعالجة..."}
                value={formInfo.admin_reply || ""}
                onChange={handleReplyChange}
                disabled={isUpdating || isResolved}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.primary.inputt,
                    color: theme.palette.primary.text3,
                    borderRadius: "8px",
                    textAlign: "right",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                    "&:hover fieldset": { borderColor: primaryColor },
                    "&.Mui-focused fieldset": { borderColor: primaryColor },
                    "&.Mui-disabled fieldset": { borderColor: "rgba(255, 255, 255, 0.05)" },
                  },
                  "& .MuiOutlinedInput-input": { direction: "rtl", textAlign: "right" }
                }}
              />
            </Box>

            {updateError && (
              <Box sx={{ mt: 1, textAlign: "right" }}>
                <Typography variant="caption" sx={{ color: "error.main", fontWeight: 700, fontSize: "0.85rem" }}>
                  ⚠️ {updateError}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 0.5, borderColor: "rgba(255, 255, 255, 0.09)" }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
              <Button 
                onClick={handleClose} 
                disabled={isUpdating}
                sx={{ 
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  color: theme.palette.primary.text3,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                  }
                }}
              >
                إغلاق
              </Button>
              
              {/* يظهر زر المعالجة فقط إذا كانت الشكوى غير منتهية بعد */}
              {!isResolved && (
               <Button
  variant="contained"
  onClick={handleProcessComplaint}
  disabled={isUpdating || !formInfo.admin_reply?.trim()}
  sx={{
    backgroundColor: primaryColor,
    color: "#ffffff",
    borderRadius: "6px",
    fontWeight: 600,
    minWidth: "140px", // يضمن ثبات عرض الزر عند التحميل واختفاء الكلمة
    height: "40px",    // يضمن ثبات طول الزر
    px: 3,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: primaryColor,
      opacity: 0.9
    },
    // 🌟 تحسين مظهر الـ Disabled ليكون واضحاً جداً ولا يختفي في الخلفية الفاتحة
    "&.Mui-disabled": {
      backgroundColor: isUpdating ? primaryColor : "rgba(0, 0, 0, 0.12)", // خلفية رمادية صريحة وواضحة عند التعطيل
      color: isUpdating ? "#ffffff" : "rgba(0, 0, 0, 0.38)",             // لون نص رمادي غامق يظهر بوضوح
    }
  }}
>
  {isUpdating ? (
    <CircularProgress size={22} color="inherit" />
  ) : (
    "معالجة الشكوى"
  )}
</Button>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintDetailsModal;