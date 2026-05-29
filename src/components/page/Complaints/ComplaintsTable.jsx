import React from "react";
import { Table, Avatar, Space, Tooltip, Tag } from "antd";
import { useTheme } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { babygreen, white, yallow } from "../../../style/color-main/color";

const ComplaintsTable = () => {
  const theme = useTheme();

  const data = [
    {
      key: "1",
      id: 1001,
      user: "أحمد محمد",
      department: "التطوع",
      date: "2025-06-01",
      status: "مفتوحة",
    },
    {
      key: "2",
      id: 1002,
      user: "سارة علي",
      department: "الموارد البشرية",
      date: "2025-06-02",
      status: "قيد المعالجة",
    },
    {
      key: "3",
      id: 1003,
      user: "محمد خالد",
      department: "الإدارة",
      date: "2025-06-03",
      status: "منتهية",
    },
  ];

  const statusColor = {
    مفتوحة: "blue",
    "قيد المعالجة": "orange",
    منتهية: "green",
  };

  const columns = [
    {
      title: "الرقم",
      dataIndex: "id",
      key: "id",
      width: 100,
      align: "center",
    },
    {
      title: "المستخدم",
      dataIndex: "user",
      key: "user",
      width: 220,
      align: "center",
      render: (text) => (
        <Space>
          <Avatar>{text.charAt(0)}</Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "القسم",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      align: "center",
    render: (status) => {
  let borderColor;
  let textColor;
  let backgroundColor;

  switch (status) {
    case "مفتوحة":
      borderColor = theme.palette.primary.button1;
      textColor = theme.palette.primary.button1;
      backgroundColor = "rgba(25, 118, 210, 0.08)";
      break;

    case "قيد المعالجة":
      borderColor = yallow;
      textColor = yallow;
      backgroundColor = "rgba(255, 152, 0, 0.08)";
      break;

    case "منتهية":
      borderColor = babygreen;
      textColor = babygreen;
      backgroundColor = "rgba(5, 223, 114, 0.08)";
      break;

    default:
      borderColor = "#999";
      textColor = "#999";
      backgroundColor = "rgba(153,153,153,0.08)";
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "12px",
        border: `1px solid ${borderColor}`,
        color: textColor,
        backgroundColor,
        fontWeight: 600,
        whiteSpace: "nowrap",
        minWidth: "100px",
      }}
    >
      {status}
    </span>
  );
},},
    {
      title: "الإجراءات",
      key: "actions",
      width: 120,
      align: "center",
      render: () => (
        <Tooltip title="مشاهدة التفاصيل">
          <VisibilityOutlinedIcon
            sx={{
              cursor: "pointer",
              color: theme.palette.primary.button1,
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 900 }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: theme.palette.primary.button1,
                  color: white,
                  textAlign: "center",
                  padding: "14px 8px",
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
                  textAlign: "center",
                  padding: "14px 8px",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default ComplaintsTable;