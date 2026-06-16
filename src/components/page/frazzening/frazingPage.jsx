import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchvolunteer_freeze } from "../../../backend/slice/frazzring/fetchAll";
import { motion } from "framer-motion";
import DeletList from "./retrayFreezen";

// 1. استيراد مودال التجميد/إلغاء الحظر

const FrazzenPage = () => {
  const [view, setView] = useState("requests");
  const theme = useTheme();
  const dispatch = useDispatch();

  // الستيت الخاصة بالتحكم بالمودال والبيانات المختارة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // جلب البيانات وحالة التحميل والخطأ من الـ Store
  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchvolunteer_freeze);

  // استدعاء البيانات عند تحميل الصفحة
  React.useEffect(() => {
    dispatch(fetchvolunteer_freeze());
  }, [dispatch]);

  // استخراج المصفوفة الفعلية ديناميكياً
  const freezeList = rawData?.data || (Array.isArray(rawData) ? rawData : []);

  const MotionBox = motion(Box);

  // دالة لتحديث الجدول بعد إتمام العملية بنجاح
  const handleSuccessRefresh = () => {
    dispatch(fetchvolunteer_freeze());
  };

  // ================= COLUMNS CONFIGURATION =================
  const columns = [
    {
      title: "اسم المتطوع",
      dataIndex: "volunteer_name",
      key: "volunteer_name",
      fixed: "left",
      width: 200,
      render: (text) => (
        <Space>
          <Avatar>{text ? text.charAt(0) : "م"}</Avatar>
          <span style={{ fontWeight: 500 }}>{text || "متطوع غير معروف"}</span>
        </Space>
      ),
    },
    {
      title: "تاريخ التجميد",
      dataIndex: "added_at",
      key: "added_at",
      width: 140,
    },
    {
      title: "بواسطة",
      dataIndex: "admin_name",
      key: "admin_name",
      width: 140,
      render: (admin) => <span>{admin || "المدير العام"}</span>,
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      width: 280,
      render: (reason) => {
        const displayReason = reason && reason.trim() !== "" ? reason : "لا يوجد سبب مسجل";
        return (
          <Tooltip 
            title={displayReason} 
            placement="top"
            overlayStyle={{ maxWidth: "300px" }}
          >
            <div 
              style={{ 
                maxWidth: "260px",
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap", 
                cursor: "pointer",
                color: theme.palette.primary.text3,
                margin: "0 auto"
              }}
            >
              {displayReason}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              // 2. تحديث السطر المختار وفتح المودال عند الضغط
              setSelectedCard(record);
              setIsModalOpen(true);
            }}
            style={{
              color: theme.palette.primary.text3,
              width: "130px",
              height: "32px",
              borderRadius: "6px",
              fontSize: "12px",
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.primary.text3}`,
              transition: "all 0.3s ease",
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: theme.palette.primary.main,
              }
            }}
          >
            إزالة من التجميد
          </Button>
        </Space>
      ),
    },
  ];

  // ====== هيكل الـ Skeleton Shimmer للـ Body أثناء التحميل ======
  const skeletonData = Array.from({ length: 3 }, (_, index) => ({
    key: `skeleton-${index}`,
    isSkeleton: true,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: col.key === "volunteer_name" ? () => (
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
        direction: "rtl"
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
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "20px" },
                fontWeight: 600,
                color: theme.palette.primary.text3,
              }}
            >
              كافة الحسابات المجمدة للمتطوعين
            </Typography>
          </Box>

          {error && (
            <Box sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center" }}>
              <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
                حدث خطأ أثناء تحميل الحسابات المجمدة: {error}
              </Typography>
            </Box>
          )}

          {!error && (
            <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
              <Table
                columns={isLoading ? loadingColumns : columns}
                dataSource={isLoading ? skeletonData : freezeList}
                rowKey={(record) => record.id || record.key}
                pagination={false}
                scroll={{ x: 850 }}
                locale={{
                  emptyText: (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Typography sx={{ color: theme.palette.primary.text3, fontWeight: 500, fontSize: "15px" }}>
                        لا يوجد حسابات متطوعين مجمدة حالياً في النظام.
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
                        }}
                      />
                    ),
                  },
                }}
              />
            </div>
          )}
        </>
      )}

      {view === "finished" && (
        <FinishedInterviewsTable onBack={() => setView("requests")} />
      )}

      {/* 3. استدعاء المودال وتمرير الخصائص المناسبة */}
      <DeletList
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCard={selectedCard}
        onSuccess={handleSuccessRefresh}
      />
    </div>
  );
};

export default FrazzenPage;