import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip, Spin } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { white, red2 } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlack_list } from "../../../backend/slice/blakList/fetchAll";
import { CheckCircleOutlined, LockOutlined } from "@ant-design/icons";
import DeletList from "./retrayBlack_LIst";

// 👇 استيراد مودال إلغاء الحظر المعدل

const BlackListPage = () => {
  console.log("BlackListPage Rendered");

  const dispatch = useDispatch();
  const theme = useTheme();
  const [view, setView] = useState("requests");

  // 🌟 إعدادات الستيت للتحكم بفتح المودال والمتطوع المختار لإلغاء حظره
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // استخراج البيانات، وحالة التحميل، والخطأ من السلايس الخاص بالـ Fetch
  const { data, isLoading, error } = useSelector((state) => state.fetchBlack_list);
  
  const blacklistItems = data?.items || [];

  const handleFetchData = () => {
    dispatch(fetchBlack_list());
  };

  React.useEffect(() => {
    console.log("dispatching...");
    handleFetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "الاسم",
      dataIndex: "volunteer_name", 
      key: "volunteer_name",
      fixed: "left",
      width: 180,
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: "rgba(255, 77, 79, 0.2)", color: red2 }}>
            {text ? text.charAt(0).toUpperCase() : "V"}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "created_at", 
      key: "created_at",
      width: 140,
    },
    {
      title: "الحالة البصرية",
      key: "visual_status",
      width: 120,
      render: () => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 12px",
            borderRadius: "12px",
            border: `1px solid ${red2}`,
            color: red2,
            backgroundColor: "rgba(255, 77, 79, 0.08)",
            fontWeight: 600,
            fontSize: "13px"
          }}
        >
          <LockOutlined style={{ fontSize: "12px" }} />
          محظور
        </span>
      ),
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      width: 260,
      render: (reason) => (
        <Tooltip 
          title={reason} 
          placement="top"
          overlayStyle={{ maxWidth: "300px" }}
        >
          <div 
            style={{ 
              maxWidth: "240px",
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              whiteSpace: "nowrap", 
              cursor: "pointer",
              color: theme.palette.primary.text3,
              margin: "0 auto"
            }}
          >
            {reason}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedVolunteer(record);
              setIsDeleteModalOpen(true);
            }}
            style={{
              color: theme.palette.primary.text3,
              borderColor: red2,
              width: "130px",
              height: "34px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.primary.text3}`,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = red2;
              e.currentTarget.style.borderColor = red2;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.palette.primary.text3;
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.border = `1px solid ${theme.palette.primary.text3}`;
            }}
          >
            إزالة من القائمة
          </Button>
        </Space>
      ),
    },
  ];

  const renderTableLocale = () => {
    if (isLoading) {
      return {
        emptyText: (
          <Box sx={{ py: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Spin size="large" />
            <Typography style={{ color: theme.palette.primary.chip }}>جاري تحميل البيانات...</Typography>
          </Box>
        ),
      };
    }
    
    if (error) {
      return {
        emptyText: (
          <Box sx={{ py: 5 }}>
            <Typography style={{ color: "red" }}>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.</Typography>
          </Box>
        ),
      };
    }

    return {
      emptyText: (
        <Box sx={{ py: 5 }}>
          <Typography style={{ color: theme.palette.primary.chip, fontSize: "15px", fontWeight: 500 }}>
            قائمتك السوداء نقية! لا يوجد أي متطوعين في القائمة السوداء حالياً. 
          </Typography>
        </Box>
      ),
    };
  };

  return (
    <div
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
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
              كافة المتطوعين في القائمة السوداء
            </Typography>
          </Box>

          <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
            <Table
              columns={columns}
              dataSource={isLoading ? [] : blacklistItems}
              rowKey={(record) => record.id || record.volunteer_name} 
              pagination={false}
              scroll={{ x: 820 }}
              locale={renderTableLocale()} 
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
        </>
      )}

      {/* 🌟 استدعاء المودال المعدل لفك الحظر وتمرير الداتا والـ Refresh */}
      <DeletList 
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedVolunteer(null);
        }}
        selectedCard={selectedVolunteer}
        onSuccess={handleFetchData}
      />
    </div>
  );
};

export default BlackListPage;