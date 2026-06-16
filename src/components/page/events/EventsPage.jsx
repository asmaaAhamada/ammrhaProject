import React, { useCallback, useState, useMemo, lazy, Suspense, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  FormControl, 
  Select, 
  MenuItem,
  Alert,
  useMediaQuery
} from "@mui/material";
import EventCard from "./EventCard"; 
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"; 
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"; 
import { white } from "../../../style/color-main/color";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../../../backend/slice/events/fetchAll";
import { fetchstatus } from "../../../backend/slice/events/fetchstatus"; 
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";

const DeletEvents = lazy(() => import("./deletEvents"));
const AddEventModal = lazy(() => import("./AddEveents"));

export default function EventsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [open, setOpen] = useState(false);
  const [opendelet, setOpendelet] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // الفلاتر المحلية لصفحة الفعاليات
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // 1. جلب بيانات الأقسام من الستيت
  const { data: departmentsData } = useSelector((state) => state.fetchDepartment);
  const departmentsList = Array.isArray(departmentsData) ? departmentsData : departmentsData?.data || [];

  // 2. جلب بيانات حالات الفعاليات ديناميكياً وحالة التحميل
  const { data: statusesData, isLoading: isStatusLoading } = useSelector((state) => state.fetchstatus);

  // 3. جلب الفعاليات لتحديث الكروت في الواجهة
  const { data: eventsResponse, isLoading, error } = useSelector((state) => state.fetchEvents);

  const actualEventsData = useMemo(() => {
    if (!eventsResponse) return [];
    return Array.isArray(eventsResponse) ? eventsResponse : eventsResponse.data || [];
  }, [eventsResponse]);

  // دالة جلب البيانات ممرر لها الفلاتر الحالية لطلبها من السيرفر
  const loadEvents = useCallback(() => {
    const deptParam = selectedDepartmentId === "all" ? "" : selectedDepartmentId;
    const statusParam = selectedStatus === "all" ? "" : selectedStatus;

    dispatch(fetchEvents({
      department_id: deptParam,
      status: statusParam
    }));
  }, [dispatch, selectedDepartmentId, selectedStatus]);

  // جلب البيانات الثابتة للقوائم المنسدلة عند تحميل الصفحة لأول مرة
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchstatus()); 
  }, [dispatch]);

  // تحديث كروت الفعاليات تلقائياً فور تغيير الفلاتر بالواجهة
  useEffect(() => {
    loadEvents(); 
  }, [loadEvents]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryButtonColor = theme?.palette?.primary?.button1 || "#162d6b";

  // 🌟 دوال التحكم بالفعاليات (تم إعادتها لإصلاح الـ ReferenceError) ✅
  const handleEdit = useCallback((eventItem) => {
    console.log("تعديل الفعالية:", eventItem);
  }, []);

  const handleDelete = useCallback((eventItem) => {
    setSelectedCard(eventItem); 
    setOpendelet(true);
  }, []);

  const handleView = useCallback((eventItem) => {
    navigate(`/Events/${eventItem.id}`);
  }, [navigate]);

  // تطبيق نفس ألوان وتنسيقات الـ Select المأخوذة من صفحة المتطوعين تماماً
  const selectStyles = {
    height: { xs: "40px", md: "48px" },
    width: { xs: "180px", md: "217px" },
    borderRadius: "12px", 
    backgroundColor: theme.palette.primary.logo,
    color: theme.palette.primary.button3,
    direction: "rtl",
    "& .MuiOutlinedInput-notchedOutline": { 
      border: `1px solid ${theme.palette.primary.moreborder}` 
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.primary.moreborder}`
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.primary.moreborder}`
    },
    "& .MuiSelect-icon": { 
      color: theme.palette.primary.button3, 
      fontSize: "30px", 
      left: "10px", 
      right: "auto" 
    },
    "& .MuiSelect-select": { 
      padding: "10px 14px", 
      textAlign: "right" 
    },
  };

  // تنسيق عناصر القائمة المنسدلة ليتوافق مع لون النص
  const menuItemStyles = {
    color: theme.palette.primary.button3,
    fontSize: "14px",
    fontWeight: 500
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 }, boxSizing: "border-box", direction: "rtl" }}>
      
      {/* القسم العلوي: العنوان وأدوات الفلترة */}
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", width: isMobile ? "100%" : "auto" }}>
          
          {/* فلتر القسم الألوان المتطابقة */}
          <FormControl size="small">
            <Select
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
              displayEmpty
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={selectStyles}
            >
              <MenuItem sx={menuItemStyles} value="all">حسب القسم (الكل)</MenuItem>
              {departmentsList.map((dept) => (
                <MenuItem key={dept.id} sx={menuItemStyles} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* فلتر الحالات بالألوان المتطابقة مع إضافة نص حالة التحميل */}
          <FormControl size="small">
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              displayEmpty
              disabled={isStatusLoading}
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={selectStyles}
            >
              <MenuItem sx={menuItemStyles} value="all">حسب الحالة (الكل)</MenuItem>
              
              {isStatusLoading ? (
                <MenuItem value="loading" disabled sx={{ fontStyle: "italic", color: "#888" }}>
                  جاري تحميل الحالات...
                </MenuItem>
              ) : (
                statusesData?.map((statusItem) => (
                  <MenuItem key={statusItem.id} sx={menuItemStyles} value={statusItem.value}>
                    {statusItem.label}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* زر إضافة فعالية */}
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "160px", md: "177px" },
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
              "& :hover": {
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

      {/* عرض محتوى الفعاليات بناءً على ردود الخادم */}
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
      ) : actualEventsData.length === 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "45vh", textAlign: "center", py: 4, width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.03)", mb: 2.5 }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: "52px", color: theme?.palette?.primary?.text4 || "#666", opacity: 0.7 }} />
          </Box>
          <Typography sx={{ color: theme?.palette?.primary?.text3 || "#000", fontSize: "18px", fontWeight: 700, mb: 1 }}>
            لا توجد فعاليات في الوقت الحالي
          </Typography>
          <Typography sx={{ color: theme?.palette?.primary?.text4 || "#666", fontSize: "14px", maxWidth: "340px", lineHeight: 1.6 }}>
            القسم أو الحالة المحددة لا تحتوي على فعاليات مسجلة حالياً على السيرفر.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {actualEventsData.map((eventItem) => (
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

      {/* تحميل المودالات بشكل استباقي منفصل */}
      <Suspense fallback={null}>
        {opendelet && (
          <DeletEvents 
            open={opendelet} 
            onClose={() => setOpendelet(false)} 
            selectedCard={selectedCard} 
            onSuccess={loadEvents} 
          />
        )}
        {open && <AddEventModal open={open} onClose={() => setOpen(false)} onSuccess={loadEvents} />}
      </Suspense>
    </Box>
  );
}