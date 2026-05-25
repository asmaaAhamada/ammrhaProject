import React, { useState } from "react";
import { Table, Avatar, Space, Tag, Tooltip } from "antd";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import FinishedInterviewsTable from "./InterviewsPage";
import { useTheme } from "@mui/material/styles";

import { white, babygreen, yallow } from "../../../style/color-main/color";
import { Box, Button, Typography } from "@mui/material";

const RequestsComponent = () => {
  const [view, setView] = useState("requests");
  const theme = useTheme();

  const requestsData = [
    { key: "1", name: "Ahmed Ali", date: "2026-05-20", status: "قيد الانتظار" },
    { key: "2", name: "Sara Mohamed", date: "2026-05-21", status: "قيد الانتظار" },
  ];

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
      width: 180,

      render: () => (
        <Space size="middle">
          <Tooltip title="عرض">
            <Button size="small" sx={{ minWidth: "auto" }}>
              <EyeOutlined style={{ color: theme.palette.primary.card1 }} />
            </Button>
          </Tooltip>

          <Tooltip title="تحديد موعد">
            <Button size="small" sx={{ minWidth: "auto" }}>
              <CalendarOutlined style={{ color: theme.palette.primary.card1 }} />
            </Button>
          </Tooltip>

          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 600,
              color: theme.palette.primary.card1,
              whiteSpace: "nowrap",
            }}
          >
            مقابلة
          </span>
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
        
      {/* top button */}
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
المقابلات قيد المراجعة         </Typography>

        
            <Button
              onClick={() => setView("finished")}
             sx={{
                            width: { xs: "150px", sm: "190px", md: "200px" },

             fontSize: { xs: "12px", sm: "14px", md: "16px" },

  height: "43px",
  backgroundColor: theme.palette.primary.button1,
  color: white,
  borderRadius: "12px",
  fontWeight: 600,

  "&:hover": {
    backgroundColor: theme.palette.primary.button1, // نفس اللون بدون تغيير
    boxShadow: "none",
  },
}}
            >
              عرض المقابلات المنتهية
            </Button>
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
        </>
      )}

      {view === "finished" && (
        <FinishedInterviewsTable onBack={() => setView("requests")} />
      )}
    </div>
  );
};

export default RequestsComponent;