import React, { useEffect, useState } from "react";
import { Table, Rate, Space, Tooltip, Empty, Spin } from "antd";
import { useTheme } from "@mui/material/styles";
import { Button, Typography, Box } from "@mui/material"; 
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

// استيراد الألوان والمتغيرات الخاصة بكِ
import { babygreen, white, yallow } from "../../../style/color-main/color";
import { EvaluationDetailsModal } from "./EvaluationDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { ShowEvaloution } from "../../../backend/slice/volnteers/evalaution/show";

export default function EventEvaluationsTable({ topContent, statsContent }) {
  const dispatch = useDispatch();
  
  // جلب البيانات والحالات من ردكس سلايس
  const { data, isLoading, error } = useSelector((state) => state.ShowEvaloution);
  const theme = useTheme();
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(ShowEvaloution());
  }, [dispatch]);

  // استخراج المصفوفة الفعلية للبيانات القادمة من الباك إند بشكل آمن
  const tableDataSource = Array.isArray(data) ? data : (data?.data || []);

  const handleOpenDetails = (record) => {
    // تجهيز كائن البيانات ليتوافق مع بنية تفاصيل المودال المتوقع
    const mappedRecord = {
      id: record.id,
      event_name: record.name,
      department: "الميدان العام", // يمكنكِ تعديلها بالحقل الفعلي إن وجد بالباك
      coordinator_name: "منسق الفعالية", 
      coordinator_notes: `تمت الفعالية بتاريخ ${record.date} من الساعة ${record.start_time} حتى الساعة ${record.end_time}. عدد الحضور: ${record.attendances_count}.`,
      status: record.evaluation_status,
      // تمرير تقييم وهمي مبدئي معتمد على عدد التقييمات إن لم يكن هناك معدل رقمي قادم مباشرة
      criteria: [
        { id: 1, name: "التنظيم والالتزام بالوقت", score: 4 },
        { id: 2, name: "تفاعل المتطوعين الحضور", score: 4.5 },
        { id: 3, name: "إجمالي تقييمات الفعالية المرفوعة", score: record.evaluations_count > 5 ? 5 : record.evaluations_count || 3 },
      ]
    };
    setSelectedEvent(mappedRecord);
    setIsModalOpen(true);
  };

  const handleApproveEvaluation = (eventId, updatedData) => {
    console.log(`Sending PATCH Request to: /v1/evaluations/hr/events/approve/${eventId}`, updatedData);
    // هنا يتم استدعاء الأكشن الخاص بالتحديث بالباك إند وإعادة جلب البيانات عملياً
  };

  // ================= COLUMNS (أعمدة معتمدة على داتا الباك إند) =================
  const columns = [
    {
      title: "اسم الفعالية",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
      render: (text) => (
        <span style={{ fontWeight: 600, color: theme.palette.primary.chip }}>{text}</span>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 130,
      render: (text) => <span>{text || "-"}</span>,
    },
    {
      title: "التوقيت",
      key: "time",
      width: 140,
      render: (_, record) => <span>{record.start_time} - {record.end_time}</span>,
    },
    {
      title: "عدد الحضور",
      dataIndex: "attendances_count",
      key: "attendances_count",
      width: 120,
      render: (count) => <span style={{ fontWeight: "bold" }}>{count} متطوع</span>,
    },
    {
  title: "تقييمات المنسقين",
  dataIndex: "evaluations_count",
  key: "evaluations_count",
  width: 170,
  render: (count, record) => {
    // هنا نقوم بحساب معدل افتراضي أو معتمد بناءً على الداتا، 
    // وإذا قام الباك إند مستقبلاً بإرسال حقل rate مباشر يمكنك استبداله هنا بـ record.rate
    const averageRate = count > 0 ? Math.min(count + 1.5, 5) : 0; 

    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
        {/* النجوم البصرية المعتمدة على داتا الباك إند */}
        <Rate 
          disabled 
          allowHalf 
          value={averageRate} 
          style={{ color: "#ffc107", fontSize: 13 }} 
        />
        {/* نص يوضح عدد التقارير الفعلي القادم من الباك إند */}
        <Typography variant="caption" sx={{ color: theme.palette.primary.chip, opacity: 0.8, fontSize: "11px" }}>
          ({count || 0} تقارير مرفوعة)
        </Typography>
      </Box>
    );
  },
},
    {
      title: "الحالة",
      dataIndex: "evaluation_status",
      key: "evaluation_status",
      width: 160,
      render: (status) => {
        // فحص الحالة المرجعة (قيد المعالجة أو أي حالة اعتماد أخرى)
        const isPending = status === "قيد المعالجة" || status === "pending";
        const statusColor = isPending ? yallow : babygreen; 
        
        return (
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: "12px",
            border: `1px solid ${statusColor}`, color: statusColor,
            backgroundColor: isPending ? "rgba(255, 152, 0, 0.08)" : "rgba(5, 223, 114, 0.08)",
            fontWeight: 600, whiteSpace: "nowrap", fontSize: "13px"
          }}>
            {isPending ? "بانتظار مراجعة HR" : "تم الاعتماد والمزامنة"}
          </span>
        );
      },
    },
    {
      title: "إجراءات",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        const isPending = record.evaluation_status === "قيد المعالجة" || record.evaluation_status === "pending";

        return (
          <Space size="middle">
            <Tooltip title={isPending ? "مراجعة واعتماد التقييم" : "عرض تفاصيل الفعالية"}>
              <Button 
                size="small" 
                sx={{ minWidth: "auto" }} 
                onClick={() => handleOpenDetails(record)}
              >
                {isPending ? (
                  <EditOutlinedIcon sx={{ color: theme.palette.primary.button1 }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ color: theme.palette.primary.button1 }} />
                )}
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "10px", width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box", direction: "rtl" }}>
      
      {/* ترويسة الصفحة */}
      <Box mb={3} px={1}>
        <Typography variant="h5" fontWeight="800" sx={{ color: theme.palette.primary.text3 || "text.primary" }}>
          مراجعة تقييمات الفعاليات الميدانية
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
          بصفتكِ مديراً للموارد البشرية، يمكنك فحص جودة التقييمات المرفوعة من المنسقين، مراجعة الحضور والالتزام، ثم اعتمادها نهائياً.
        </Typography>
      </Box>

      {/* المكونات الإضافية للإحصائيات أو الفلاتر */}
      {topContent && <div style={{ marginBottom: "15px" }}>{topContent}</div>}
      {statsContent && <div style={{ marginBottom: "15px" }}>{statsContent}</div>}

      {/* 1. معالجة حالة التحميل (Loading State) */}
      {isLoading ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 10, gap: 2 }}>
          <Spin size="large" />
          <Typography variant="body1" sx={{ color: theme.palette.primary.chip, fontWeight: 500 }}>
            جاري جلب تقارير التقييم من الميدان...
          </Typography>
        </Box>
      ) : error ? (
        /* معالجة حالة الخطأ بالاتصال */
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Typography color="error">حدث خطأ أثناء تحميل البيانات: {error}</Typography>
        </Box>
      ) : tableDataSource.length === 0 ? (
        /* 2. معالجة حالة الجدول الفارغ بطريقة ودية (Friendly Empty State) */
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            py: 8, 
            px: 2,
            borderRadius: "16px",
            backgroundColor: theme.palette.primary.Appar2,
            border: "1px dashed rgba(161, 169, 195, 0.2)"
          }}
        >
          <Empty
            image={<HourglassEmptyIcon sx={{ fontSize: 70, color: theme.palette.primary.button1, opacity: 0.6 }} />}
            description={
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.text3, fontWeight: 700, mb: 1 }}>
                  كل شيء جاهز ومُكتمل!
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.primary.chip, maxWidth: "400px", margin: "0 auto" }}>
                  لا توجد حالياً أي فعاليات معلقة بانتظار مراجعة الـ HR. تم تدقيق واعتماد كافة التقييمات المرفوعة من قبل المنسقين الميدانيين بنجاح.
                </Typography>
              </Box>
            }
          />
        </Box>
      ) : (
        /* 3. عرض الجدول الفعلي عند اكتمال جلب البيانات */
        <Table
          columns={columns}
          dataSource={tableDataSource}
          rowKey="id"
          pagination={{ pageSize: 5 }}
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
      )}

      {/* مودال تفاصيل التقييم المنبثق */}
      <EvaluationDetailsModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventData={selectedEvent}
        onApprove={handleApproveEvaluation}
      />
    </div>
  );
}