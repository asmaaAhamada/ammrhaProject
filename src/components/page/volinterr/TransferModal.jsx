import React, { useEffect, useState } from "react";
import { Modal, Select, Button } from "antd";
import { Snackbar, Alert, Slide, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { resetForm, setformInfo, transferr } from "../../../backend/slice/volnteers/transfer";

// دالة الحركة الانزلاقية اللطيفة من الأعلى للأسفل للـ Toast
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function TransferModal({ open, onClose, selectedVolunteer, onSuccess }) {
  const dispatch = useDispatch();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  // التحكم بالـ Toast العلوي المطابق لمودال المعايير
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  // جلب البيانات وحالات التحميل من الستور
  const { data: departments, isLoading: isDeptsLoading } = useSelector((state) => state.fetchDepartment);
  const { isLoading: isTransferring, success, error } = useSelector((state) => state.transferr);

  // جلب الأقسام فور فتح المودال
  useEffect(() => {
    if (open) {
      dispatch(fetchDepartment());
    }
  }, [open, dispatch]);

  // تحديث بيانات النموذج بالستور عند اختيار القسم أو المتطوع
  useEffect(() => {
    if (selectedVolunteer && selectedDepartmentId) {
      dispatch(
        setformInfo({
          volunteer_id: selectedVolunteer.id,
          department_id: selectedDepartmentId,
        })
      );
    }
  }, [selectedVolunteer, selectedDepartmentId, dispatch]);

  // مراقبة حالات النجاح أو الفشل لعرض الـ Toast الموحد
  useEffect(() => {
    if (success) {
      setToast({
        open: true,
        message: "تم نقل المتطوع إلى القسم الجديد بنجاح!",
        severity: "success",
      });

      // تأخير الإغلاق وتحديث الجدول لمنح تجربة بصرية مريحة للمستخدم
      setTimeout(() => {
        dispatch(resetForm());
        setSelectedDepartmentId(null);
        if (typeof onSuccess === "function") onSuccess(); 
        if (typeof onClose === "function") onClose();   
      }, 1500);
    }

    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء نقل المتطوع!",
        severity: "error",
      });
    }
  }, [success, error, dispatch, onClose, onSuccess]);

  // التعامل مع إغلاق الـ Toast
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
    if (toast.severity === 'error') {
      dispatch(resetForm()); 
    }
  };

  const handleConfirmTransfer = () => {
    if (!selectedDepartmentId) {
      setToast({
        open: true,
        message: "الرجاء اختيار القسم المراد النقل إليه أولاً",
        severity: "error",
      });
      return;
    }
    dispatch(transferr());
  };

  return (
    <>
      {/* التنبيه العلوي اللطيف (Toast) المطابق تماماً لطلبكِ */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        sx={{ direction: "rtl", zIndex: 3000 }} // وضع zIndex مرتفع لكي يظهر فوق المودال بوضوح
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

      <Modal
        title={
          <div style={{ 
            textAlign: "center", 
            fontWeight: 700, 
            fontSize: "20px", 
            color: "#0c2556", 
            paddingTop: "10px"
          }}>
            نقل حساب المتطوع
          </div>
        }
        open={open}
        onCancel={() => {
          setSelectedDepartmentId(null);
          dispatch(resetForm());
          onClose();
        }}
        footer={[
          <div key="footer-box" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
            <Button
              key="submit"
              type="primary"
              loading={isTransferring}
              onClick={handleConfirmTransfer}
              style={{ 
                backgroundColor: "#0c2556", 
                borderColor: "#0c2556",
                fontWeight: 600,
                borderRadius: "8px",
                height: "40px",
                padding: "0 24px"
              }}
            >
              تأكيد النقل
            </Button>
            <Button 
              key="back" 
              onClick={onClose} 
              disabled={isTransferring}
              style={{ 
                border: "none", 
                boxShadow: "none", 
                color: "#0c2556", 
                fontWeight: 600,
                height: "40px"
              }}
            >
              تراجع
            </Button>
          </div>
        ]}
        closable={true}
        style={{ direction: "rtl" }}
        styles={{
          body: { padding: "10px 24px" }
        }}
        width={480}
      >
        <div style={{ direction: "rtl", textAlign: "center", marginTop: "15px" }}>
          <p style={{ fontSize: "15px", color: "#4A5568", marginBottom: "20px", lineHeight: "1.6" }}>
            هل أنت متأكد من نقل المتطوع: <strong style={{ color: "#05DF72" }}>{selectedVolunteer?.full_name}</strong>؟ سيتم نقل نشاطه وتكليف أعماله التطوعية بالقسم الجديد المختار.
          </p>
          
          <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontWeight: 600, color: "#2D3748", fontSize: "14px", flexGrow: 1, textAlign: "right" }}>
              اختر القسم الجديد من القائمة:
            </label>
            {/* جملة توضيحية تظهر للمستخدم أثناء جلب الأقسام من السيرفر */}
            {isDeptsLoading && (
              <span style={{ fontSize: "12px", color: "#0c2556", display: "flex", alignItems: "center", gap: "5px" }}>
                <CircularProgress size={12} color="inherit" /> جاري تحميل الأقسام...
              </span>
            )}
          </div>
          
          <Select
            placeholder="...اختر القسم هنا (مطلوب)"
            style={{ 
              width: "100%", 
              height: "45px",
              textAlign: "right"
            }}
            dropdownStyle={{ textAlign: "right", direction: "rtl" }}
            loading={isDeptsLoading}
            value={selectedDepartmentId}
            onChange={(value) => setSelectedDepartmentId(value)}
            options={departments?.map((dept) => ({
              value: dept.id,
              label: dept.name,
            }))}
          />
        </div>
      </Modal>
    </>
  );
}