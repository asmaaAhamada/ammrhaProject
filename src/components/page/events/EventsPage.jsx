import React, { useCallback, useState, useMemo } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert
} from "@mui/material";
import EventCard from "./EventCard"; 
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"; 
import { white } from "../../../style/color-main/color";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../../../backend/slice/events/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

export default function EventsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // جلب بيانات الفعاليات من الريدوكس وحالات التحميل والخطأ
  const { data: eventsResponse, isLoading, error } = useSelector((state) => state.fetchEvents);

  // استخراج المصفوفة الحقيقية للبيانات من الباك إند
  const actualEventsData = useMemo(() => {
    if (!eventsResponse) return [];
    return Array.isArray(eventsResponse) ? eventsResponse : eventsResponse.data || [];
  }, [eventsResponse]);

  // دالة جلب البيانات
  const loadEvents = useCallback(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // جلب البيانات عند أول رندر للصفحة
  React.useEffect(() => {
    loadEvents(); 
  }, [loadEvents]);

  // فلاتر البحث والتحكم
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // استخراج الأقسام الفريدة ديناميكياً من الباك إند لبناء قائمة الفلترة تلقائياً
  const uniqueDepartments = useMemo(() => {
    const depts = {};
    actualEventsData.forEach(event => {
      if (event?.department?.id) {
        depts[event.department.id] = event.department.name;
      }
    });
    return Object.entries(depts).map(([id, name]) => ({ id: Number(id), name }));
  }, [actualEventsData]);

  const primaryButtonColor = theme?.palette?.primary?.button1 || "#162d6b";

  // التنسيقات الموحدة
  const selectStyles = {
    borderRadius: "10px", 
    fontSize: "14px", 
    fontWeight: 500,
    color: theme?.palette?.primary?.text3 || "#000",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryButtonColor,
      borderWidth: "1px"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryButtonColor,
      borderWidth: "1.5px"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryButtonColor,
    }
  };

  const labelStyles = { 
    fontSize: "14px", 
    fontWeight: 500,
    color: primaryButtonColor,
    "&.Mui-focused": {
      color: primaryButtonColor
    }
  };

  const handleEdit = useCallback((eventItem) => {
    console.log("تعديل الفعالية:", eventItem);
  }, []);

  const handleDelete = useCallback((eventItem) => {
    console.log("حذف الفعالية:", eventItem);
  }, []);

  const handleView = useCallback((eventItem) => {
    navigate(`/Events/${eventItem.id}`);
  }, [navigate]);

  // منطق الفلترة الذكي بناءً على تركيبة بيانات الباك إند
  const filteredEvents = useMemo(() => {
    return actualEventsData.filter((event) => {
      const matchDepartment = selectedDepartmentId === "all" || event?.department?.id === Number(selectedDepartmentId);
      const matchStatus = selectedStatus === "all" || event?.status === selectedStatus;
      return matchDepartment && matchStatus;
    });
  }, [actualEventsData, selectedDepartmentId, selectedStatus]);

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 }, boxSizing: "border-box", direction: "rtl" }}>
      
      {/* الهيدر العلوي وفلاتر المنسدلة */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            fontWeight: 700,
            color: theme?.palette?.primary?.text3 || "#000",
          }}
        >
          الفعاليات
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          
          {/* فلتر الأقسام الديناميكي المستخرج من الباك إند */}
          <FormControl size="small" sx={{ minWidth: "140px" }}>
            <InputLabel id="dept-filter-label" sx={labelStyles}>حسب القسم</InputLabel>
            <Select
              labelId="dept-filter-label"
              value={selectedDepartmentId}
              label="حسب القسم"
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
              sx={selectStyles}
            >
              <MenuItem value="all">الكل</MenuItem>
              {uniqueDepartments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* فلتر الحالات */}
          <FormControl size="small" sx={{ minWidth: "140px" }}>
            <InputLabel id="status-filter-label" sx={labelStyles}>حسب الحالة</InputLabel>
            <Select
              labelId="status-filter-label"
              value={selectedStatus}
              label="حسب الحالة"
              onChange={(e) => setSelectedStatus(e.target.value)}
              sx={selectStyles}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="قادمة">قادمة</MenuItem>
              <MenuItem value="نشطة">نشطة</MenuItem>
              <MenuItem value="منتهية">منتهية</MenuItem>
            </Select>
          </FormControl>

          {/* زر إضافة فعالية */}
          <Button
            onClick={() => console.log("فتح مودال إضافة فعالية")}
            variant="contained"
            sx={{
              width: { xs: "140px", sm: "160px", md: "177px" },
              height: "40px",
              borderRadius: "10px",
              backgroundColor: primaryButtonColor,
              color: white || "#fff",
              boxShadow: "none",
              fontSize: { xs: "13px", sm: "14px" },
              fontWeight: 600,
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: primaryButtonColor,
                opacity: 0.9,
                boxShadow: "none",
              },
            }}
          >
            إضافة فعالية
            <AddIcon sx={{ width: "18px", height: "18px", mr: 1 }} />
          </Button>
        </Box>
      </Box>

      {/* معالجة حالات الـ API بالتفصيل */}
      {isLoading ? (
        <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Spin size="large" />
          <Typography style={{ color: theme?.palette?.primary?.chip || "#162d6b", fontWeight: 500 }}>جاري تحميل الفعاليات...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ mb: 3 }}>
          <Alert severity="error" variant="outlined" sx={{ borderRadius: "12px", fontWeight: 600 }}>
            {typeof error === "string" ? error : "حدث خطأ أثناء تحميل بيانات الفعاليات من الخادم."}
          </Alert>
        </Box>
      ) : filteredEvents.length === 0 ? (
        /* حالة عدم وجود فعاليات بالوقت الحالي أو فلاتر فارغة */
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "45vh", textAlign: "center", py: 4, width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.03)", mb: 2.5 }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: "52px", color: theme?.palette?.primary?.text4 || "#666", opacity: 0.7 }} />
          </Box>
          <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "18px", fontWeight: 700, mb: 1 }}>
            لا توجد فعاليات في الوقت الحالي
          </Typography>
          <Typography sx={{ color: theme?.palette?.primary?.text4 || "#666", fontSize: "14px", maxWidth: "340px", lineHeight: 1.6 }}>
            النظام لا يحتوي على فعاليات مسجلة تطابق التصفية الحالية. يمكنك البدء بإضافة فعالية جديدة باستخدام الزر المتاح بالأعلى.
          </Typography>
        </Box>
      ) : (
        /* عرض قائمة الكروت الحقيقية */
        <Grid container spacing={3}>
          {filteredEvents.map((eventItem) => (
            <EventCard
              key={eventItem.id}
              card={eventItem}
              theme={theme}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}