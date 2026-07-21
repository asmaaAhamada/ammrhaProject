import React, { useState, useEffect } from "react";
import { Modal, Divider, Table } from "antd";
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Button,
  useTheme,
  CircularProgress,
  Avatar
} from "@mui/material";
import { 
  CheckCircleOutline as ApproveIcon, 
  PersonOutline, 
  Apartment,
  GroupOutlined as GroupIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ShowEvaloutionDetails } from "../../../backend/slice/volnteers/evalaution/showDetails";

// ==========================================
// مكون تفاصيل التقييم واعتماده المحدث
// ==========================================
export const EvaluationDetailsModal = ({ open, onClose, eventData, onApprove }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب البيانات وحالة التحميل من الريدكس سلايس
  const { data, isLoading, error } = useSelector((state) => state.ShowEvaloutionDetails);

  // الاحتفاظ بالقيم للتعديل عليها قبل الرفع النهائي
  const [notes, setNotes] = useState("");

  // جلب البيانات من الباك إند فور فتح المودال وتوفر معرف الفعالية
  useEffect(() => {
    if (open && eventData?.id) {
      dispatch(ShowEvaloutionDetails(eventData.id));
    }
  }, [dispatch, open, eventData?.id]);

  // تحديث ملاحظات المنسق عند فتح المودال
  useEffect(() => {
    if (eventData) {
      setNotes(eventData.coordinator_notes || "");
    }
  }, [eventData]);

  const handleSubmit = () => {
    onApprove(eventData.id, {
      volunteers_evaluations: data, // البيانات القادمة والمعدلة من الباك إند
      hr_notes: notes
    });
    onClose();
  };

  // إعداد أعمدة جدول تقييمات المتطوعين داخل المودال
  const volunteerColumns = [
    {
      title: "المتطوع",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={record.image} sx={{ width: 30, height: 30, fontSize: "14px" }}>
            {text ? text.charAt(0) : "V"}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.text3 }}>
            {text}
          </Typography>
        </Box>
      ),
    },
    {
      title: "النقاط المكتسبة",
      dataIndex: "earned_points",
      key: "earned_points",
      align: "center",
      render: (points) => (
        <span style={{ color: "#05df72", fontWeight: "bold" }}>
          +{points}
        </span>
      ),
    },
    {
      title: "النقاط المخصومة",
      dataIndex: "deducted_points",
      key: "deducted_points",
      align: "center",
      render: (points) => (
        <span style={{ color: points < 0 ? "#ff4d4f" : theme.palette.text.secondary, fontWeight: "bold" }}>
          {points}
        </span>
      ),
    },
  ];

  if (!eventData) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      destroyOnClose
      title={
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.text3, pb: 1 }}>
            مراجعة تقييم: {eventData.event_name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Apartment sx={{ fontSize: "18px", color: theme.palette.primary.chip }} />
              <Typography variant="body2" sx={{ color: theme.palette.primary.chip }}>
                القسم: {eventData.department}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonOutline sx={{ fontSize: "18px", color: theme.palette.primary.chip }} />
              <Typography variant="body2" sx={{ color: theme.palette.primary.chip }}>
                المنسق الميداني: {eventData.coordinator_name}
              </Typography>
            </Box>
          </Box>
        </Box>
      }
      styles={{
        content: {
          backgroundColor: theme.palette.primary.Appar2,
          color: theme.palette.primary.text3,
          borderRadius: "16px",
          direction: "rtl"
        },
        header: {
          backgroundColor: "transparent",
          marginBottom: "0px"
        }
      }}
    >
      <Divider style={{ margin: "15px 0 20px 0", borderColor: "rgba(161, 169, 195, 0.15)" }} />

      {/* معالجة حالة اللودينج (Loading State) */}
      {isLoading ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8, gap: 2 }}>
          <CircularProgress size={45} sx={{ color: theme.palette.primary.button1 }} />
          <Typography variant="body2" sx={{ color: theme.palette.primary.chip }}>
            جاري سحب كشوفات تقييم المتطوعين من الميدان...
          </Typography>
        </Box>
      ) : error ? (
        /* معالجة حالة وجود خطأ بالاتصال */
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Typography color="error">حدث خطأ أثناء تحميل تفاصيل التقييم: {error}</Typography>
        </Box>
      ) : (
        /* عرض البيانات عند انتهاء التحميل بنجاح */
        <Grid container spacing={3}>
          
          {/* قسم كشف تقييمات نقاط المتطوعين الفعلي من الباك إند */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <GroupIcon sx={{ color: theme.palette.primary.button1, fontSize: 22 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.primary.text3 }}>
                نقاط وتقييمات المتطوعين المشاركين
              </Typography>
            </Box>
            
            <Table
              dataSource={Array.isArray(data) ? data : []}
              columns={volunteerColumns}
              rowKey="volunteer_id"
              pagination={{ pageSize: 4, size: "small" }}
              size="small"
              components={{
                header: {
                  cell: (props) => <th {...props} style={{ backgroundColor: "rgba(161, 169, 195, 0.08)", color: theme.palette.primary.text3, fontWeight: "600" }} />
                },
                body: {
                  cell: (props) => <td {...props} style={{ borderBottom: "1px solid rgba(161, 169, 195, 0.08)" }} />
                }
              }}
            />
          </Grid>

          {/* القسم الجانبي للملاحظات */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              
              {/* ملاحظات المنسق المكتوبة سابقاً */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.chip }}>
                  تقرير وملاحظات المنسق
                </Typography>
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: "8px", 
                    backgroundColor: "rgba(161, 169, 195, 0.04)",
                    border: "1px dashed rgba(161, 169, 195, 0.2)"
                  }}
                >
                  <Typography variant="body2" sx={{ color: theme.palette.primary.text3, fontStyle: "italic", lineHeight: 1.7 }}>
                    {eventData.coordinator_notes || "لا توجد ملاحظات إضافية من المنسق."}
                  </Typography>
                </Box>
              </Box>

              {/* تعديل وإضافة ملاحظات الـ HR النهائية */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.chip }}>
                  توجيهات واعتماد إدارة الموارد البشرية
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="اكتب التوجيهات أو الملاحظات النهائية هنا للحفظ الفوري..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(161, 169, 195, 0.02)",
                      color: theme.palette.primary.text3,
                      borderRadius: "8px",
                      "& fieldset": { borderColor: "rgba(161, 169, 195, 0.2)" },
                      "&:hover fieldset": { borderColor: theme.palette.primary.button1 },
                      "&.Mui-focused fieldset": { borderColor: theme.palette.primary.button1 },
                    }
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}

      <Divider style={{ margin: "25px 0 15px 0", borderColor: "rgba(161, 169, 195, 0.15)" }} />

      {/* أزرار التحكم السفلية للمودال */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "rgba(161, 169, 195, 0.3)",
            color: theme.palette.primary.chip,
            borderRadius: "8px",
            px: 3,
            "&:hover": {
              borderColor: theme.palette.primary.chip,
              backgroundColor: "rgba(161, 169, 195, 0.05)"
            }
          }}
        >
          إلغاء
        </Button>
        <Button
          variant="contained"
          startIcon={<ApproveIcon />}
          onClick={handleSubmit}
          disabled={isLoading} // منع الضغط في حالة التحميل
          sx={{
            bgcolor: theme.palette.primary.button1,
            color: "#fff",
            borderRadius: "8px",
            px: 3,
            boxShadow: "none",
            "&:hover": { 
              bgcolor: theme.palette.primary.button1,
              opacity: 0.9,
              boxShadow: "none"
            }
          }}
        >
          اعتماد ورفع التقييم
        </Button>
      </Box>
    </Modal>
  );
};