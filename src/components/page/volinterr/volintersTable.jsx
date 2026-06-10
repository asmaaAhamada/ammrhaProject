// VolunteersTable.jsx

import React from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import BlockIcon from "../../../assets/icons/block.svg?react";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";

import {
  babygreen,
  white,
  yallow,
} from "../../../style/color-main/color";
import VolunteersStatsCards from "./VolunteersStatsCards ";

export default function VolunteersTable({ topContent, statsContent }) {
  const theme = useTheme();

  // ================= DATA =================
  const data = [
    {
      key: "1",
      name: "أحمد علي",
      avatar: "https://i.pravatar.cc/150?img=1",
      department: "الإعلام",
      points: 320,
      hours: 120,
      rank: "ذهبي",
      status: "نشط",
    },
    {
      key: "2",
      name: "سارة محمد",
      avatar: "https://i.pravatar.cc/150?img=5",
      department: "التنظيم",
      points: 280,
      hours: 95,
      rank: "فضي",
      status: "مجمّد",
    },
  ];

  // ================= COLUMNS =================
  const columns = [
    {
      title: "اسم المتطوع",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 180,

      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span>{record.name}</span>
        </Space>
      ),
    },

    {
      title: "القسم",
      dataIndex: "department",
      key: "department",
      width: 120,
    },

    {
      title: "إجمالي النقاط",
      dataIndex: "points",
      key: "points",
      width: 120,
    },

    {
      title: "الساعات",
      dataIndex: "hours",
      key: "hours",
      width: 100,

      render: (hours) => (
        <span
          style={{
            color: babygreen,
            fontWeight: 600,
          }}
        >
          {hours}
        </span>
      ),
    },

    {
      title: "الرتبة",
      dataIndex: "rank",
      key: "rank",
      width: 100,
    },

    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 120,

      render: (status) => {
        const isActive = status === "نشط";

        return (
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "12px",
              border: `1px solid ${
                isActive ? babygreen : yallow
              }`,
              color: isActive ? babygreen : yallow,
              backgroundColor: isActive
                ? "rgba(5, 223, 114, 0.08)"
                : "rgba(255, 152, 0, 0.08)",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {status}
          </span>
        );
      },
    },

    {
      title: "إجراءات",
      key: "actions",
      fixed: "right",
      width: 180,

      render: () => (
        <Space size="middle">
          <Tooltip title="عرض">
            <Button
              size="small"
              sx={{ minWidth: "auto" }}
            >
              <VisibilityOutlinedIcon
                sx={{
                  color:                    theme.palette.primary.button1
,
                }}
              />
            </Button>
          </Tooltip>

          <Tooltip title="تجميد">
            <Button
              size="small"
              sx={{ minWidth: "auto" }}
            >
              <FrazenIcon />
            </Button>
          </Tooltip>

          <Tooltip title="حظر">
            <Button
              size="small"
              color="error"
              sx={{ minWidth: "auto" }}
            >
              <BlockIcon width={20} height={20} />
            </Button>
          </Tooltip>
           {/* نقل */}
      <span
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: 600,
          color: theme.palette.primary.chip,
        }}
      >
        نقل
      </span>

      {/* ترقية */}
      <span
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: 600,
          color: babygreen,
        }}
      >
        ترقية
      </span>
        </Space>
      ),
    },
  ];

  // ================= RETURN =================
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
      {/* المحتوى العلوي الفلاتر أو الأزرار */}
      {topContent && (
        <div style={{ marginBottom: "15px" }}>
          {topContent}
        </div>
      )}

      {/* 2. تعديل هنا: الكاردات الإحصائية لن تعرض إلا إذا قمت بتمريرها صراحة */}
      {statsContent && (
        <div style={{ marginBottom: "15px" }}>
          {statsContent}
        </div>
      )}

      <Table
        columns={columns}
        dataSource={data}
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
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
}