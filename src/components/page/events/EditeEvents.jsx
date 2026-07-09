import React, { useRef, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  useMediaQuery,
  IconButton,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import Swal from "sweetalert2";
import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

// استيراد الـ Redux hooks والـ Actions
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../backend/slice/department/fetchAll";
import { fetchType } from "../../../backend/slice/events/typeEvent";
import { fetchvolunteers } from "../../../backend/slice/volnteers/fetchAll";
import { Edite_Events } from "../../../backend/slice/events/editeEvent";
import { setformInfo, resetForm } from "../../../backend/slice/events/addEvents"; 
export default function EditeEventModal({ open, onClose, onSuccess, eventData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 1. جلب بيانات النموذج والـ Slices
  const { formInfo } = useSelector((state) => state.Add_events);
  const { isLoading, error, success } = useSelector((state) => state.Edite_Events );

  // 2. جلب بيانات الأقسام والأنواع
  const departmentsData = useSelector((state) => state.fetchDepartment?.data || []);
  const typesData = useSelector((state) => state.fetchType?.data || []);

  // جلب حالة الـ Slice الخاص بالمتطوعين
  const volunteersState = useSelector((state) => state.fetchvolunteers);
  const isVolunteersLoading = volunteersState?.isLoading || false;
  const rawVolunteers = volunteersState?.data;

  const volunteersList = Array.isArray(rawVolunteers)
    ? rawVolunteers
    : (Array.isArray(rawVolunteers?.data)
        ? rawVolunteers.data
        : (Array.isArray(rawVolunteers?.data?.data) ? rawVolunteers.data.data : []));

  // 🌟 3. الحل الجذري: تفكيك وملء الحقول فوراً عند فتح المودال مع مطابقة الأسماء
 useEffect(() => {
  if (open && eventData) {
    const deptId = eventData.department_id || eventData.department?.id || "";

    // تصفية ومعالجة حقل الـ type ليتوافق تماماً مع الـ API
    let eventType = "";
    if (typeof eventData.type === "string") {
      const typeLower = eventData.type.toLowerCase();
      if (["normal", "urgent", "meeting"].includes(typeLower)) {
        eventType = typeLower;
      } else if (eventData.type === "عادية") {
        eventType = "normal";
      } else if (eventData.type === "مستعجلة" || eventData.type === "طارئة") {
        eventType = "urgent";
      } else if (eventData.type === "اجتماع") {
        eventType = "meeting";
      }
    } else if (eventData.type?.value) {
      eventType = eventData.type.value.toLowerCase();
    } else {
      eventType = "normal"; // قيمة افتراضية لتجنب إرسال حقل فارغ
    }

    let leaders = [];
    if (Array.isArray(eventData.leader_ids)) {
      leaders = eventData.leader_ids;
    } else if (Array.isArray(eventData.leaders)) {
      leaders = eventData.leaders.map(l => l.id || l);
    }

    dispatch(setformInfo({
      name: eventData.name || "",
      department_id: deptId,
      type: eventType, // القيمة هنا الآن مضمونة (normal, urgent, meeting)
      leader_ids: leaders,
      location: eventData.location || "",
      date: eventData.date || "",
      start_time: eventData.start_time || "",
      end_time: eventData.end_time || "",
      required_volunteers: eventData.required_volunteers || "",
      media_count: eventData.media_count || "",
      logistic_count: eventData.logistic_count || "",
      description: eventData.description || "",
      image: eventData.image || null
    }));
  }
}, [open, eventData, dispatch]);

  // جلب الأقسام والأنواع
  useEffect(() => {
    if (open) {
      dispatch(fetchDepartment());
      dispatch(fetchType());
    }
  }, [open, dispatch]);

  // مراقبة الفلترة الديناميكية لمتطوعي القسم الجدد أو الحاليين
  useEffect(() => {
    if (open && formInfo.department_id) {
      dispatch(fetchvolunteers({ department_id: formInfo.department_id }));
    }
  }, [formInfo.department_id, open, dispatch]);

  // مراقبة حالة النجاح والفشل
  useEffect(() => {
    if (success && open) {
      Swal.fire({
        icon: "success",
        title: "تم التعديل بنجاح",
        text: "تم تحديث بيانات الفعالية.",
        confirmButtonText: "حسناً"
      });
      handleClearAndClose();
      onSuccess?.();
    }
  }, [success, open]);

  useEffect(() => {
    if (error && open) {
      Swal.fire({
        icon: "error",
        title: "فشل العملية",
        text: error
      });
    }
  }, [error, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setformInfo({ [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setformInfo({ image: file }));
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setformInfo({ image: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!formInfo.department_id || !formInfo.type || !formInfo.name) {
      return;
    }

    const formData = new FormData();
    formData.append("name", formInfo.name || "");
    formData.append("type", formInfo.type || "");
    formData.append("date", formInfo.date || "");
    formData.append("location", formInfo.location || "");
    formData.append("start_time", formInfo.start_time || "");
    formData.append("end_time", formInfo.end_time || "");
    formData.append("description", formInfo.description || "");
    formData.append("department_id", Number(formInfo.department_id));
    formData.append("required_volunteers", Number(formInfo.required_volunteers || 0));
    formData.append("media_count", Number(formInfo.media_count || 0));
    formData.append("logistic_count", Number(formInfo.logistic_count || 0));

    // إرسال الصورة فقط إذا قام المستخدم برفع ملف جديد
    if (formInfo.image instanceof File) {
      formData.append("image", formInfo.image);
    }

    if (formInfo.leader_ids && formInfo.leader_ids.length > 0) {
      formInfo.leader_ids.forEach((id) => {
        formData.append("leader_ids[]", id);
      });
    }

    dispatch(Edite_Events({ id: eventData.id, formData }));
  };

  const handleClearAndClose = () => {
    dispatch(resetForm());
    onClose();
  };

  const inputStyleProps = {
    style: {
      textAlign: "right",
      backgroundColor: theme.palette.primary.inputt,
      color: theme.palette.primary.text7,
      borderRadius: "8px"
    }
  };

  const MENU_TEXT_COLOR = "#162d6b";

  const customMenuProps = {
    PaperProps: {
      sx: {
        backgroundColor: "#ffffff !important",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
        "& .MuiMenu-list": { padding: "8px" },
        "& .MuiMenuItem-root, & .MuiMenuItem-root *": { color: `${MENU_TEXT_COLOR} !important` },
        "& .MuiMenuItem-root": {
          textAlign: "right",
          direction: "rtl",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "6px",
          margin: "4px 0",
          backgroundColor: "#ffffff",
          opacity: "1 !important",
        },
        "& .MuiMenuItem-root:hover": { backgroundColor: "rgba(22, 45, 107, 0.08) !important" },
        "& .MuiMenuItem-root.Mui-selected": { backgroundColor: `${MENU_TEXT_COLOR} !important`, color: "#ffffff !important" }
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClearAndClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { backgroundColor: theme.palette.primary.imagecard1, borderRadius: "16px", p: isMobile ? 2 : 4, direction: "rtl" } }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: 700, color: theme.palette.primary.text3, mb: 2, textAlign: "right" }}>
        تعديل فعالية
      </Typography>

      <Grid container spacing={2.5}>
        {/* اسم الفعالية */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>اسم الفعالية</Typography>
          <TextField name="name" value={formInfo.name || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        {/* القسم المسؤول */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>القسم</Typography>
          <FormControl fullWidth>
            <Select
              name="department_id"
              value={formInfo.department_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: theme.palette.primary.inputt, borderRadius: "8px" }}
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#aaa" }}>اختر القسم</span>;
                const dept = departmentsData.find((d) => d.id === selected);
                return <span style={{ color: MENU_TEXT_COLOR }}>{dept ? dept.name : selected}</span>;
              }}
            >
              {departmentsData.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* نوع الفعالية */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>نوع الفعالية</Typography>
          <FormControl fullWidth>
            <Select
              name="type"
              value={formInfo.type || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: theme.palette.primary.inputt, borderRadius: "8px" }}
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#aaa" }}>اختر النوع</span>;
const activeType = typesData.find(
  t =>
    t.value === selected ||
    t.id.toLowerCase() === String(selected).toLowerCase()
);                return <span style={{ color: MENU_TEXT_COLOR }}>{activeType ? activeType.label : selected}</span>;
              }}
            >
              {typesData.map((typeObj) => (
              <MenuItem 
 key={typeObj.id} 
 value={typeObj.value}
>{typeObj.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* قائد الفعالية */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>قائد الفعالية</Typography>
          <FormControl fullWidth disabled={!formInfo.department_id}>
            <Select
              multiple
              name="leader_ids"
              value={formInfo.leader_ids || []}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: theme.palette.primary.inputt, borderRadius: "8px" }}
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected || selected.length === 0) return <span style={{ color: "#aaa" }}>اختر القادة</span>;
                const names = selected.map((id) => {
                  const volunteer = volunteersList.find((v) => v.id === id);
                  return volunteer ? volunteer.name : id;
                }).join("، ");
                return <span style={{ color: MENU_TEXT_COLOR, fontWeight: 600 }}>{names}</span>;
              }}
            >
              {isVolunteersLoading ? (
                <MenuItem disabled sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <CircularProgress size={20} /><span>جاري التحميل...</span>
                </MenuItem>
              ) : volunteersList.length === 0 ? (
                <MenuItem disabled>لا يوجد متطوعين في هذا القسم</MenuItem>
              ) : (
                volunteersList.map((v) => <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>)
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* المكان */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>المكان</Typography>
          <TextField name="location" value={formInfo.location || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        {/* التاريخ */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>التاريخ</Typography>
          <TextField type="date" name="date" value={formInfo.date || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        {/* وقت البدء */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>وقت البدء</Typography>
          <TextField type="time" name="start_time" value={formInfo.start_time || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        {/* وقت النهاية */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>وقت النهاية</Typography>
          <TextField type="time" name="end_time" value={formInfo.end_time || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        {/* الأعداد المطلوبة */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>عدد المتطوعين</Typography>
          <TextField type="number" name="required_volunteers" value={formInfo.required_volunteers || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>عدد الإعلاميين</Typography>
          <TextField type="number" name="media_count" value={formInfo.media_count || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>عدد اللوجستيين</Typography>
          <TextField type="number" name="logistic_count" value={formInfo.logistic_count || ""} onChange={handleChange} fullWidth inputProps={inputStyleProps} />
        </Grid>

        {/* الصورة والوصف */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>صورة الفعالية</Typography>
          <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} id="edit-event-upload" />
          <label htmlFor="edit-event-upload" style={{ width: "100%" }}>
            <Box sx={{ backgroundColor: theme.palette.primary.inputt, height: "120px", border: "1px dashed #ccc", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", position: "relative", overflow: "hidden" }}>
              {formInfo.image ? (
                <>
                  <img src={formInfo.image instanceof File ? URL.createObjectURL(formInfo.image) : formInfo.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <IconButton onClick={handleRemoveImage} sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "rgba(0,0,0,0.6)", color: white }}><DeleteIcon /></IconButton>
                </>
              ) : (
                <UploadIcon sx={{ color: theme.palette.primary.text4 }} />
              )}
            </Box>
          </label>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4 }}>الوصف</Typography>
          <TextField name="description" value={formInfo.description || ""} onChange={handleChange} multiline rows={3} fullWidth sx={{ backgroundColor: theme.palette.primary.inputt }} inputProps={{ style: { textAlign: "right", color: theme.palette.primary.text7 } }} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading} sx={{ width: "140px", height: "43px", backgroundColor: theme.palette.primary.button1, color: white }}>
          {isLoading ? <CircularProgress size={24} sx={{ color: white }} /> : "حفظ التعديلات"}
        </Button>
        <Button onClick={handleClearAndClose} sx={{ width: "106px", height: "43px", border: "1px solid #ccc", color: theme.palette.primary.text3 }}>إلغاء</Button>
      </Box>
    </Dialog>
  );
}