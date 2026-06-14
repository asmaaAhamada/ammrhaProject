import React, { useMemo, useState } from "react";
import { Table, Avatar, Space, Tooltip, Spin } from "antd";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { babygreen, white, yallow } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../../../backend/slice/complaints/fetchAll";
import { fetchDetailsComplaints } from "../../../backend/slice/complaints/deteails";
import ComplaintDetailsModal from "./ComplaintDetailsModal";

const ComplaintsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  // 1. جلب البيانات وحالة التحميل والخطأ بشكل صحيح من الـ Store (data وليس data2)
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
    dataIndex: "creator", // 👈 تم التعديل لأن الاسم يرجع داخل كائن الـ creator
    key: "user",
    width: 220,
    align: "center",
    render: (creator) => {
      // نأخذ الاسم من داخل كائن السيرفر creator.name
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
    dataIndex: "department", // 👈 يرجع كـ Object من الباكيند {id, name}
    key: "department",
    align: "center",
    render: (department) => {
      // نصل مباشرة لاسم القسم
      return department?.name || "عام";
    },
  },
  {
    title: "التاريخ",
    dataIndex: "created_at", // 👈 تم التعديل لأن السيرفر يرسلها باسم created_at وليس date
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

  // 1. أضفنا الحالات البرتقالية هنا وضممنا إليها "قيد الانتظار"
  case "قيد الانتظار": 
  case "قيد المعالجة":
  case "pending":
  case "processing":
    borderColor = yallow; // تأكدي أن متغير yallow معرف في الأعلى ويحمل لوناً برتقالياً/أصفراً واضحاً
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
              // 👈 عند الضغط يتم جلب داتا التفاصيل بناءً على الـ id وفتح المودال
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

  // 3. بناء دالة التحكم في عرض محتوى البودي (التحميل، الخطأ، الداتا الفاضية) دون لمس الهيدر
  const renderTableBody = () => {
    // حالة التحميل داخل البودي
    if (isLoading) {
      return {
        emptyText: (
          <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Spin size="large" />
            <Typography sx={{ color: theme.palette.primary.chip, fontWeight: 500 }}>
              جاري تحميل الشكاوى...
            </Typography>
          </Box>
        ),
      };
    }

    // حالة وجود خطأ من السيرفر داخل البودي
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

    // حالة عدم وجود شكاوى (مصفوفة فارغة) مطابقة تماماً لشكل صفحة الأخبار الفاضية
    if (complaintsData.length === 0) {
      return {
        emptyText: (
          <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: theme.palette.primary.text4, fontSize: "18px", fontWeight: 700 }}>
              لا توجد شكاوى حالياً
            </Typography>
            <Typography sx={{ color: theme.palette.primary.text5, fontSize: "14px" }}>
              سيتم عرض الشكاوى الواردة من المستخدمين هنا فور إرسالها.
            </Typography>
          </Box>
        ),
      };
    }

    return {}; // يعود بشكل طبيعي ويعرض الأسطر إذا وجدت بيانات
  };

  return (
<Box 
      sx={{ 
        width: "100%", 
        maxWidth: "100%",     // 👈 يمنع الحاوية من تجاوز عرض الشاشة الأصلي مهما كان محتواها
        overflowX: "auto",     // 👈 يُجبر السكرول الأفقي على الظهور هنا داخل حدود الحاوية
        display: "block",      // يضمن تصرف الحاوية كعنصر كتلوي مستقر
        boxSizing: "border-box"
      }}
    >      <Table
        columns={columns}
        // نمرر المصفوفة فقط إذا لم نكن في حالة تحميل أو خطأ لمنع تداخل الأسطر القديمة
        dataSource={isLoading || error ? [] : complaintsData}
        pagination={false}
        scroll={{ x: 800 }}
        // دمج التحكم الديناميكي في البودي هنا
        locale={renderTableBody()}
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
  onRefreshList={() => dispatch(fetchComplaints())} // 👈 إضافة الـ refresh التلقائي هنا
/>
    </Box>
    
  );
};

export default ComplaintsTable;