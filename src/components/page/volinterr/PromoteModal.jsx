import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Input } from "antd";
import { Snackbar, Alert, Slide, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { resetForm, setformInfo ,Postion } from "../../../backend/slice/volnteers/postion";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function PromoteModal({ open, onClose, selectedVolunteer, onSuccess }) {
  const dispatch = useDispatch();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [roleName, setRoleName] = useState("");

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const { data: departments, isLoading: isDeptsLoading } = useSelector((state) => state.fetchDepartment);
  const { isLoading: isPromoting, success, error } = useSelector((state) => state.Postion);

  useEffect(() => {
    if (open) {
      dispatch(fetchDepartment());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (selectedVolunteer) {
      dispatch(
        setformInfo({
          user_id: selectedVolunteer.id,
          department_id: selectedDepartmentId || "",
          role: roleName,
        })
      );
    }
  }, [selectedVolunteer, selectedDepartmentId, roleName, dispatch]);

  useEffect(() => {
    if (success) {
      setToast({
        open: true,
        message: "تم ترقية المتطوع وتعيين المنصب الجديد بنجاح!",
        severity: "success",
      });

      setTimeout(() => {
        dispatch(resetForm());
        setSelectedDepartmentId(null);
        setRoleName("");
        if (typeof onSuccess === "function") onSuccess(); 
        if (typeof onClose === "function") onClose();   
      }, 1500);
    }

    if (error) {
      setToast({
        open: true,
        message: typeof error === 'string' ? error : "حدث خطأ ما أثناء ترقية المتطوع!",
        severity: "error",
      });
    }
  }, [success, error, dispatch, onClose, onSuccess]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleConfirmPromotion = () => {
    if (!selectedDepartmentId) {
      setToast({ open: true, message: "الرجاء اختيار القسم أولاً", severity: "error" });
      return;
    }
    if (!roleName.trim()) {
      setToast({ open: true, message: "الرجاء إدخال المسمى الوظيفي (الدور)", severity: "error" });
      return;
    }
    dispatch(Postion());
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
            ترقية وتعيين منصب لمتطوع
          </div>
        }
        open={open}
        onCancel={() => {
          setSelectedDepartmentId(null);
          setRoleName("");
          dispatch(resetForm());
          onClose();
        }}
        footer={[
          <div key="footer-box" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
            <Button
              key="submit"
              type="primary"
              loading={isPromoting}
              onClick={handleConfirmPromotion}
              style={{ backgroundColor: "#0c2556", borderColor: "#0c2556", fontWeight: 600, borderRadius: "8px", height: "40px", padding: "0 24px" }}
            >
              تأكيد الترقية
            </Button>
            <Button 
              key="back" 
              onClick={onClose} 
              disabled={isPromoting}
              style={{ border: "none", boxShadow: "none", color: "#0c2556", fontWeight: 600, height: "40px" }}
            >
              تراجع
            </Button>
          </div>
        ]}
        closable={true}
        style={{ direction: "rtl" }}
        styles={{ body: { padding: "10px 24px" } }}
        width={480}
      >
        <div style={{ direction: "rtl", textAlign: "right", marginTop: "15px" }}>
          <p style={{ fontSize: "15px", color: "#4A5568", marginBottom: "20px", lineHeight: "1.6", textAlign: "center" }}>
            أنت تقوم بترقية المتطوع: <strong style={{ color: "#05DF72" }}>{selectedVolunteer?.full_name}</strong> وإسناد مهام إدارية جديدة له داخل النظام.
          </p>
          
          {/* حقل اختيار القسم */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontWeight: 600, color: "#2D3748", fontSize: "14px" }}>اختر القسم الإداري للمنصب:</label>
            {isDeptsLoading && (
              <span style={{ fontSize: "12px", color: "#0c2556", display: "flex", alignItems: "center", gap: "5px" }}>
                <CircularProgress size={12} color="inherit" /> جاري تحميل الأقسام...
              </span>
            )}
          </div>
          <Select
            placeholder="...اختر القسم هنا (مطلوب)"
            style={{ width: "100%", height: "45px", marginBottom: "20px" }}
            dropdownStyle={{ textAlign: "right", direction: "rtl" }}
            loading={isDeptsLoading}
            value={selectedDepartmentId}
            onChange={(value) => setSelectedDepartmentId(value)}
            options={departments?.map((dept) => ({ value: dept.id, label: dept.name }))}
          />

          {/* حقل إدخال الرول */}
          <div style={{ marginBottom: "8px" }}>
            <label style={{ fontWeight: 600, color: "#2D3748", fontSize: "14px" }}>المسمى الوظيفي / الدور الجديد (Role):</label>
          </div>
          <Input 
            placeholder="مثال: منسق، قائد فريق، مدير جودة..." 
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            style={{ height: "45px", borderRadius: "8px", textAlign: "right" }}
          />
        </div>
      </Modal>
    </>
  );
}