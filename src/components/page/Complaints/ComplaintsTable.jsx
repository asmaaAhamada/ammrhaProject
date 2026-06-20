import React, { useMemo, useState } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline"; // أيقونة الشكاوى والرسائل الواردة المتناسقة
import { babygreen, white, yallow } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../../../backend/slice/complaints/fetchAll";
import { fetchDetailsComplaints } from "../../../backend/slice/complaints/deteails";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import { motion } from "framer-motion";

const ComplaintsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const MotionBox = motion(Box);
  const dispatch = useDispatch();

  // 1. جلب البيانات وحالة التحميل والخطأ بشكل صحيح من الـ Store
  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchComplaints);

  // استدعاء البيانات عند تحميل الصفحة
  React.useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  // 2. تجهيز البيانات الحقيقية وتوليد الـ key الخاص بـ Ant Design
  const complaintsData = useMemo(() => {
    const list = Array.isArray(rawData) ? rawData : rawData?.data || [];
    return list.map((item) => ({
      ...item,
      key: item.id?.toString() || Math.random().toString(),
    }));
  }, [rawData]);

  // ================= COLUMNS =================
  const columns = [
    {
      title: "الرقم",
      dataIndex: "id",
      key: "id",
      width: 100,
      align: "center",
    },
    {
      title: "المستخدم (المتطوع)",
      dataIndex: "creator", 
      key: "user",
      width: 220,
      align: "center",
      render: (creator) => {
        const displayText = creator?.name || "مستخدم غير معروف";
        return (
          <Space>
            <Avatar>{displayText.charAt(0).toUpperCase()}</Avatar>
            <span>{displayText}</span>
          </Space>
        );
      },
    },
    {
      title: "القسم",
      dataIndex: "department", 
      key: "department",
      align: "center",
      render: (department) => {
        return department?.name || "عام";
      },
    },
    {
      title: "التاريخ",
      dataIndex: "created_at", 
      key: "date",
      align: "center",
      render: (date) => date ? new Date(date).toLocaleDateString('ar-EG') : "-",
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
          case " تمت المعالجة":
          case "open":
            borderColor = babygreen;
            textColor = babygreen;
            backgroundColor = "rgba(5, 223, 114, 0.08)";
            break;

          case "قيد الانتظار": 
          case "قيد المعالجة":
          case "pending":
          case "processing":
            borderColor = yallow; 
            textColor = yallow;
            backgroundColor = "rgba(255, 152, 0, 0.08)";
            break;

          case "تمت المعالجة":
          case "resolved":
          case "closed":
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
            {status || "غير محدد"}
          </span>
        );
      },
    },
    {
      title: "الإجراءات",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Tooltip title="مشاهدة التفاصيل">
          <VisibilityOutlinedIcon
            onClick={() => {
              dispatch(fetchDetailsComplaints(record.id));
              setIsModalOpen(true);
            }}
            sx={{
              cursor: "pointer",
              color: theme.palette.primary.button1,
            }}
          />
        </Tooltip>
      ),
    },
  ];

  // ================= 3. هيكل الـ Skeleton Shimmer للـ Body =================
  const skeletonData = Array.from({ length: 5 }, (_, index) => ({
    key: `skeleton-complaint-${index}`,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: col.key === "id" ? () => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "40px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Box>
    ) : col.key === "user" ? () => (
      <Space style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "32px", height: "32px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "50%" }} />
        <Box sx={{ width: "90px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Space>
    ) : col.key === "actions" ? () => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "24px", height: "24px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Box>
    ) : () => (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ width: "70px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.12)", borderRadius: "4px" }} />
        
        <MotionBox
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
          }}
        />
      </Box>
    ),
  }));

  // ================= 4. دالة التحكم في عرض واجهة عدم وجود شكاوى =================
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

    if (!isLoading && complaintsData.length === 0) {
      return {
        emptyText: (
          <Box 
            sx={{ 
              display: "flex", flexDirection: "column", alignItems: "center", 
              justifyContent: "center", py: 6, textAlign: "center", width: "100%" 
            }}
          >
            {/* الدائرة البيضاء الحاضنة للأيقونة مثل تصميم الأخبار تماماً */}
            <Box 
              sx={{ 
                width: 90, height: 90, borderRadius: "50%", 
                backgroundColor: "#ffffff", display: "flex", 
                alignItems: "center", justifyContent: "center",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", mb: 2 
              }}
            >
              <MailOutlineIcon style={{ fontSize: "40px", color: theme.palette.primary.button1 }} />
            </Box>

            {/* عنوان الواجهة الفارغة الفريندلي */}
            <Typography 
              sx={{ 
                fontSize: "18px", fontWeight: 700, 
                color: theme.palette.primary.button1, mb: 1 
              }}
            >
              سجل الشكاوى فارغ حالياً
            </Typography>

            {/* الوصف المساعد للمستخدم */}
            <Typography 
              sx={{ 
                fontSize: "13px", color: theme.palette.primary.chip, 
                maxWidth: "420px", lineHeight: 1.6 
              }}
            >
              لا توجد شكاوى مقدمة من قبل المتطوعين حالياً. سيتم عرض كافة الشكاوى الواردة في النظام هنا فور إرسالها.
            </Typography>
          </Box>
        ),
      };
    }

    return {}; 
  };

  return (
    <Box 
      sx={{ 
        width: "100%", 
        maxWidth: "100%",     
        overflowX: "auto",     
        display: "block",      
        boxSizing: "border-box",
        direction: "rtl"
      }}
    >
      <Table
        columns={isLoading ? loadingColumns : columns}
        dataSource={isLoading ? skeletonData : complaintsData}
        pagination={false}
        scroll={{ x: 800 }}
        locale={renderTableLocale()}
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
      
      <ComplaintDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefreshList={() => dispatch(fetchComplaints())} 
      />
    </Box>
  );
};

export default ComplaintsTable;