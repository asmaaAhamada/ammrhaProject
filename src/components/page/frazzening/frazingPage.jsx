import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit"; // أيقونة التجميد المتناسقة مع الصفحة
import { white, yallow, babygreen, red2 } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchvolunteer_freeze } from "../../../backend/slice/frazzring/fetchAll";
import { motion } from "framer-motion";
import DeletList from "./retrayFreezen";
import Swal from "sweetalert2";
import { Desetion_frazzing } from "../../../backend/slice/frazzring/desetion";
const FrazzenPage = () => {
    const { status, Loading, Error } = useSelector((state) => state.Desetion_frazzing);
console.log(status)
  const userRole = useSelector((state) => state.user?.userInfo?.role);
  
  const [view, setView] = useState("requests");
  const theme = useTheme();
  const dispatch = useDispatch();

  // الستيت الخاصة بالتحكم بالمودال والبيانات المختارة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // جلب البيانات وحالة التحميل والخطأ من الـ Store
  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchvolunteer_freeze);
console.log(rawData)
  // استدعاء البيانات عند تحميل الصفحة
  React.useEffect(() => {
    dispatch(fetchvolunteer_freeze());
  }, [dispatch]);

  // استخراج المصفوفة الفعلية ديناميكياً
  const freezeList = rawData?.data?.data || rawData?.data || (Array.isArray(rawData) ? rawData : []);

  const MotionBox = motion(Box);

  // دالة لتحديث الجدول بعد إتمام العملية بنجاح
  const handleSuccessRefresh = () => {
    dispatch(fetchvolunteer_freeze());
  };

 const handleApprove = async (record) => {
  const result = await dispatch(
    Desetion_frazzing({
      id: record.id,
      status: "approved",
    })
  );

  if (Desetion_frazzing.fulfilled.match(result)) {
    Swal.fire({
      icon: "success",
      title: "تمت الموافقة",
      text: "تمت الموافقة على طلب التجميد بنجاح.",
    });

    dispatch(fetchvolunteer_freeze()); // إعادة تحميل الجدول
  }
};

const handleReject = async (record) => {
  const result = await dispatch(
    Desetion_frazzing({
      id: record.id,
      status: "rejected",
    })
  );

  if (Desetion_frazzing.fulfilled.match(result)) {
    Swal.fire({
      icon: "success",
      title: "تم الرفض",
      text: "تم رفض طلب التجميد بنجاح.",
    });

    dispatch(fetchvolunteer_freeze()); // إعادة تحميل الجدول
  }
};

  // ================= COLUMNS CONFIGURATION =================
  const columns = [
    {
      title: "اسم المتطوع",
      dataIndex: "volunteer_name",
      key: "volunteer_name",
      fixed: "left",
      width: 200,
      render: (text) => (
        <Space>
          <Avatar>{text ? text.charAt(0) : "م"}</Avatar>
          <span style={{ fontWeight: 500 }}>{text || "متطوع غير معروف"}</span>
        </Space>
      ),
    },
    {
      title: "تاريخ التجميد",
      dataIndex: "added_at",
      key: "added_at",
      width: 140,
    },
    {
      title: "بواسطة",
      dataIndex: "admin_name",
      key: "admin_name",
      width: 140,
      render: (admin) => <span>{admin || "المدير العام"}</span>,
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      width: 280,
      render: (reason) => {
        const displayReason = reason && reason.trim() !== "" ? reason : "لا يوجد سبب مسجل";
        return (
          <Tooltip 
            title={displayReason} 
            placement="top"
            overlayStyle={{ maxWidth: "300px" }}
          >
            <div 
              style={{ 
                maxWidth: "260px",
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap", 
                cursor: "pointer",
                color: theme.palette.primary.text3,
                margin: "0 auto"
              }}
            >
              {displayReason}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "الإجراءات / الحالة",
      key: "actions",
      fixed: "right",
      width: 220, // تم زيادة العرض ليستوعب الزرين بشكل مريح متجاورين
     render: (_, record) => {
  if (record.status === "مقبول") {
    return (
      <span
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "12px",
          background: "#e8f5e9",
          color: "#2e7d32",
          fontWeight: 700,
        }}
      >
        ✓ تمت الموافقة
      </span>
    );
  }

  if (record.status === "مرفوض") {
    return (
      <span
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "12px",
          background: "#ffebee",
          color: "#d32f2f",
          fontWeight: 700,
        }}
      >
        ✕ تم الرفض
      </span>
    );
  }

  // قيد الانتظار
  return (
    <Space size="small">
      <Button
      sx={{backgroundColor:'green'}}
        variant="contained"
        onClick={() => handleApprove(record)}
      >
    {Loading ? "..." : "قبول"}
      </Button>

      <Button
       sx={{backgroundColor:'red'}}
        variant="contained"
        onClick={() => handleReject(record)}
      >
    {Loading ? "..." : "رفض"}
      </Button>
    </Space>
  );
}
    },
  ];

  // ====== هيكل الـ Skeleton Shimmer للـ Body أثناء التحميل ======
  const skeletonData = Array.from({ length: 3 }, (_, index) => ({
    key: `skeleton-${index}`,
    isSkeleton: true,
  }));

  const loadingColumns = columns.map((col) => ({
    ...col,
    render: col.key === "volunteer_name" ? () => (
      <Space>
        <Box sx={{ width: "32px", height: "32px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "50%" }} />
        <Box sx={{ width: "90px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.15)", borderRadius: "4px" }} />
      </Space>
    ) : () => (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ width: "70px", height: "14px", bgcolor: "rgba(161, 169, 195, 0.12)", borderRadius: "4px" }} />
        <MotionBox
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />
      </Box>
    ),
  }));

  return (
    <div
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
        direction: "rtl"
      }}
    >
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
              كافة الحسابات المجمدة للمتطوعين
            </Typography>
          </Box>

          {error && (
            <Box sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center" }}>
              <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
                حدث خطأ أثناء تحميل الحسابات المجمدة: {error}
              </Typography>
            </Box>
          )}

          {!error && (
            <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
              <Table
                columns={isLoading ? loadingColumns : columns}
                dataSource={isLoading ? skeletonData : freezeList}
                rowKey={(record) => record.id || record.key}
                pagination={false}
                scroll={{ x: 850 }}
                locale={{
                  emptyText: (
                    <Box 
                      sx={{ 
                        display: "flex", flexDirection: "column", alignItems: "center", 
                        justifyContent: "center", py: 6, textAlign: "center", width: "100%" 
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 90, height: 90, borderRadius: "50%", 
                          backgroundColor: "#ffffff", display: "flex", 
                          alignItems: "center", justifyContent: "center",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", mb: 2 
                        }}
                      >
                        <AcUnitIcon style={{ fontSize: "40px", color: theme.palette.primary.button1 }} />
                      </Box>

                      <Typography 
                        sx={{ 
                          fontSize: "18px", fontWeight: 700, 
                          color: theme.palette.primary.button1, mb: 1 
                        }}
                      >
                        لا توجد حسابات مجمدة حالياً
                      </Typography>

                      <Typography 
                        sx={{ 
                          fontSize: "13px", color: theme.palette.primary.chip, 
                          maxWidth: "420px", lineHeight: 1.6 
                        }}
                      >
                        جميع حسابات المتطوعين نشطة وتعمل بشكل طبيعي في النظام. عند تجميد أي حساب، سيظهر في هذا الجدول مباشرة.
                      </Typography>
                    </Box>
                  ),
                }}
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
                        }}
                      />
                    ),
                  },
                }}
              />
            </div>
          )}
        </>
      )}

      {/* الـ Modal الحالي إذا كنت بحاجة إليه لاحقاً للإزالة من التجميد */}
      <DeletList
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCard={selectedCard}
        onSuccess={handleSuccessRefresh}
      />
    </div>
  );
};

export default FrazzenPage;