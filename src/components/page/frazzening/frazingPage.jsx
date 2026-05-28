import React, { useState } from "react";
import { Table, Avatar, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { white } from "../../../style/color-main/color";

// في حال وجود جدول مقابلات منتهية مستقبلاً

const FrazzenPage = () => {
  const [view, setView] = useState("requests");
  const theme = useTheme();

  // إضافة نصوص حقيقية وطويلة لاختبار مرونة التول تيب والجدول
  const requestsData = [
    { 
      key: "1", 
      name: "Ahmed Ali", 
      date: "2026-05-20", 
      reason: "عدم التفاعل الجيد مع المؤسسة والغياب المتكرر عن الاجتماعات الأساسية بدون عذر مسبق" 
    },
    { 
      key: "2", 
      name: "Sara Mohamed", 
      date: "2026-05-21", 
      reason: "مخالفة شروط وسياسات التطوع الرقمي والتعامل غير اللائق مع الفريق" 
    },
  ];

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 180,
      render: (text) => (
        <Space>
          <Avatar>{text.charAt(0)}</Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 140,
    },
    {
      title: "السبب",
      dataIndex: "reason",
      key: "reason",
      width: 280, // عرض متزن ومناسب للسبب
      render: (reason) => (
        <Tooltip 
          title={reason} 
          placement="top"
          overlayStyle={{ maxWidth: "300px" }} // تحديد أقصى عرض للفقاعة لتنسيق النص الطويل داخلياً
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
              width: "120px", // زيادة العرض قليلاً ليستوعب النص العربي بأريحية دون التفاف
              height: "32px",
              borderRadius: "4px",
              fontSize: "12px",backgroundColor: "transparent", // خلفية شفافة ليبرز البوردر والخط
              border: `1px solid ${theme.palette.primary.text3}`,
            }}
          >
            إزالة من النجميد
          </Button>
        </Space>
      ),
    },
  ];

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
              كافة الحسابات المجمدة للمتطوعين 
            </Typography>
          </Box>

          {/* حاوية الـ scroll لضمان ريسبرنسف مثالي على الشاشات الصغيرة */}
          <div style={{ width: "100%", overflowX: "auto", borderRadius: "8px" }}>
            <Table
              columns={columns}
              dataSource={requestsData}
              pagination={false}
              scroll={{ x: 780 }} // تم تعديل الحجم الإجمالي ليناسب إضافة عمود السبب الجديد
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
                        // إزالة whiteSpace nowrap من الخلايا ليعمل الـ ellipsis المخصص للسبب بشكل صحيح
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

export default FrazzenPage;