import React, { useState, useEffect } from "react";
import { Table, Avatar, Space, Tooltip, Spin } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { white, red2, babygreen, yallow } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlack_list } from "../../../backend/slice/blakList/fetchAll";
import { LockOutlined, PauseCircleOutlined } from "@ant-design/icons";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"; 
import DeletList from "./retrayBlack_LIst";
import Swal from "sweetalert2";
import { Desetion_Black } from "../../../backend/slice/blakList/desetion";

const BlackListPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [view, setView] = useState("requests");

  // حالة فلترة النوع: "all" | "حظر" | "تجميد"
  const [filterType, setFilterType] = useState("all");

  // جلب دور المستخدم من الـ Redux Store
  const userRole = useSelector((state) => state.user?.userInfo?.role);

  // إعدادات التحكم بالستيت للمودال
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // استخراج البيانات، وحالة التحميل والخطأ
  const { data, isLoading, error } = useSelector((state) => state.fetchBlack_list);

  // التأكد من أن البيانات مصفوفة
  const blacklistItems = Array.isArray(data) ? data : data?.data || [];

  const handleFetchData = () => {
    dispatch(fetchBlack_list());
  };

  useEffect(() => {
    handleFetchData();
  }, [dispatch]);

  // تصفية البيانات حسب النوع المحدد من الفلتر
  const filteredData = blacklistItems.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  // معالجة قبول الطلب
  const handleApprove = async (record) => {
    const result = await Swal.fire({
      title: "قبول الطلب؟",
      text: `هل أنت متأكد من قبول إتمام إجراء (${record.type || "الإجراء"}) للمتطوع؟`,
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
        title: res.payload?.message || "تم قبول الطلب بنجاح",
        timer: 1500,
        showConfirmButton: false,
      });

      dispatch(fetchBlack_list());
    }
  };

  // معالجة رفض الطلب
  const handleReject = async (record) => {
    const result = await Swal.fire({
      title: "رفض الطلب؟",
      text: `هل أنت متأكد من رفض طلب (${record.type || "الإجراء"}) للمتطوع؟`,
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
        title: res.payload?.message || "تم رفض الطلب بنجاح",
        timer: 1500,
        showConfirmButton: false,
      });

      dispatch(fetchBlack_list());
    }
  };

  const columns = [
    {
      title: "اسم المتطوع",
      dataIndex: "volunteer_name", 
      key: "volunteer_name",
      render: (text, record) => {
        const isFreeze = record.type === "تجميد";
        const avatarBg = isFreeze ? "rgba(255, 193, 7, 0.2)" : "rgba(255, 77, 79, 0.2)";
        const avatarColor = isFreeze ? "#d97706" : red2;

        return (
          <Space>
            <Avatar style={{ backgroundColor: avatarBg, color: avatarColor, fontWeight: "bold" }}>
              {text ? text.charAt(0).toUpperCase() : "V"}
            </Avatar>
            <span style={{ fontWeight: 600 }}>{text || "غير محدد"}</span>
          </Space>
        );
      },
    },
    {
      title: "التاريخ",
      dataIndex: "started_at",
      key: "started_at",
      render: (date) => {
        // اقتطاع الوقت وإظهار التاريخ فقط
        const formattedDate = date ? date.split(" ")[0] : "غير متوفر";
        return (
          <span style={{ direction: "ltr", display: "inline-block" }}>
            {formattedDate}
          </span>
        );
      },
    },
    {
      title: "النوع / الإجراء",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const isFreeze = type === "تجميد";
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "12px",
              border: `1px solid ${isFreeze ? yallow : red2}`,
              color: isFreeze ? "#b45309" : red2,
              backgroundColor: isFreeze ? "rgba(255, 193, 7, 0.12)" : "rgba(255, 77, 79, 0.08)",
              fontWeight: 700,
              fontSize: "13px"
            }}
          >
            {isFreeze ? (
              <PauseCircleOutlined style={{ fontSize: "13px" }} />
            ) : (
              <LockOutlined style={{ fontSize: "13px" }} />
            )}
            {type || "حظر"}
          </span>
        );
      },
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      render: (reason) => (
        <Tooltip 
          title={reason} 
          placement="top"
          overlayStyle={{ maxWidth: "300px" }}
        >
          <div 
            style={{ 
              maxWidth: "200px",
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              whiteSpace: "nowrap", 
              cursor: "pointer",
              color: theme.palette.primary.text3,
              margin: "0 auto"
            }}
          >
            {reason || "لا يوجد سبب مذكور"}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "بواسطة",
      dataIndex: "admin_name",
      key: "admin_name",
      render: (admin) => (
        <span style={{ fontSize: "13px", color: theme.palette.primary.chip }}>
          {admin || "—"}
        </span>
      ),
    },
    {
      title: "الإجراءات / الحالة",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          {userRole === "admin" && (
            <>
              {record.status === "قيد الانتظار" ? (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleApprove(record)}
                    sx={{
                      backgroundColor: babygreen,
                      color: white,
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#388e3c" }
                    }}
                  >
                    قبول
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleReject(record)}
                    sx={{
                      backgroundColor: red2,
                      color: white,
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#d32f2f" }
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

          {userRole !== "admin" && (
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
                    : "rgba(255,193,7,.15)",
                color:
                  record.status === "مقبول"
                    ? babygreen
                    : record.status === "مرفوض"
                    ? red2
                    : "#b45309",
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

          <Typography 
            sx={{ 
              fontSize: "18px", fontWeight: 700, 
              color: theme.palette.primary.button1, mb: 1 
            }}
          >
            لا توجد سجلات مطابقة
          </Typography>

          <Typography 
            sx={{ 
              fontSize: "13px", color: theme.palette.primary.chip, 
              maxWidth: "450px", lineHeight: 1.6 
            }}
          >
            لا يوجد أي متطوعين ينطبق عليهم هذا الفلتر حالياً في النظام.
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
        boxSizing: "border-box",
        direction: "rtl"
      }}
    >
      {view === "requests" && (
        <>
          {/* الشريط العلوي مع تنسيق المحاذاة بين العنوان والفلتر */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row-reverse" },
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                fontWeight: 700,
                color: theme.palette.primary.text3,
              }}
            >
              قائمة المحظورين والمجمدين
            </Typography>

            {/* أزرار الفلترة محشورة للداخل ومحاذية جهة اليمين بوضوح */}
            <ToggleButtonGroup
              value={filterType}
              exclusive
              onChange={(e, newFilter) => {
                if (newFilter !== null) setFilterType(newFilter);
              }}
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.Appar2,
                borderRadius: "10px",
                p: "4px",
                width: "fit-content",
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: "8px !important",
                  px: 2,
                  py: 0.8,
                  fontWeight: 600,
                  fontSize: "13px",
                  color: theme.palette.primary.chip,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.button1,
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.button1,
                    },
                  },
                },
              }}
            >
              <ToggleButton value="all">الكل ({blacklistItems.length})</ToggleButton>
              <ToggleButton value="حظر">
                حظر ({blacklistItems.filter(i => i.type === "حظر").length})
              </ToggleButton>
              <ToggleButton value="تجميد">
                تجميد ({blacklistItems.filter(i => i.type === "تجميد").length})
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden" }}>
            <Table
              columns={columns}
              dataSource={isLoading ? [] : filteredData}
              rowKey={(record) => record.id} 
              pagination={{ pageSize: 10 }}
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