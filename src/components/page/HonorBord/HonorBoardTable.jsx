import React, { useMemo, useState } from "react";
import { Table, Avatar, Space, Spin, Button, Dropdown, Menu } from "antd";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { white, yallow } from "../../../style/color-main/color";

const HonorBoardTable = ({ rawData, isLoading, error }) => {
  const theme = useTheme();
  const [selectedDepartment, setSelectedDepartment] = useState("الكل");

  const departmentsFilterData = ["الكل", "التصميم", "الصحة", "البيئة", "تنظيم الفعاليات", "التسويق"];

  const honorData = useMemo(() => {
    const list = Array.isArray(rawData) ? rawData : rawData?.data || [];
    
    const mappedList = list.map((item, index) => ({
      ...item,
      key: item.id?.toString() || Math.random().toString(),
      rank: item.rank || index + 1, 
    }));

    if (selectedDepartment === "الكل") return mappedList;
    return mappedList.filter((item) => item.department === selectedDepartment);
  }, [rawData, selectedDepartment]);

  const filterMenu = (
    <Menu onClick={(e) => setSelectedDepartment(e.key)} selectedKeys={[selectedDepartment]}>
      {departmentsFilterData.map((dept) => (
        <Menu.Item key={dept}>{dept}</Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      width: 250,
      align: "center",
      render: (text, record) => (
        <Space style={{ direction: "rtl" }}>
          <Avatar src={record.avatar}>{!record.avatar && text?.charAt(0).toUpperCase()}</Avatar>
          <span style={{ fontWeight: 600 }}>{text || "متطوع غير معروف"}</span>
        </Space>
      ),
    },
    {
      title: "القسم",
      dataIndex: "department",
      key: "department",
      align: "center",
      render: (text) => text || "-",
    },
    {
      title: "الرتبة",
      dataIndex: "rank",
      key: "rank",
      align: "center",
      render: (rank) => {
        if (rank === 1) return <span style={{ color: "#FFCC00", fontWeight: 800 }}>🏆 الأول</span>;
        if (rank === 2) return <span style={{ color: "#B0BEC5", fontWeight: 800 }}>🥈 الثاني</span>;
        if (rank === 3) return <span style={{ color: "#D2691E", fontWeight: 800 }}>🥉 الثالث</span>;
        return <span style={{ fontWeight: 500 }}>#{rank}</span>;
      },
    },
    {
      title: "الساعات",
      dataIndex: "hours", 
      key: "hours",
      align: "center",
      render: (hours) => `${hours || 0} ساعة`,
    },
    {
      title: "النقاط",
      dataIndex: "points",
      key: "points",
      align: "center",
      render: (points) => (
        <span style={{ color: yallow || "#FFCC00", fontWeight: 700, fontSize: "16px" }}>
          {points || 0}
        </span>
      ),
    },
  ];

  const renderTableBody = () => {
    if (isLoading) {
      return {
        emptyText: (
          <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Spin size="large" />
            <Typography sx={{ color: theme.palette.primary.chip, fontWeight: 500 }}>
              جاري تحميل لوحة الصدارة...
            </Typography>
          </Box>
        ),
      };
    }

    if (error) {
      return {
        emptyText: (
          <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ color: "error.main", fontWeight: 600, fontSize: "15px" }}>
              حدث خطأ أثناء جلب البيانات: {error}
            </Typography>
          </Box>
        ),
      };
    }

    if (honorData.length === 0) {
      return {
        emptyText: (
          <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: theme.palette.primary.text4, fontSize: "18px", fontWeight: 700 }}>
              لا توجد بيانات متاحة في هذا القسم
            </Typography>
          </Box>
        ),
      };
    }
    return {};
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, direction: "rtl" }}>
      {/* <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <Dropdown overlay={filterMenu} trigger={["click"]}>
          <Button 
            type="default" 
            style={{
              display: "flex", alignItems: "center", gap: "8px", borderRadius: "8px",
              fontWeight: 600, height: "40px", backgroundColor: theme.palette.primary.Appar2 || white
            }}
          >
            <FilterListIcon style={{ fontSize: "18px" }} />
            حسب القسم: {selectedDepartment}
            <ArrowDropDownIcon />
          </Button>
        </Dropdown>
      </Box> */}

      <Box sx={{ width: "100%", overflowX: "auto", display: "block" }}>
        <Table
          columns={columns}
          dataSource={isLoading || error ? [] : honorData}
          pagination={false}
          scroll={{ x: 800 }}
          locale={renderTableBody()}
          components={{
            header: {
              cell: (props) => (
                <th {...props} style={{ backgroundColor: theme.palette.primary.button1, color: white, textAlign: "center", padding: "14px 8px", whiteSpace: "nowrap" }} />
              ),
            },
            body: {
              cell: (props) => (
                <td {...props} style={{ backgroundColor: theme.palette.primary.Appar2, color: theme.palette.primary.chip, textAlign: "center", padding: "14px 8px" }} />
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default HonorBoardTable;