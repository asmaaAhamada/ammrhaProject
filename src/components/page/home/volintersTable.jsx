import React from "react";
import { useTheme } from "@mui/material/styles";

import {
  Table,
  Avatar,
  
  Space,
  Tag,
  Tooltip,
} from "antd";

import  BlockIcon  from "../../../assets/icons/block.svg?react";
import  FrazenIcon  from "../../../assets/icons/frazen.svg?react";

import { babygreen, babyyallow, white, yallow } from "../../../style/color-main/color";
import { Button } from "@mui/material";

export default function VolunteersTable() {
  const theme = useTheme()
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
    {
      key: "3",
      name: "خالد يوسف",
      avatar: "https://i.pravatar.cc/150?img=8",
      department: "العلاقات",
      points: 410,
      hours: 180,
      rank: "بلاتيني",
      status: "نشط",
    },
  ];

  const columns = [
    {
      title: "اسم المتطوع ↓",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },

    {
      title: "إجمالي النقاط",
      dataIndex: "points",
      key: "points",
    },

   {
  title: "الساعات ↓",
  dataIndex: "hours",
  key: "hours",
  sorter: (a, b) => a.hours - b.hours,
  render: (hours) => (
    <span style={{ color: babygreen, fontWeight: 600 }}>
      {hours}
    </span>
  ),
},
    {
      title: "الرتبة",
      dataIndex: "rank",
      key: "rank",
    },

    {
  title: "الحالة",
  dataIndex: "status",
  key: "status",
  render: (status) => {
    const isActive = status === "نشط";

    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "12px",
          border: `1px solid ${
            isActive ?babygreen: yallow
          }`,
          color:            isActive ?babygreen: yallow
,
          backgroundColor: isActive
            ? "rgba(5, 223, 114, 0.08)"
            : "rgba(255, 152, 0, 0.08)",
          fontWeight: 600,
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
      render: () => (
        <Space size="middle">
          <Tooltip title="تجميد">
            <Button
              type="text"
              icon={<FrazenIcon />}
            />
          </Tooltip>

          <Tooltip title="حظر">
            <Button
              type="text"
              danger
              icon={<BlockIcon width={24} height={24} />}
            />
          </Tooltip>

          <Tooltip title="عرض">
            <Button 
          
              type="text"
              icon={<FrazenIcon  />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 16,
      }}
    >
      {/* زر عرض الجميع */}
     
        <Button sx={{ backgroundColor: theme.palette.primary.button1,color:white,borderRadius:'12px',width:{xs:'200px',md:'245px'},  height:{xs:'30px',md:'43px' }  ,color:white,marginBottom:'2px'        
}} >
          مشاهدة جميع المتطوعين
        </Button>
    

      {/* الجدول */}
    <Table
  columns={columns}
  dataSource={data}
  pagination={false}
  components={{
    header: {
      cell: (props) => (
        <th
          {...props}
          style={{
            backgroundColor: theme.palette.primary.button1,
            color: white,
            padding: "16px",
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
            padding: "16px",
          }}
        />
      ),
    },
  }}
/>
    </div>
  );
}