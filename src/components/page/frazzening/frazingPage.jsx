
import React, { useState } from "react";
import { Table, Avatar, Space, Tag, Tooltip } from "antd";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";

import { Box, Button, Typography } from "@mui/material";
import { white } from "../../../style/color-main/color";

const FrazzenPage = () => {
  const [view, setView] = useState("requests");
  const theme = useTheme();

  const requestsData = [
    { key: "1", name: "Ahmed Ali", date: "2026-05-20" },
    { key: "2", name: "Sara Mohamed", date: "2026-05-21" },
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
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 180,

      render: () => (
        <Space size="middle">
         

          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 600,
              color: theme.palette.primary.card1,
              whiteSpace: "nowrap",
            }}
          >
إزالة التجميد          </span>
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

كافة حسابات المتطوعين المجمدة    </Typography>

        
          
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

export default FrazzenPage;