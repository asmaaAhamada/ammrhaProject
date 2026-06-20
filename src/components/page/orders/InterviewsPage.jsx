import React, { useState, useEffect } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Snackbar, Alert, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Box, Typography } from "@mui/material";

import { white, babygreen, red, blue1 } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchrequest_finished } from "../../../backend/slice/volnteers/request/finished";
import { Edit_request, resetSuccess } from "../../../backend/slice/volnteers/request/edit"; // تأكد من مسار السلايس لديك
import { motion } from "framer-motion";

// دالة الحركة لظهور التنبيه من الأعلى للأسفل
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const FinishedInterviewsTable = ({ onBack }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // ستيت التنبيهات المحلي (Toast) المطابق تماماً لطلبك
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  
  // الاحتفاظ بـ ID السطر الذي يتم تعديله حالياً لتهيئة لودينغ الزر المخصص له
  const [submittingId, setSubmittingId] = useState(null);

  // جلب بيانات الجدول
  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchrequest_finished);
  
  // جلب ستيت التعديل (قبول/رفض)
  const { isLoading: isActionLoading, success: isActionSuccess, error: actionError } = useSelector((state) => state.Edit_request);

  const handleFetchData = () => {
    dispatch(fetchrequest_finished());
  };

  useEffect(() => {
    handleFetchData();
  }, [dispatch]);

  // مراقبة نجاح أو فشل عملية القبول/الرفض لفتح الـ Toast
  useEffect(() => {
    if (isActionSuccess) {
      setToast({
        open: true,
        message: "تم تحديث حالة الطلب بنجاح وبدء معالجته في النظام!",
        severity: "success",
      });

      setSubmittingId(null);
      dispatch(resetSuccess());
      handleFetchData(); // إعادة تحديث بيانات الجدول لحذف السطر المعالج
    }

    if (actionError) {
      setToast({
        open: true,
        message: typeof actionError === 'string' ? actionError : "حدث خطأ ما أثناء معالجة الطلب!",
        severity: "error",
      });
      setSubmittingId(null);
    }
  }, [isActionSuccess, actionError, dispatch]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  // دالة التعامل مع ضغط أزرار القبول والرفض
  const handleStatusUpdate = (id, targetStatus) => {
    setSubmittingId(id);
    dispatch(Edit_request({ id, status: targetStatus }));
  };

  const finishedList = rawData?.data || (Array.isArray(rawData) ? rawData : []);

  // ================= COLUMNS CONFIGURATION =================
  const columns = [
    {
      title: "الاسم",
      dataIndex: "full_name",
      key: "full_name",
      fixed: "left",
      width: 180,
      render: (text) => (
        <Space>
          <Avatar>{text ? text.charAt(0) : "م"}</Avatar>
          <span>{text || "متطوع غير معروف"}</span>
        </Space>
      ),
    },
    {
      title: "تاريخ المقابلة",
      dataIndex: "interview_date",
      key: "interview_date",
      width: 150,
      render: (date) => <span>{date || "غير محدد"}</span>,
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => (
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "12px",
            border: `1px solid ${babygreen}`,
            color: babygreen,
            backgroundColor: "rgba(5, 223, 114, 0.08)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {status || "منتهية"}
        </span>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 180,
      render: (_, record) => {
        // فحص إذا كان هذا السطر هو المعالج حالياً لتشغيل الأنميشن عليه وحده
        const isCurrentRowLoading = isActionLoading && submittingId === record.id;

        return (
          <Space>
            <Button
              type="primary"
              loading={isCurrentRowLoading}
              disabled={isActionLoading && submittingId !== record.id}
              onClick={() => handleStatusUpdate(record.id, "accepted")}
              style={{ backgroundColor: blue1, borderColor: blue1, minWidth: '67px', height: '27px', borderRadius: '4px', fontSize: '12px', padding: '0 8px' }}
            >
              قبول
            </Button>
            <Button 
              danger
              type="primary"
              loading={isCurrentRowLoading}
              disabled={isActionLoading && submittingId !== record.id}
              onClick={() => handleStatusUpdate(record.id, "rejected")}
              style={{ backgroundColor: red, borderColor: red, minWidth: '67px', height: '27px', borderRadius: '4px', fontSize: '12px', padding: '0 8px' }}
            >
              رفض
            </Button>
          </Space>
        );
      },
    },
  ];

  // ====== هيكل الـ Skeleton Shimmer ======
  const skeletonData = Array.from({ length: 3 }, (_, index) => ({
    key: `skeleton-${index}`,
    isSkeleton: true,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: col.key === "full_name" ? () => (
      <Space>
        <Box sx={{ width: "32px", height: "32px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "50%" }} />
        <Box sx={{ width: "90px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Space>
    ) : () => (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ width: "70px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.12)", borderRadius: "4px" }} />
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />
      </Box>
    ),
  }));

  return (
    <div style={{ padding: "10px", width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box", direction: "rtl" }}>
      
      {/* الـ Snackbar و الـ Alert المطابق لتصميمك تماماً مع الـ Transition Down */}
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

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30, alignItems: "center", flexWrap: "wrap", gap: "10px", color: theme.palette.primary.text3 }}>
        <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>المقابلات المنتهية</h3>

        <Button
          onClick={onBack}
          style={{
            width: "120px", height: "40px", borderRadius: "10px",
            backgroundColor: theme.palette.primary.button1, color: white,
            border: "none", boxShadow: "none", fontWeight: 600, fontSize: '15px',
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
          }}
        >
          رجوع
          <ArrowBackIosNewOutlinedIcon style={{ fontSize: "14px" }} />
        </Button>
      </div>

      {/* معالجة حالة الخطأ للجدول */}
      {error && (
        <Box sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center" }}>
          <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
            حدث خطأ أثناء تحميل المقابلات المنتهية: {error}
          </Typography>
        </Box>
      )}

      {!error && (
        <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
          <Table
            columns={isLoading ? loadingColumns : columns}
            dataSource={isLoading ? skeletonData : finishedList}
            rowKey={(record) => record.id || record.key}
            pagination={false}
            scroll={{ x: 850 }}
            locale={{
              emptyText: (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 6, textAlign: "center", width: "100%" }}>
                  <Box sx={{ width: 90, height: 90, borderRadius: "50%", backgroundColor: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", mb: 2 }}>
                    <CheckCircleOutlinedIcon style={{ fontSize: "40px", color: theme.palette.primary.button1 }} />
                  </Box>
                  <Typography sx={{ fontSize: "18px", fontWeight: 700, color: theme.palette.primary.button1, mb: 1 }}>
                    سجل المقابلات فارغ حالياً
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: theme.palette.primary.chip, maxWidth: "420px", lineHeight: 1.6 }}>
                    لم يتم إتمام أو إنهاء أي طلبات تطوع بعد في النظام. يمكنك مراجعة الطلبات المعلقة لجدولتها أولاً.
                  </Typography>
                </Box>
              ),
            }}
            components={{
              header: {
                cell: (props) => (
                  <th {...props} style={{ backgroundColor: theme.palette.primary.button1, color: white, padding: "12px 8px", textAlign: "center", whiteSpace: "nowrap" }} />
                ),
              },
              body: {
                cell: (props) => (
                  <td {...props} style={{ backgroundColor: theme.palette.primary.Appar2, color: theme.palette.primary.chip, padding: "12px 8px", textAlign: "center" }} />
                ),
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FinishedInterviewsTable;