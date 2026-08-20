import React, { useMemo, useState } from "react";
import { Table, Space } from "antd";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { white, yallow } from "../../../style/color-main/color";
import { motion } from "framer-motion";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const HonorBoardTable = ({ rawData, isLoading, error, onView }) => {
  const theme = useTheme();
  const [selectedDepartment] = useState("الكل");
  const MotionBox = motion(Box);

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

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text) => (
        <Space style={{ direction: "rtl" }}>
          <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{text || "متطوع غير معروف"}</span>
        </Space>
      ),
    },
    {
      title: "القسم",
      dataIndex: "department",
      key: "department",
      width: 140,
      render: (text) => <span style={{ whiteSpace: "nowrap" }}>{text || "-"}</span>,
    },
    {
      title: "الرتبة",
      dataIndex: "rank",
      key: "rank",
      width: 120,
      render: (rank) => {
        if (rank === 1) return <span style={{ color: "#FFCC00", fontWeight: 800, whiteSpace: "nowrap" }}>🏆 الأول</span>;
        if (rank === 2) return <span style={{ color: "#B0BEC5", fontWeight: 800, whiteSpace: "nowrap" }}>🥈 الثاني</span>;
        if (rank === 3) return <span style={{ color: "#D2691E", fontWeight: 800, whiteSpace: "nowrap" }}>🥉 الثالث</span>;
        return <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>#{rank}</span>;
      },
    },
    {
      title: "الساعات",
      dataIndex: "hours", 
      key: "hours",
      width: 110,
      render: (hours) => <span style={{ whiteSpace: "nowrap" }}>{`${hours || 0} ساعة`}</span>,
    },
    {
      title: "النقاط",
      dataIndex: "points",
      key: "points",
      width: 110,
      render: (points) => (
        <span style={{ color: yallow || "#FFCC00", fontWeight: 700, fontSize: "16px", whiteSpace: "nowrap" }}>
          {points || 0}
        </span>
      ),
    },
    {
      title: "التفاصيل",
      key: "actions",
      width: 90,
      render: (_, record) => (
        <Tooltip title="عرض التفاصيل">
          <IconButton
            onClick={() => onView(record)}
            sx={{
              color: theme.palette.primary.button1,
              "&:hover": { backgroundColor: "rgba(22,45,107,0.08)" },
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const skeletonData = Array.from({ length: 5 }, (_, index) => ({
    key: `skeleton-honor-${index}`,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: col.key === "name" ? () => (
      <Space style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "32px", height: "32px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "50%" }} />
        <Box sx={{ width: "100px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Space>
    ) : col.key === "rank" ? () => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "55px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Box>
    ) : () => (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ width: "65px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.12)", borderRadius: "4px" }} />
        <MotionBox
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
          }}
        />
      </Box>
    ),
  }));

  const renderTableLocale = () => {
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

    if (!isLoading && honorData.length === 0) {
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
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box", direction: "rtl" }}>
      <Table
        columns={isLoading ? loadingColumns : columns}
        dataSource={isLoading ? skeletonData : honorData}
        pagination={false}
        scroll={{ x: "max-content" }}
        locale={renderTableLocale()}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ backgroundColor: theme.palette.primary.button1, color: white, textAlign: "center", padding: "12px 8px" }} />
            ),
          },
          body: {
            cell: (props) => (
              <td {...props} style={{ backgroundColor: theme.palette.primary.Appar2, color: theme.palette.primary.chip, textAlign: "center", padding: "12px 8px" }} />
            ),
          },
        }}
      />
    </div>
  );
};

export default HonorBoardTable;