import React, { useState, lazy } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Button, Typography, Box } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import BlockIcon from "../../../assets/icons/block.svg?react";
import FrazenIcon from "../../../assets/icons/frazen.svg?react";

import { babygreen, white, yallow, red2 } from "../../../style/color-main/color";
import { fetchvolunteers } from "../../../backend/slice/volnteers/fetchAll";
import Frezzen_Modal from "../frazzening/frazingModal";
import AddBlack_ListModal from "./blacklistModal";
import TransferModal from "./TransferModal";
// 🌟 تأكدي من استيراد المودال الخاص بالحظر من مساره الصحيح هنا:

export default function VolunteersTable({ topContent, statsContent, isHomePage = false }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false); // 🌟 إضافة الـ State لمودال الحظر
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchvolunteers);
  
  const refreshTableData = () => {
    dispatch(fetchvolunteers());
  };

  React.useEffect(() => {
    refreshTableData();
  }, [dispatch]);

  const volunteersList = rawData?.data?.data || [];
  const displayedVolunteers = isHomePage ? volunteersList.slice(0, 2) : volunteersList;
  const MotionBox = motion(Box);

  // ================= COLUMNS =================
  const columns = [
    {
      title: "اسم المتطوع",
      dataIndex: "full_name",
      key: "full_name",
      fixed: "left",
      width: 180,
      render: (_, record) => (
        <Space style={{ cursor: "pointer" }} onClick={() => navigate(`/volunteers/${record.id}`)}>
          <Avatar src={record.image} alt={record.full_name}>
            {record.full_name ? record.full_name[0] : ""}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{record.full_name}</span>
        </Space>
      ),
    },
    {
      title: "القسم",
      dataIndex: "department",
      key: "department",
      width: 140,
      render: (department) => <span>{department?.name || "-"}</span>,
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
      render: (rank) => {
        const rankName = rank?.name || "-";
        let textColor = "#A1A9C3";
        let bgColor = "rgba(161, 169, 195, 0.08)";

        if (rankName === "برونزي") { textColor = "#CD7F32"; bgColor = "rgba(205, 127, 50, 0.1)"; } 
        else if (rankName === "فضي") { textColor = "#8E9AA6"; bgColor = "rgba(142, 154, 166, 0.12)"; } 
        else if (rankName === "ذهبي") { textColor = "#FF9800"; bgColor = "rgba(255, 152, 0, 0.1)"; } 
        else if (rankName === "بلاتيني") { textColor = "#00BCD4"; bgColor = "rgba(0, 188, 212, 0.1)"; } 
        else if (rankName === "ألماسي") { textColor = "#9C27B0"; bgColor = "rgba(156, 39, 176, 0.12)"; }

        return (
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: "12px",
            border: `1px solid ${textColor}`, color: textColor, backgroundColor: bgColor,
            fontWeight: 600, whiteSpace: "nowrap", fontSize: "13px"
          }}>
            {rankName}
          </span>
        );
      },
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const isActive = status === "نشط";
        const statusColor = isActive ? babygreen : yallow; 
        
        return (
          <span style={{
            display: "inline-block", padding: "4px 12px", borderRadius: "12px",
            border: `1px solid ${statusColor}`, color: statusColor,
            backgroundColor: isActive ? "rgba(5, 223, 114, 0.08)" : "rgba(255, 152, 0, 0.08)",
            fontWeight: 600, whiteSpace: "nowrap",
          }}>
            {status}
          </span>
        );
      },
    },
    {
      title: "إجراءات",
      key: "actions",
      fixed: "right",
      width: 220,
      render: (_, record) => {
        const isNotActive = record.status === "غير نشط" || record.status === "مجمد" || record.status === "محظور";

        return (
          <Space size="middle">
            <Tooltip title="عرض">
              <Button size="small" sx={{ minWidth: "auto" }} onClick={() => navigate(`/volunteers/${record.id}`)}>
                <VisibilityOutlinedIcon sx={{ color: theme.palette.primary.button1 }} />
              </Button>
            </Tooltip>

            {/* زر التجميد */}
            <Tooltip title={isNotActive ? "عرض تفاصيل الحساب وإلغاء التجميد" : "تجميد الحساب"}>
              <Button 
                size="small" 
                sx={{ 
                  minWidth: "auto",
                  backgroundColor: isNotActive ? "rgba(255, 152, 0, 0.12)" : "transparent",
                  borderRadius: "6px",
                  p: "4px",
                  border: isNotActive ? `1px solid ${yallow}` : "none",
                  "& svg": {
                    color: isNotActive ? yallow : "inherit",
                    fill: isNotActive ? yallow : "inherit"
                  }
                }}
                onClick={() => {
                  if (isNotActive) {
                    navigate("/frazing", { state: { searchName: record.full_name } });
                  } else {
                    setSelectedVolunteer(record);
                    setIsFreezeModalOpen(true);
                  }
                }}
              >
                <FrazenIcon />
              </Button>
            </Tooltip>

            {/* زر الحظر والقائمة السوداء */}
            <Tooltip title={isNotActive ? "مراجعة المتطوع في القائمة السوداء" : "إضافة للقائمة السوداء"}>
              <Button 
                size="small" 
                sx={{ 
                  minWidth: "auto",
                  backgroundColor: isNotActive ? "rgba(244, 67, 54, 0.12)" : "transparent",
                  borderRadius: "6px",
                  p: "4px",
                  border: isNotActive ? `1px solid ${red2 || "#f44336"}` : "none",
                }}
                onClick={() => {
                  if (isNotActive) {
                    navigate("/black", { state: { searchName: record.full_name } });
                  } else {
                    // 🌟 تم التعديل هنا لفتح مودال الحظر للحساب النشط
                    setSelectedVolunteer(record);
                    setIsBlockModalOpen(true); 
                  }
                }}
              >
                <BlockIcon 
                  width={20} 
                  height={20} 
                  style={{ color: isNotActive ? (red2 || "#f44336") : "inherit" }} 
                />
              </Button>
            </Tooltip>

{/* تعديل سطر النقل الحالي ليكون تفاعلياً */}
<span 
  style={{ textDecoration: "underline", cursor: "pointer", fontWeight: 600, color: theme.palette.primary.chip }}
  onClick={() => {
    setSelectedVolunteer(record);
    setIsTransferModalOpen(true);
  }}
> 
  نقل 
</span>            <span style={{ textDecoration: "underline", cursor: "pointer", fontWeight: 600, color: babygreen }}> ترقية </span>
          </Space>
        );
      },
    },
  ];

  // ====== هيكل الـ Skeleton Shimmer للـ Body أثناء التحميل ======
  const skeletonLength = isHomePage ? 2 : 5;
  const skeletonData = Array.from({ length: skeletonLength }, (_, index) => ({
    key: `skeleton-${index}`,
    isSkeleton: true,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: col.key === "actions" ? () => (
      <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
        <Box sx={{ width: "24px", height: "24px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
        <Box sx={{ width: "24px", height: "24px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
        <Box sx={{ width: "24px", height: "24px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Box>
    ) : col.key === "full_name" ? () => (
      <Space>
        <Box sx={{ width: "32px", height: "32px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "50%" }} />
        <Box sx={{ width: "80px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Space>
    ) : () => (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ width: "60px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.12)", borderRadius: "4px" }} />
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

  if (error) {
    return (
      <Box sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center", direction: "rtl" }}>
        <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
          حدث خطأ أثناء تحميل بيانات المتطوعين. يرجى المحاولة لاحقاً.
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ padding: "10px", width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box", direction: "rtl" }}>
      {topContent && <div style={{ marginBottom: "15px" }}>{topContent}</div>}
      {statsContent && <div style={{ marginBottom: "15px" }}>{statsContent}</div>}

      <Table
        columns={isLoading ? loadingColumns : columns}
        dataSource={isLoading ? skeletonData : displayedVolunteers}
        rowKey={(record) => record.id || record.key}
        pagination={false}
        scroll={{ x: "max-content" }}
        components={{
          header: {
            cell: (props) => <th {...props} style={{ backgroundColor: theme.palette.primary.button1, color: white, padding: "12px 8px", textAlign: "center" }} />
          },
          body: {
            cell: (props) => <td {...props} style={{ backgroundColor: theme.palette.primary.Appar2, color: theme.palette.primary.chip, padding: "12px 8px", textAlign: "center" }} />
          },
        }}
      />

      {/* مودال التجميد الحالي */}
      <Frezzen_Modal 
        open={isFreezeModalOpen}
        onClose={() => {
          setIsFreezeModalOpen(false);
          setSelectedVolunteer(null);
        }}
        selectedCard={selectedVolunteer}
        onSuccess={refreshTableData}
      />

      {/*   مودال الحظر */}
      <AddBlack_ListModal 
        open={isBlockModalOpen}
        onClose={() => {
          setIsBlockModalOpen(false);
          setSelectedVolunteer(null);
        }}
        selectedCard={selectedVolunteer}
        onSuccess={refreshTableData}
      />

      {/* مودال نقل المتطوع إلى قسم آخر */}
<TransferModal 
  open={isTransferModalOpen}
  onClose={() => {
    setIsTransferModalOpen(false);
    setSelectedVolunteer(null);
  }}
  selectedVolunteer={selectedVolunteer}
  onSuccess={refreshTableData}
/>
    </div>
  );
}