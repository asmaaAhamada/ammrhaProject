import React from "react";
import { Table, Button, Space, Avatar } from "antd";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import { white, babygreen, yallow, red, blue1 } from "../../../style/color-main/color";

const FinishedInterviewsTable = ({ onBack }) => {
  const theme = useTheme();

  const finishedData = [
    {
      key: "1",
      name: "Omar Hassan",
      date: "2026-04-10",
      status: "منتهية",
    },
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
      title: "تاريخ المقابلة",
      dataIndex: "date",
      key: "date",
      width: 150,
    },

    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 140,

      render: () => (
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
          منتهية
        </span>
      ),
    },

    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 180,

      render: () => (
        <Space>
          <Button
            
            type="primary"
            style={{
              backgroundColor: blue1,
              borderColor: blue1,width:'67px',height:'27px',borderRadius:'4px'
            }}
          >
            قبول
          </Button>

          <Button 
           style={{
              backgroundColor: red,
              borderColor: red,width:'67px',height:'27px',borderRadius:'4px'
            }}
         >
            رفض
          </Button>
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 15,
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",      color: theme.palette.primary.text3,

        }}
      >
        <h3 style={{ margin: 0 }}>المقابلات المنتهية</h3>

        <Button
          onClick={onBack}
          style={{
            width: { xs: "130px", sm: "150px", md: "177px" },
                        height: "43px",
                        borderRadius: "12px",
                        backgroundColor: theme.palette.primary.button1,
                        color: white,
                        boxShadow: "none",
                        textTransform: "none",
                        fontWeight: 600,fontSize:'16px'
          }}
        >
          رجوع
                    <ArrowBackIosNewOutlinedIcon sx={{mr:2}} />
          
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={finishedData}
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
    </div>
  );
};

export default FinishedInterviewsTable;