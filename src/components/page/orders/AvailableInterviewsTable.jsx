import React, { useState, useEffect } from "react";
import { Table, Space, Button } from "antd";
import { CalendarOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Snackbar, Alert, Slide } from "@mui/material";
import { motion } from "framer-motion";
import { white, red2 } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchrequest_avalaible } from "../../../backend/slice/volnteers/request/avalible";
import { resetCancelStatus } from "../../../backend/slice/volnteers/request/cancelHrSlice"; 
import CancelInterviewModal from "./CancelInterviewModal"; 

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const AvailableInterviewsTable = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchrequest_avalaible);
  const { success: isCancelSuccess, error: cancelError } = useSelector((state) => state.cancelHr);

  const handleFetchData = () => {
    dispatch(fetchrequest_avalaible());
  };

  useEffect(() => {
    handleFetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isCancelSuccess) {
      setToast({
        open: true,
        message: "تم إلغاء فترة المقابلة الشاغرة بنجاح وحذفها من النظام!",
        severity: "success",
      });
      dispatch(resetCancelStatus());
      handleFetchData(); 
    }

    if (cancelError) {
      setToast({
        open: true,
        message: typeof cancelError === "string" ? cancelError : "حدث خطأ ما أثناء إلغاء الموعد!",
        severity: "error",
      });
      dispatch(resetCancelStatus());
    }
  }, [isCancelSuccess, cancelError, dispatch]);

  const MotionBox = motion(Box);
  const interviewsList = rawData?.data || (Array.isArray(rawData) ? rawData : []);

  const parseInterviewDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return { date: "غير محدد", timeFrom: "غير محدد", timeTo: "غير محدد" };
    try {
      const parts = dateTimeStr.split(" ");
      const date = parts[0]; 
      const timeFrom = parts[1]; 

      let timeTo = "غير محدد";
      if (timeFrom) {
        const [hour, minute] = timeFrom.split(":");
        const nextHour = (parseInt(hour, 10) + 1).toString().padStart(2, "0");
        timeTo = `${nextHour}:${minute}`; 
      }
      return { date, timeFrom, timeTo };
    } catch (e) {
      return { date: dateTimeStr, timeFrom: "--:--", timeTo: "--:--" };
    }
  };

  const handleOpenCancel = (record) => {
    setSelectedInterview(record);
    setOpenCancelModal(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  // دالة موازنة وتعديل الألوان حسب طلبكِ
  const getStatusDetails = (status) => {
    switch (status) {
      case "available":
        return { text: "شاغرة", color: "#FF9800" }; 
      case "booked":
        return { text: "محجوزة", color: "#4CAF50" }; 
      case "cancelled":
        return { text: "ملغاة", color: red2 }; 
      default:
        return { text: status || "غير محدد", color: theme.palette.primary.chip };
    }
  };

  const columns = [
    {
      title: "التاريخ",
      dataIndex: "interview_at",
      key: "date",
      render: (interviewAt) => {
        const { date } = parseInterviewDateTime(interviewAt);
        return (
          <Space>
            <CalendarOutlined style={{ color: theme.palette.primary.button1 }} />
            <span>{date}</span>
          </Space>
        );
      },
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { text, color } = getStatusDetails(status);
        return (
          <span style={{ color, fontWeight: 600 }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "من الساعة",
      dataIndex: "interview_at",
      key: "time_from",
      render: (interviewAt) => {
        const { timeFrom } = parseInterviewDateTime(interviewAt);
        return <span>{timeFrom}</span>;
      },
    },
    {
      title: "إلى الساعة",
      dataIndex: "interview_at",
      key: "time_to",
      render: (interviewAt) => {
        const { timeTo } = parseInterviewDateTime(interviewAt);
        return <span>{timeTo}</span>;
      },
    },
    {
      title: "المتطوع المحجوز",
      dataIndex: "volunteer",
      key: "volunteer",
      render: (volunteer) => {
        if (volunteer && typeof volunteer === "object") {
          return <span>{volunteer.name || "لا يوجد اسم"}</span>;
        }
        return <span>{volunteer || "لا يوجد (متاحة)"}</span>;
      },
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleOpenCancel(record)}
          style={{ color: red2, fontWeight: 500 }}
        >
          إلغاء الفترة
        </Button>
      ),
    },
  ];

  const skeletonData = Array.from({ length: 3 }, (_, index) => ({
    key: `skeleton-avail-${index}`,
    isSkeleton: true,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: () => (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ width: "70px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.12)", borderRadius: "4px" }} />
        <MotionBox
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />
      </Box>
    ),
  }));

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
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

      <Typography
        sx={{
          fontSize: { xs: "14px", sm: "16px", md: "20px" },
          fontWeight: 600,
          color: theme.palette.primary.text3,
          mb: 3,
        }}
      >
        فترات المواعيد المتاحة في النظام (المقابلات الشاغرة المجزأة)
      </Typography>

      {error && (
        <Box sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center" }}>
          <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
            حدث خطأ أثناء تحميل فترات المواعيد: {error}
          </Typography>
        </Box>
      )}

      {!error && (
        <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
          <Table
            columns={isLoading ? loadingColumns : columns}
            dataSource={isLoading ? skeletonData : interviewsList}
            rowKey={(record) => record.id || record.key}
            pagination={false}
            scroll={{ x: 850 }}
            locale={{
              emptyText: (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography sx={{ color: theme.palette.primary.text3, fontWeight: 500, fontSize: "15px" }}>
                    لا توجد فترات مواعيد متاحة حالياً في النظام.
                  </Typography>
                </Box>
              ),
            }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: theme.palette.primary.button1,
                      color: white,
                      padding: "12px 8px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  />
                ),
              },
              body: {
                cell: (props) => (
                  <td
                    {...props}
                    style={{
                      backgroundColor: theme.palette.primary.Appar2,
                      color: theme.palette.primary.chip,
                      padding: "12px 8px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  />
                ),
              },
            }}
          />
        </div>
      )}

      <CancelInterviewModal
        open={openCancelModal}
        onClose={() => {
          setOpenCancelModal(false);
          setSelectedInterview(null);
        }}
        selectedInterview={selectedInterview}
      />
    </Box>
  );
};

export default AvailableInterviewsTable;