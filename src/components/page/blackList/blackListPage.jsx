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
import Swal from "sweetalert2";
import { Desetion_Black } from "../../../backend/slice/blakList/desetion";

const BlackListPage = () => {
    const { status, Loading, Error } = useSelector((state) => state.Desetion_Black);

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
 const handleApprove = async (record) => {
  const result = await Swal.fire({
    title: "قبول الطلب؟",
    text: "هل أنت متأكد من قبول إضافة المتطوع للقائمة السوداء؟",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "إلغاء",
  });

  if (!result.isConfirmed) return;

  const res = await dispatch(
    Desetion_Black({
      id: record.id,
      status: "approved",
    })
  );

  if (Desetion_Black.fulfilled.match(res)) {
    Swal.fire({
      icon: "success",
      title: res.payload.message,
      timer: 1500,
      showConfirmButton: false,
    });

    dispatch(fetchBlack_list());
  }
};

 const handleReject = async (record) => {
  const result = await Swal.fire({
    title: "رفض الطلب؟",
    text: "هل أنت متأكد من رفض إضافة المتطوع للقائمة السوداء؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "إلغاء",
  });

  if (!result.isConfirmed) return;

  const res = await dispatch(
    Desetion_Black({
      id: record.id,
      status: "rejected",
    })
  );

  if (Desetion_Black.fulfilled.match(res)) {
    Swal.fire({
      icon: "success",
      title: res.payload.message,
      timer: 1500,
      showConfirmButton: false,
    });

    dispatch(fetchBlack_list());
  }
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
    {userRole === "admin" && (
      <>
        {record.status === "قيد الانتظار" ? (
          <>
            <Button
              variant="contained"
              onClick={() => handleApprove(record)}
              sx={{
                backgroundColor: babygreen,
                color: white,
              }}
            >
              قبول
            </Button>

            <Button
              variant="contained"
              onClick={() => handleReject(record)}
              sx={{
                backgroundColor: red2,
                color: white,
              }}
            >
              رفض
            </Button>
          </>
        ) : (
          <span
            style={{
              padding: "5px 15px",
              borderRadius: "15px",
              fontWeight: 600,
              background:
                record.status === "مقبول"
                  ? "rgba(76,175,80,.1)"
                  : "rgba(244,67,54,.1)",
              color:
                record.status === "مقبول"
                  ? babygreen
                  : red2,
              border: `1px solid ${
                record.status === "مقبول"
                  ? babygreen
                  : red2
              }`,
            }}
          >
            {record.status}
          </span>
        )}
      </>
    )}

    {userRole === "hr_general" && (
      <span
        style={{
          padding: "5px 15px",
          borderRadius: "15px",
          fontWeight: 600,
          background:
            record.status === "مقبول"
              ? "rgba(76,175,80,.1)"
              : record.status === "مرفوض"
              ? "rgba(244,67,54,.1)"
              : "rgba(255,152,0,.1)",
          color:
            record.status === "مقبول"
              ? babygreen
              : record.status === "مرفوض"
              ? red2
              : yallow,
        }}
      >
        {record.status}
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