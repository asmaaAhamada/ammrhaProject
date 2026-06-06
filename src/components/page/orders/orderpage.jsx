import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import {
  EyeOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import FinishedInterviewsTable from "./InterviewsPage";
import { useTheme } from "@mui/material/styles";

import { white, yallow } from "../../../style/color-main/color";
import { Box, Button, Typography } from "@mui/material";

const RequestsComponent = () => {
  const [view, setView] = useState("requests");
  const theme = useTheme();

  const requestsData = [
    {
      key: "1",
      name: "Ahmed Ali",
      date: "2026-05-20",
      status: "قيد الانتظار",
    },
    {
      key: "2",
      name: "Sara Mohamed",
      date: "2026-05-21",
      status: "قيد الانتظار",
    },
  ];

  const handleCreateInterview = () => {
    console.log("Create Interview");
    // لاحقاً افتح Dialog أو Modal لإنشاء موعد جديد
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 180,
      render: (text) => (
        <Space>
          <Avatar>{text.charAt(0)}</Avatar>
          <span>{text}</span>
        </Space>
      ),
    },

    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 140,
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
          {status}
        </span>
      ),
    },

    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 140,

      render: () => (
        <Space size="middle">
          <Tooltip title="عرض">
            <Button size="small" sx={{ minWidth: "auto" }}>
              <EyeOutlined
                style={{ color: theme.palette.primary.card1 }}
              />
            </Button>
          </Tooltip>

         
        </Space>
      ),
    },
  ];

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

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                startIcon={<PlusOutlined />}
                onClick={handleCreateInterview}
                sx={{
                  width: {
                    xs: "160px",
                    sm: "190px",
                    md: "220px",
                  },
                  height: "43px",
                  backgroundColor: theme.palette.primary.button1,
                  color: white,
                  borderRadius: "12px",
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor:
                      theme.palette.primary.button1,
                    boxShadow: "none",
                  },
                }}
              >
                إنشاء موعد مقابلة
              </Button>

              <Button
                onClick={() => setView("finished")}
                sx={{
                  width: {
                    xs: "160px",
                    sm: "190px",
                    md: "220px",
                  },
                  height: "43px",
                  backgroundColor: theme.palette.primary.button1,
                  color: white,
                  borderRadius: "12px",
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor:
                      theme.palette.primary.button1,
                    boxShadow: "none",
                  },
                }}
              >
                عرض المقابلات المنتهية
              </Button>
            </Box>
          </Box>

          <Table
            columns={columns}
            dataSource={requestsData}
            pagination={false}
            scroll={{ x: "max-content" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor:
                        theme.palette.primary.button1,
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
                      backgroundColor:
                        theme.palette.primary.Appar2,
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
        </>
      )}

      {view === "finished" && (
        <FinishedInterviewsTable
          onBack={() => setView("requests")}
        />
      )}
    </div>
  );
};

export default RequestsComponent;