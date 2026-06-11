import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip, Spin } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlack_list } from "../../../backend/slice/blakList/fetchAll";
import { CheckCircleOutlined } from "@ant-design/icons";
const BlackListPage = () => {
  console.log("BlackListPage Rendered");

  const dispatch = useDispatch();
  const theme = useTheme();
  const [view, setView] = useState("requests");

  // استخراج البيانات، وحالة التحميل، والخطأ من السلايس
  // ملاحظة: تم تعديل الوصول للاسم بناءً على هيكلية الـ state المتوقعة
  const { data, isLoading, error } = useSelector((state) => state.fetchBlack_list);
  
  // الوصول لمصفوفة العناصر القادمة من الريسبونس (data.items)
  const blacklistItems = data?.items || [];

  React.useEffect(() => {
    console.log("dispatching...");
    dispatch(fetchBlack_list());
  }, [dispatch]);

  const columns = [
    {
      title: "الاسم",
      dataIndex: "volunteer_name", // مطابقة للريسبونس الجديد
      key: "volunteer_name",
      fixed: "left",
      width: 180,
      render: (text) => (
        <Space>
          {/* حماية في حال كان الاسم فارغاً أو string وهمي */}
          <Avatar>{text ? text.charAt(0).toUpperCase() : "V"}</Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "created_at", // مطابقة للريسبونس الجديد
      key: "created_at",
      width: 140,
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      width: 280,
      render: (reason) => (
        <Tooltip 
          title={reason} 
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
            {reason}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      fixed: "right",
      width: 180,
      render: () => (
        <Space size="middle">
          <Button
            type="primary"
            style={{
              color: theme.palette.primary.text3,
              borderColor: "red",
              width: "120px",
              height: "32px",
              borderRadius: "4px",
              fontSize: "12px",
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.primary.text3}`,
            }}
          >
            إزالة من القائمة
          </Button>
        </Space>
      ),
    },
  ];

  // دالة مخصصة للتحكم بما يظهر داخل جسم الجدول (البودي) في الحالات الخاصة دون التأثير على الهيدر
  const renderTableLocale = () => {
    if (isLoading) {
      return {
        emptyText: (
          <Box sx={{ py: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Spin size="large" />
            <Typography style={{ color: theme.palette.primary.chip }}>جاري تحميل البيانات...</Typography>
          </Box>
        ),
      };
    }
    
    if (error) {
      return {
        emptyText: (
          <Box sx={{ py: 5 }}>
            <Typography style={{ color: "red" }}>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.</Typography>
          </Box>
        ),
      };
    }

    // الحالة الافتراضية عند عدم وجود بيانات (رسالة لطيفة)
    return {
      emptyText: (
        <Box sx={{ py: 5 }}>
          <Typography style={{ color: theme.palette.primary.chip, fontSize: "15px", fontWeight: 500 }}>
            قائمتك السوداء
             نقية! لا يوجد أي متطوعين في القائمة السوداء حالياً. 
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
              // تمرير المصفوفة القادمة من الـ API، وفي حال الـ Loading نمرر مصفوفة فارغة ليعمل الـ locale المخصص
              dataSource={isLoading ? [] : blacklistItems}
              rowKey={(record) => record.id || record.volunteer_name} // استخدام id الفريد من الـ API كـ key
              pagination={false}
              scroll={{ x: 780 }}
              locale={renderTableLocale()} // التحكم بالبودي (اللودر والرسائل اللطيفة)
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

      {view === "finished" && (
        <FinishedInterviewsTable onBack={() => setView("requests")} />
      )}
    </div>
  );
};

export default BlackListPage;