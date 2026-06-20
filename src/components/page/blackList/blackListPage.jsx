import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip, Spin } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { white, red2, babygreen, yallow } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlack_list } from "../../../backend/slice/blakList/fetchAll";
import { LockOutlined } from "@ant-design/icons";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"; // أيقونة حظر أنيقة متناسقة مع التصميم
import DeletList from "./retrayBlack_LIst";

const BlackListPage = () => {
  console.log("BlackListPage Rendered");

  const dispatch = useDispatch();
  const theme = useTheme();
  const [view, setView] = useState("requests");

  // جلب دور المستخدم الحالي (Role) من الـ Redux Store
  const userRole = useSelector((state) => state.user?.userInfo?.role);

  // إعدادات الستيت للتحكم بفتح المودال والمتطوع المختار لإلغاء حظره
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // استخراج البيانات، وحالة التحميل، والخطأ من السلايس الخاص بالـ Fetch
  const { data, isLoading, error } = useSelector((state) => state.fetchBlack_list);
  
  const blacklistItems = data?.items || [];

  const handleFetchData = () => {
    dispatch(fetchBlack_list());
  };

  React.useEffect(() => {
    console.log("dispatching...");
    handleFetchData();
  }, [dispatch]);

  // دالتين للتحكم بقبول أو رفض الطلب من قبل الأدمن مباشرة (يمكنك ربطهم مع الـ API الخاص بك)
  const handleApprove = (record) => {
    console.log("تم قبول طلب إضافة المتطوع للقائمة السوداء:", record);
    // هنا تضع أكشن القبول الخاص بك أو تفتح مودال التأكيد
  };

  const handleReject = (record) => {
    console.log("تم رفض طلب إضافة المتطوع للقائمة السوداء:", record);
    // هنا تضع أكشن الرفض الخاص بك أو تفتح مودال التأكيد
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "volunteer_name", 
      key: "volunteer_name",
      fixed: "left",
      width: 180,
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: "rgba(255, 77, 79, 0.2)", color: red2 }}>
            {text ? text.charAt(0).toUpperCase() : "V"}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "created_at", 
      key: "created_at",
      width: 140,
    },
    {
      title: "الحالة البصرية",
      key: "visual_status",
      width: 120,
      render: () => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 12px",
            borderRadius: "12px",
            border: `1px solid ${red2}`,
            color: red2,
            backgroundColor: "rgba(255, 77, 79, 0.08)",
            fontWeight: 600,
            fontSize: "13px"
          }}
        >
          <LockOutlined style={{ fontSize: "12px" }} />
          محظور
        </span>
      ),
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      width: 260,
      render: (reason) => (
        <Tooltip 
          title={reason} 
          placement="top"
          overlayStyle={{ maxWidth: "300px" }}
        >
          <div 
            style={{ 
              maxWidth: "240px",
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              whiteSpace: "nowrap", 
              cursor: "pointer",
              color: theme.palette.primary.text3,
              margin: "0 auto"
            }}
          >
            {reason}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "الإجراءات / الحالة",
      key: "actions",
      fixed: "right",
      width: 220, // تم زيادة العرض ليتناسق مع وجود الزرين بجانب بعضهما
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

  const renderTableLocale = () => {
    if (isLoading) {
      return {
        emptyText: (
          <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Spin size="large" />
            <Typography style={{ color: theme.palette.primary.chip }}>جاري تحميل البيانات...</Typography>
          </Box>
        ),
      };
    }
    
    if (error) {
      return {
        emptyText: (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography style={{ color: "red", fontWeight: 600 }}>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.</Typography>
          </Box>
        ),
      };
    }

    return {
      emptyText: (
        <Box 
          sx={{ 
            display: "flex", flexDirection: "column", alignItems: "center", 
            justifyContent: "center", py: 6, textAlign: "center", width: "100%" 
          }}
        >
          {/* الدائرة البيضاء الأنيقة الحاضنة لأيقونة الحظر */}
          <Box 
            sx={{ 
              width: 90, height: 90, borderRadius: "50%", 
              backgroundColor: "#ffffff", display: "flex", 
              alignItems: "center", justifyContent: "center",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", mb: 2 
            }}
          >
            <BlockOutlinedIcon style={{ fontSize: "40px", color: theme.palette.primary.button1 }} />
          </Box>

          {/* العنوان العريض والواضح */}
          <Typography 
            sx={{ 
              fontSize: "18px", fontWeight: 700, 
              color: theme.palette.primary.button1, mb: 1 
            }}
          >
            القائمة السوداء فارغة تماماً
          </Typography>

          {/* الوصف المساعد للمستخدم */}
          <Typography 
            sx={{ 
              fontSize: "13px", color: theme.palette.primary.chip, 
              maxWidth: "450px", lineHeight: 1.6 
            }}
          >
            قائمتك السوداء نقية! لا يوجد أي متطوعين محظورين في النظام حالياً، مما يعني أن الجميع يلتزم بالسياسات والقوانين المحددة.
          </Typography>
        </Box>
      ),
    };
  };

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
              كافة المتطوعين في القائمة السوداء
            </Typography>
          </Box>

          <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
            <Table
              columns={columns}
              dataSource={isLoading ? [] : blacklistItems}
              rowKey={(record) => record.id || record.volunteer_name} 
              pagination={false}
              scroll={{ x: 820 }}
              locale={renderTableLocale()} 
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
        </>
      )}

      {/* مودال الحذف/الإزالة الاختياري */}
      <DeletList 
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedVolunteer(null);
        }}
        selectedCard={selectedVolunteer}
        onSuccess={handleFetchData}
      />
    </div>
  );
};

export default BlackListPage;