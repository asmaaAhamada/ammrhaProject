import React, { useEffect, useState } from "react";
import { Modal, Button, DatePicker, TimePicker } from "antd";
import { Snackbar, Alert, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetFormStatus, volunteer_calener } from "../../../backend/slice/volnteers/request/calendr";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function CreateInterviewModal({ open, onClose }) {
  const dispatch = useDispatch();
  
  // ستيت الحقول المحلية للـ Form
  const [interviewDate, setInterviewDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // ستيت التنبيهات (Toast)
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const { isLoading, success, error } = useSelector((state) => state.volunteer_calener);

  // إعادة تعيين الحقول عند إغلاق أو فتح المودال
  useEffect(() => {
    if (open) {
      setInterviewDate(null);
      setStartTime(null);
      setEndTime(null);
      dispatch(resetFormStatus());
    }
  }, [open, dispatch]);

  // مراقبة نجاح أو فشل العملية
  useEffect(() => {
    if (success) {
      setToast({
        open: true,
        message: "تم إنشاء موعد المقابلة العام بنجاح!",
        severity: "success",
      });

      setTimeout(() => {
        dispatch(resetFormStatus());
        if (typeof onClose === "function") onClose();   
      }, 1500);
    }

    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء حفظ الموعد!",
        severity: "error",
      });
    }
  }, [success, error, dispatch, onClose]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = () => {
    if (!interviewDate) {
      setToast({ open: true, message: "الرجاء اختيار تاريخ المقابلة أولاً", severity: "error" });
      return;
    }
    if (!startTime) {
      setToast({ open: true, message: "الرجاء تحديد وقت البدء", severity: "error" });
      return;
    }
    if (!endTime) {
      setToast({ open: true, message: "الرجاء تحديد وقت الانتهاء", severity: "error" });
      return;
    }

    // صياغة البيانات بالشكل الذي يطلبه الباك-إند لارفيل لتجنب الـ Parse Error 🚀
    const payload = {
      date: interviewDate.format("YYYY-MM-DD"), // إرسال التاريخ فقط بدون توقيت الـ ISO الزائد 
      start_time: startTime.format("HH:mm"),     // إرسال الوقت بصيغة 24 ساعة string "02:00"
      end_time: endTime.format("HH:mm"),         // إرسال الوقت بصيغة 24 ساعة string "04:06"
    };

    dispatch(volunteer_calener(payload));
  };

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        sx={{ direction: "rtl", zIndex: 3000 }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: "100%", borderRadius: "12px", fontSize: "14px", fontWeight: 600,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", fontFamily: "inherit",
            '& .MuiAlert-icon': { marginLeft: '12px', marginRight: 0 }
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <Modal
        title={
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: "20px", color: "#0c2556", paddingTop: "10px" }}>
            إنشاء موعد مقابلة عام
          </div>
        }
        open={open}
        onCancel={() => {
          setInterviewDate(null);
          setStartTime(null);
          setEndTime(null);
          dispatch(resetFormStatus());
          onClose();
        }}
        footer={[
          <div key="footer-box" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
            <Button
              key="submit"
              type="primary"
              loading={isLoading}
              onClick={handleSubmit}
              style={{ backgroundColor: "#0c2556", borderColor: "#0c2556", fontWeight: 600, borderRadius: "8px", height: "40px", padding: "0 24px" }}
            >
              حفظ الموعد
            </Button>
            <Button 
              key="back" 
              onClick={onClose} 
              disabled={isLoading}
              style={{ border: "none", boxShadow: "none", color: "#0c2556", fontWeight: 600, height: "40px" }}
            >
              إلغاء
            </Button>
          </div>
        ]}
        closable={true}
        style={{ direction: "rtl" }}
        styles={{ body: { padding: "10px 24px" } }}
        width={450}
      >
        <div style={{ direction: "rtl", textAlign: "right", marginTop: "15px" }}>
          
          {/* حقل تاريخ المقابلة */}
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontWeight: 600, color: "#2D3748", fontSize: "14px" }}>تاريخ المقابلة:</label>
          </div>
          <DatePicker
            placeholder="اختر التاريخ"
            style={{ width: "100%", height: "45px", marginBottom: "20px", borderRadius: "8px" }}
            popupStyle={{ textAlign: "right", direction: "rtl" }}
            value={interviewDate}
            onChange={(date) => setInterviewDate(date)}
            format="YYYY-MM-DD"
          />

          {/* حقل وقت البدء */}
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontWeight: 600, color: "#2D3748", fontSize: "14px" }}>وقت البدء:</label>
          </div>
          <TimePicker
            placeholder="اختر وقت البدء"
            style={{ width: "100%", height: "45px", marginBottom: "20px", borderRadius: "8px" }}
            popupStyle={{ textAlign: "right", direction: "rtl" }}
            value={startTime}
            onChange={(time) => setStartTime(time)}
            format="HH:mm"
            use12Hours={false}
          />

          {/* حقل وقت الانتهاء */}
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontWeight: 600, color: "#2D3748", fontSize: "14px" }}>وقت الانتهاء:</label>
          </div>
          <TimePicker
            placeholder="اختر وقت الانتهاء"
            style={{ width: "100%", height: "45px", marginBottom: "10px", borderRadius: "8px" }}
            popupStyle={{ textAlign: "right", direction: "rtl" }}
            value={endTime}
            onChange={(time) => setEndTime(time)}
            format="HH:mm"
            use12Hours={false}
          />

        </div>
      </Modal>
    </>
  );
}