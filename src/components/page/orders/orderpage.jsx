import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import FinishedInterviewsTable from "./InterviewsPage";
import { useTheme } from "@mui/material/styles";

import { white, yallow } from "../../../style/color-main/color";
import { Box, Button, Typography } from "@mui/material";
import { fetchrequest_pinding } from "../../../backend/slice/volnteers/request/pinding";
import { fetchrequest_details, resetrequest_details } from "../../../backend/slice/volnteers/request/details";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"; 

import VolunteerDetailsModal from "./VolunteerDetailsModal";
import CreateInterviewModal from "./CreateInterviewModal";
import AvailableInterviewsTable from "./AvailableInterviewsTable";

const RequestsComponent = () => {
  const { data, isLoading, error } = useSelector((state) => state.fetchrequest_pinding);
  const dispatch = useDispatch();
  const [view, setView] = useState("requests");
  const theme = useTheme();

  // ستيت التحكم في المودالات
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false); 

  const MotionBox = motion(Box);

  const handleFetchData = () => {
    dispatch(fetchrequest_pinding());
  };

  React.useEffect(() => {
    console.log("dispatching...");
    handleFetchData();
  }, [dispatch]);

  const handleCreateInterview = () => {
    setIsInterviewModalOpen(true);
  };

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
          <Avatar>{text ? text.charAt(0) : "؟"}</Avatar>
          <span>{text || "بدون اسم"}</span>
        </Space>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "interview_date",
      key: "interview_date",
      width: 140,
      render: (date) => <span>{date || "لم يحدد بعد"}</span>,
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
            border: `1px solid ${yallow}`,
            color: yallow,
            backgroundColor: "rgba(255, 152, 0, 0.08)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {status || "قيد الانتظار"}
        </span>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 140,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="عرض التفاصيل">
            <Button 
              size="small" 
              sx={{ minWidth: "auto" }}
              onClick={() => {
                dispatch(fetchrequest_details(record.id));
                setIsDetailsModalOpen(true);
              }}
            >
              <EyeOutlined style={{ color: theme.palette.primary.card1 }} />
            </Button>
          </Tooltip>
        </Space>
      ),
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
    <div
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
        direction: "rtl",
      }}
    >
      {view === "requests" && (
        <>
          <Box
            sx={{
              width: "100%",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "20px" },
                fontWeight: 600,
                color: theme.palette.primary.text3,
              }}
            >
              المقابلات قيد المراجعة
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                startIcon={<PlusOutlined />}
                onClick={handleCreateInterview} 
                sx={{
                  width: { xs: "160px", sm: "190px", md: "220px" },
                  height: "43px",
                  backgroundColor: theme.palette.primary.button1,
                  color: white,
                  borderRadius: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.button1,
                    boxShadow: "none",
                  },
                }}
              >
                إنشاء موعد مقابلة
              </Button>

              <Button
                onClick={() => setView("finished")}
                sx={{
                  width: { xs: "160px", sm: "190px", md: "220px" },
                  height: "43px",
                  backgroundColor: theme.palette.primary.button1,
                  color: white,
                  borderRadius: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.button1,
                    boxShadow: "none",
                  },
                }}
              >
                عرض المقابلات المنتهية
              </Button>
            </Box>
          </Box>

          {error && (
            <Box sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center" }}>
              <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
                حدث خطأ أثناء تحميل مقابلات قيد المراجعة: {error}
              </Typography>
            </Box>
          )}

          {!error && (
            <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
              <Table
                columns={isLoading ? loadingColumns : columns}
                dataSource={isLoading ? skeletonData : (data || [])}
                rowKey={(record) => record.id || record.key}
                pagination={false}
                scroll={{ x: 850 }}
                locale={{
                  emptyText: (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Typography sx={{ color: theme.palette.primary.text3, fontWeight: 500, fontSize: "15px" }}>
                        لا توجد مقابلات قيد المراجعة حالياً في النظام.
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

          {/* تم نقل الكومبوننت إلى هنا ليصبح تابعاً لشرط الـ requests فقط وتحت الجدول الأول 🌟 */}
          <AvailableInterviewsTable />
        </>
      )}

      {view === "finished" && (
        <FinishedInterviewsTable
          onBack={() => setView("requests")}
        />
      )}

      {/* مودال التفاصيل */}
      <VolunteerDetailsModal
        open={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          dispatch(resetrequest_details()); 
        }}
      />

      {/* مودال الإنشاء العام */}
      <CreateInterviewModal
        open={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
      />
    </div>
  );
};

export default RequestsComponent;