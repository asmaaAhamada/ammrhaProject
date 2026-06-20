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

const FrazzenPage = () => {
  const userRole = useSelector((state) => state.user?.userInfo?.role);
  
  const [view, setView] = useState("requests");
  const theme = useTheme();
  const dispatch = useDispatch();

  // الستيت الخاصة بالتحكم بالمودال والبيانات المختارة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // جلب البيانات وحالة التحميل والخطأ من الـ Store
  const { data: rawData, isLoading, error } = useSelector((state) => state.fetchvolunteer_freeze);

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

  // دالتين للتحكم بقبول أو رفض الطلب من قبل الأدمن مباشرة (يمكنك ربطهم مع الـ API الخاص بك)
  const handleApprove = (record) => {
    console.log("تم قبول طلب تجميد المتطوع:", record);
    // هنا تضع أكشن القبول الخاص بك أو تفتح مودال التأكيد
  };

  const handleReject = (record) => {
    console.log("تم رفض طلب تجميد المتطوع:", record);
    // هنا تضع أكشن الرفض الخاص بك أو تفتح مودال التأكيد
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
      render: (_, record) => (
        <Space size="small">
          {/* 🌟 إذا كان المستخدم آدمن: تعرض له أزرار القبول والرفض */}
          {userRole === "admin" && (
            <>
              {/* زر القبول الأخضر */}
              <Button
                variant="contained"
                onClick={() => handleApprove(record)}
                style={{
                  color: white,
                  backgroundColor: babygreen,
                  minWidth: "75px",
                  height: "32px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  boxShadow: "none"
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: babygreen,
                    opacity: 0.9,
                  }
                }}
              >
                قبول
              </Button>

              {/* زر الرفض الأحمر */}
              <Button
                variant="contained"
                onClick={() => handleReject(record)}
                style={{
                  color: white,
                  backgroundColor: red2 || "#f44336",
                  minWidth: "75px",
                  height: "32px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  boxShadow: "none"
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: red2 || "#f44336",
                    opacity: 0.9,
                  }
                }}
              >
                رفض
              </Button>
            </>
          )}

          {/* 🌟 إذا كان المستخدم مدير موارد بشرية (hr_general): تعرض له الحالة الحالية فقط للطلب */}
          {userRole === "hr_general" && (
            <span style={{
              display: "inline-block", 
              padding: "4px 14px", 
              borderRadius: "12px",
              border: `1px solid ${yallow}`, 
              color: yallow,
              backgroundColor: "rgba(255, 152, 0, 0.08)",
              fontWeight: 600, 
              whiteSpace: "nowrap",
              fontSize: "13px"
            }}>
              {record.status || "قيد الانتظار"}
            </span>
          )}
        </Space>
      ),
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