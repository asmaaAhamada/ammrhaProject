import React from "react";
import { Modal, Image, Tag, Space, Divider, Skeleton } from "antd";
import { Box, Grid, Typography, Avatar, IconButton, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { 
  WhatsApp, Facebook, LinkedIn, Mail, Phone, 
  Wc, CalendarMonth, Badge, LocationOn, Apartment, AssignmentTurnedIn 
} from "@mui/icons-material";
import { white } from "../../../style/color-main/color";
import { useSelector } from "react-redux";

const VolunteerDetailsModal = ({ open, onClose }) => {
  const theme = useTheme();
  
  // الاعتماد على داتا التفاصيل القادمة من السلايس الباكيند 🌟
  const { data: volunteerData, isLoading, error } = useSelector((state) => state.fetchrequest_details);

  // دالة مساعدة لإنشاء حقول البيانات
  const renderDetailItem = (icon, label, value) => (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 1.5, 
        p: 1.5, 
        borderRadius: "8px", 
        backgroundColor: theme.palette.action?.hover || "rgba(255, 255, 255, 0.02)",
        border: `1px solid rgba(161, 169, 195, 0.08)`
      }}
    >
      <Box sx={{ color: theme.palette.primary.main, display: "flex" }}>{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ color: theme.palette.primary.chip, display: "block", fontSize: "11px" }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.primary.text3, fontWeight: 500 }}>
          {value || "غير محدد"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={750}
      centered
      destroyOnClose
      title={
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.text3, pb: 1 }}>
          تفاصيل طلب التطوع
        </Typography>
      }
      styles={{
        content: {
          backgroundColor: theme.palette.primary.Appar2,
          color: theme.palette.primary.text3,
          borderRadius: "16px",
          direction: "rtl"
        }
      }}
    >
      <Divider style={{ margin: "10px 0 20px 0", borderColor: "rgba(161, 169, 195, 0.15)" }} />

      {isLoading ? (
        // عرض هيكل تحميل (Skeleton) فخم متوافق مع وقت جلب الداتا من الـ API 🔄
        <Box sx={{ p: 2 }}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
          <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 20 }} />
        </Box>
      ) : error ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
            حدث خطأ أثناء تحميل تفاصيل الطلب: {error}
          </Typography>
        </Box>
      ) : volunteerData ? (
        <>
          {/* الرأس: الصورة الشخصية والاسم والروابط */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar 
                src={volunteerData.avatar} 
                sx={{ width: 65, height: 65, fontSize: "24px", bgcolor: theme.palette.primary.button1 }}
              >
                {volunteerData.full_name ? volunteerData.full_name.charAt(0) : "م"}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.text3 }}>
                  {volunteerData.full_name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Apartment sx={{ fontSize: "16px", color: theme.palette.primary.chip }} />
                  <Typography variant="body2" sx={{ color: theme.palette.primary.chip }}>
                    قسم {volunteerData.department}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* أزرار التواصل الاجتماعي */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {volunteerData.whatsapp_number && (
                <IconButton 
                  component="a" 
                  href={`https://wa.me/${volunteerData.whatsapp_number}`} 
                  target="_blank" 
                  sx={{ color: "#25D366", bgcolor: "rgba(37, 211, 102, 0.1)" }}
                >
                  <WhatsApp />
                </IconButton>
              )}
              {volunteerData.facebook_link && (
                <IconButton 
                  component="a" 
                  href={volunteerData.facebook_link} 
                  target="_blank" 
                  sx={{ color: "#1877F2", bgcolor: "rgba(24, 119, 242, 0.1)" }}
                >
                  <Facebook />
                </IconButton>
              )}
              {volunteerData.linkedin_link && (
                <IconButton 
                  component="a" 
                  href={volunteerData.linkedin_link} 
                  target="_blank" 
                  sx={{ color: "#0077B5", bgcolor: "rgba(0, 119, 181, 0.1)" }}
                >
                  <LinkedIn />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* شبكة البيانات الأساسية */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {renderDetailItem(<Mail sx={{ fontSize: 20 }} />, "البريد الإلكتروني", volunteerData.email)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDetailItem(<Phone sx={{ fontSize: 20 }} />, "رقم الهاتف", volunteerData.phone_number)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDetailItem(<Badge sx={{ fontSize: 20 }} />, "الرقم الوطني", volunteerData.national_id)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDetailItem(<LocationOn sx={{ fontSize: 20 }} />, "مكان الإقامة / الجنسية", `${volunteerData.residence_place} - ${volunteerData.nationality}`)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDetailItem(<Wc sx={{ fontSize: 20 }} />, "الجنس", volunteerData.gender === "female" ? "أنثى" : "ذكر")}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDetailItem(<CalendarMonth sx={{ fontSize: 20 }} />, "تاريخ الميلاد", volunteerData.birth_date ? new Date(volunteerData.birth_date).toLocaleDateString("ar-SY") : "")}
            </Grid>
          </Grid>

          {/* قسم المهارات */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.text3 }}>
              المهارات والخبرات:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {volunteerData.skills && volunteerData.skills.length > 0 ? (
                volunteerData.skills.map((skill, index) => (
                  <Tag 
                    key={index} 
                    color="blue" 
                    style={{ 
                      padding: "4px 12px", 
                      fontSize: "13px", 
                      borderRadius: "6px",
                      backgroundColor: "rgba(30, 144, 255, 0.1)",
                      color: "#1e90ff",
                      border: "1px solid rgba(30, 144, 255, 0.2)"
                    }}
                  >
                    {skill}
                  </Tag>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: theme.palette.primary.chip }}>لا يوجد مهارات مسجلة</Typography>
              )}
            </Box>
          </Box>

          {/* مستعرض الوثائق الرسمية */}
          <Box sx={{ mt: 3, p: 2, borderRadius: "12px", border: "1px dashed rgba(161, 169, 195, 0.3)" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: theme.palette.primary.text3 }}>
              الوثائق الثبوتية (الهوية الشخصية):
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Box sx={{ textAlign: "center" }}>
                <Image
                  width={200}
                  height={120}
                  style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(161, 169, 195, 0.2)" }}
                  src={volunteerData.id_front_image}
                  fallback="https://via.placeholder.com/200x120?text=No+Image"
                />
                <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: theme.palette.primary.chip }}>الوجه الأمامي</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Image
                  width={200}
                  height={120}
                  style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(161, 169, 195, 0.2)" }}
                  src={volunteerData.id_back_image}
                  fallback="https://via.placeholder.com/200x120?text=No+Image"
                />
                <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: theme.palette.primary.chip }}>الوجه الخلفي</Typography>
              </Box>
            </Box>
          </Box>

          {/* تذييل المودال */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: theme.palette.primary.chip }}>
              <AssignmentTurnedIn sx={{ fontSize: "16px" }} />
              <Typography variant="caption">تاريخ التقديم: {volunteerData.submitted_at}</Typography>
            </Box>
            <Button 
              onClick={onClose}
              variant="contained"
              sx={{ 
                bgcolor: theme.palette.primary.button1, 
                color: white,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { bgcolor: theme.palette.primary.button1 }
              }}
            >
              إغلاق النافذة
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ p: 2, textAlign: "center" }}>لا تتوفر بيانات للطلب الحالي.</Box>
      )}
    </Modal>
  );
};

export default VolunteerDetailsModal;