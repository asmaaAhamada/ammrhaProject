import React from "react";
import { useTheme } from "@mui/material/styles";
import { Table, Avatar, Space, Tooltip } from "antd";
import BlockIcon from "../../../assets/icons/block.svg?react";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";
import { babygreen, white, yallow } from "../../../style/color-main/color";
import { Button } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
export default function VolunteersTable() {
  const theme = useTheme();

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
      fixed: 'left', // تثبيت العمود عند السكرول في الموبايل
      width: 150,    // عرض ثابت لضمان الوضوح
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
      width: 120,
    },
    {
      title: "إجمالي النقاط",
      dataIndex: "points",
      key: "points",
      width: 120,
    },
    {
      title: "الساعات ↓",
      dataIndex: "hours",
      key: "hours",
      width: 100,
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
              border: `1px solid ${isActive ? babygreen : yallow}`,
              color: isActive ? babygreen : yallow,
              backgroundColor: isActive
                ? "rgba(5, 223, 114, 0.08)"
                : "rgba(255, 152, 0, 0.08)",
              fontWeight: 600,
              whiteSpace: "nowrap", // منع النص من النزول لسطر جديد
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
      fixed: 'right', // تثبيت الأزرار جهة اليمين (أو اليسار حسب اتجاه اللغة)
      width: 150,
      render: () => (
        <Space size="middle">
           <Tooltip title="عرض">
            <Button size="small" sx={{ minWidth: 'auto' }}><VisibilityOutlinedIcon sx={{color:theme.palette.primary.card}} /></Button>
          </Tooltip>
          <Tooltip title="تجميد">
            <Button size="small" sx={{ minWidth: 'auto' }}><FrazenIcon /></Button>
          </Tooltip>
          <Tooltip title="حظر">
            <Button size="small" color="error" sx={{ minWidth: 'auto' }}><BlockIcon width={20} height={20} /></Button>
          </Tooltip>
         
        </Space>
      ),
    },
  ];

  
    // داخل VolunteersTable.js
return (
  // أضفنا max-width و overflowX لضمان عدم خروج الجدول عن النص
  <div style={{ 
    padding: "10px", 
    width: "100%", 
    maxWidth: "100vw", // يضمن عدم تجاوز عرض الشاشة
    overflowX: "hidden", // يمنع السكرول الخارجي
    boxSizing: "border-box" 
  }}>
    
    <Button 
      sx={{ 
        backgroundColor: theme.palette.primary.button1,
        color: white,
        borderRadius: '12px',
        width: { xs: '100%', sm: '245px' }, 
        height: { xs: '40px', md: '43px' },
        marginBottom: '15px'         
      }} 
    >
      مشاهدة جميع المتطوعين
    </Button>

    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      // تأكد أن العرض هنا لا يكسر التصميم
      scroll={{ x: "max-content" }} // الأفضل استخدام max-content بدل رقم ثابت أحياناً
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

  );

}