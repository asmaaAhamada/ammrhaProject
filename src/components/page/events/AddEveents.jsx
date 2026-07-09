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
import { Add_events, resetForm, setformInfo } from "../../../backend/slice/events/addEvents";
import { fetchvolunteers } from "../../../backend/slice/volnteers/fetchAll";

export default function AddEventModal({ open, onClose ,onSuccess }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 1. جلب بيانات إضافة الفعالية
  const { formInfo, isLoading, error, success } = useSelector((state) => state.Add_events);

  // 2. جلب بيانات الأقسام والأنواع
  const departmentsData = useSelector((state) => state.fetchDepartment?.data || []);
  const typesData = useSelector((state) => state.fetchType?.data || []);
console.log(typesData)
  // جلب حالة الـ Slice الخاص بالمتطوعين
  const volunteersState = useSelector((state) => state.fetchvolunteers);
  const isVolunteersLoading = volunteersState?.isLoading || false;
  const rawVolunteers = volunteersState?.data;

  // استخراج المصفوفة بشكل متقدم وآمن جداً ليتوافق مع الـ Pagination
  const volunteersList = Array.isArray(rawVolunteers)
    ? rawVolunteers
    : (Array.isArray(rawVolunteers?.data)
        ? rawVolunteers.data
        : (Array.isArray(rawVolunteers?.data?.data) ? rawVolunteers.data.data : []));

  // 3. جلب الأقسام والأنواع عند فتح المودال مباشرة
  useEffect(() => {
    if (open) {
      dispatch(fetchDepartment());
      dispatch(fetchType());
    }
  }, [open, dispatch]);

  // 4. مراقبة الفلترة الديناميكية: عند اختيار قسم، يتم فوراً عمل Fetch لمتطوعي هذا القسم
  useEffect(() => {
    if (open && formInfo.department_id) {
      dispatch(setformInfo({ leader_ids: [] }));
      dispatch(fetchvolunteers({ department_id: formInfo.department_id }));
    }
  }, [formInfo.department_id, open, dispatch]);

  // 5. مراقبة حالة النجاح لإغلاق المودال وتصفير الحقول
 useEffect(() => {
  if (success) {
    handleClearAndClose();
    onSuccess?.();
  }
}, [success]);

  // تحديث الحقول النصية والاختيارات داخل الـ Store
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setformInfo({ [name]: value }));
  };

  // معالجة اختيار ملف الصورة
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
      console.error("الرجاء ملء الحقول الأساسية: الاسم، القسم، ونوع الفعالية.");
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

    if (formInfo.image) {
      formData.append("image", formInfo.image);
    }

    if (formInfo.leader_ids && formInfo.leader_ids.length > 0) {
      formInfo.leader_ids.forEach((id) => {
        formData.append("leader_ids[]", id);
      });
    }

    dispatch(Add_events(formData));
  };

  const handleClearAndClose = () => {
    dispatch(resetForm());
    onClose();
  };
   useEffect(() => {
      if (success && open) {
        Swal.fire({
          icon: "success",
          title: "تمت الاضافة بنجاح",
          text:  "تم اضافة الفعالية الى قائمة الفعاليات السابقة .",
          confirmButtonText: "حسناً"
        });
        handleClearAndClose();
        onSuccess?.();
      }
    }, [success, open]);

  const inputStyleProps = {
    style: {
      textAlign: "right",
      backgroundColor: theme.palette.primary.inputt,
      color: theme.palette.primary.text7,
      borderRadius: "8px"
    }
  };

  // 🌟 اللون الموحّد الواضح لكل عناصر القوائم المنسدلة
  const MENU_TEXT_COLOR = "#162d6b";

  // 🌟 تعديل شامل: نفرض اللون على كل مستوى ممكن (الـ MenuItem نفسه + أي عنصر داخلي فيه
  // زي Typography/span + حالة disabled + حالة hover + حالة selected) عشان ما يضل في
  // أي احتمال يرث لون تاني من الثيم العام ويخلي النص يختفي فوق الخلفية البيضاء
  const customMenuProps = {
    PaperProps: {
      sx: {
        backgroundColor: "#ffffff !important",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
        "& .MuiMenu-list": {
          padding: "8px",
        },
        // كل MenuItem وكل عنصر داخلي فيه (Typography, span..) بلون واضح إجباري
        "& .MuiMenuItem-root, & .MuiMenuItem-root *": {
          color: `${MENU_TEXT_COLOR} !important`,
        },
        "& .MuiMenuItem-root": {
          textAlign: "right",
          direction: "rtl",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "6px",
          margin: "4px 0",
          backgroundColor: "#ffffff",
          opacity: "1 !important", // يمنع تصفير اللون بسبب opacity الافتراضي
        },
        "& .MuiMenuItem-root:hover, & .MuiMenuItem-root:hover *": {
          backgroundColor: "rgba(22, 45, 107, 0.08) !important",
          color: `${MENU_TEXT_COLOR} !important`,
        },
        "& .MuiMenuItem-root.Mui-selected, & .MuiMenuItem-root.Mui-selected *": {
          backgroundColor: `${MENU_TEXT_COLOR} !important`,
          color: "#ffffff !important",
        },
        "& .MuiMenuItem-root.Mui-selected:hover, & .MuiMenuItem-root.Mui-selected:hover *": {
          backgroundColor: "#112252 !important",
          color: "#ffffff !important",
        },
        // حالة العناصر المعطّلة (جاري التحميل / لا يوجد متطوعين) لازم تضل واضحة برضو
        "& .MuiMenuItem-root.Mui-disabled, & .MuiMenuItem-root.Mui-disabled *": {
          opacity: "1 !important",
          color: `${MENU_TEXT_COLOR} !important`,
        },
      },
    },
  };


  return (
    <Dialog
      open={open}
      onClose={handleClearAndClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.imagecard1,
          borderRadius: "16px",
          p: isMobile ? 2 : 4,
          direction: "rtl"
        }
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: 700, color: theme.palette.primary.text3, mb: 2, textAlign: "right" }}>
        إنشاء فعالية جديدة
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2.5}>

        {/* اسم الفعالية */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            اسم الفعالية
          </Typography>
          <TextField
            name="name"
            value={formInfo.name || ""}
            onChange={handleChange}
            placeholder="مثال: حفلة تشجير مدرسة"
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        {/* القسم المسؤول */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            القسم
          </Typography>
          <FormControl fullWidth>
            <Select
              name="department_id"
              value={formInfo.department_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px",
                "& .MuiSelect-select": { color: `${MENU_TEXT_COLOR} !important` },
              }}
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#aaa" }}>اختر القسم التابع له الفعالية</span>;
                const dept = departmentsData.find((d) => d.id === selected);
                return <span style={{ color: MENU_TEXT_COLOR }}>{dept ? dept.name : selected}</span>;
              }}
            >
              {departmentsData.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* نوع الفعالية */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            نوع الفعالية
          </Typography>
          <FormControl fullWidth>
            <Select
              name="type"
              value={formInfo.type || ""}
              onChange={handleChange}
              displayEmpty
              sx={{
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px",
                "& .MuiSelect-select": { color: `${MENU_TEXT_COLOR} !important` },
              }}
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#aaa" }}>اختر نوع الفعالية</span>;
const activeType = typesData.find(
    t => t.value === selected
);                return <span style={{ color: MENU_TEXT_COLOR }}>{activeType ? activeType.label : selected}</span>;
              }}
            >
              {typesData.map((typeObj) => (
               <MenuItem
    key={typeObj.id}
    value={typeObj.value}
>
    {typeObj.label}
</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* حقل قائد الفعالية: يعرض متطوعي القسم المختار بشكل حي بعد جلبهم */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            قائد الفعالية (متطوعو القسم المختار)
          </Typography>
          <FormControl fullWidth disabled={!formInfo.department_id}>
            <Select
              multiple
              name="leader_ids"
              value={formInfo.leader_ids || []}
              onChange={handleChange}
              displayEmpty
              sx={{
                backgroundColor: theme.palette.primary.inputt,
                borderRadius: "8px",
                "& .MuiSelect-select": { color: `${MENU_TEXT_COLOR} !important` },
              }}
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected || selected.length === 0) {
                  return <span style={{ color: theme.palette.primary.text4 }}>اختر القادة من متطوعي القسم</span>;
                }
                const names = selected
                  .map((id) => {
                    const volunteer = volunteersList.find((v) => v.id === id);
                    return volunteer ? volunteer.name : id;
                  })
                  .join("، ");
                return <span style={{ color: MENU_TEXT_COLOR, fontWeight: 600 }}>{names}</span>;
              }}
            >
              {isVolunteersLoading ? (
                <MenuItem disabled sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <CircularProgress size={20} />
                  <span>جاري تحميل متطوعي القسم...</span>
                </MenuItem>
              ) : volunteersList.length === 0 ? (
                <MenuItem disabled>
                  {formInfo.department_id ? "لا يوجد متطوعين مسجلين في هذا القسم" : "الرجاء اختيار القسم أولاً"}
                </MenuItem>
              ) : (
                volunteersList.map((volunteer) => (
                  <MenuItem key={volunteer.id} value={volunteer.id}>
                    {volunteer.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* المكان */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            المكان
          </Typography>
          <TextField
            name="location"
            value={formInfo.location || ""}
            onChange={handleChange}
            placeholder="مثال: صحنايا"
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        {/* التاريخ */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            التاريخ
          </Typography>
          <TextField
            type="date"
            name="date"
            value={formInfo.date || ""}
            onChange={handleChange}
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        {/* وقت البدء */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            وقت البدء
          </Typography>
          <TextField
            type="time"
            name="start_time"
            value={formInfo.start_time || ""}
            onChange={handleChange}
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        {/* وقت النهاية */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            وقت النهاية
          </Typography>
          <TextField
            type="time"
            name="end_time"
            value={formInfo.end_time || ""}
            onChange={handleChange}
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        {/* الأعداد المطلوبة */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            العدد الأعظمي للمتطوعين
          </Typography>
          <TextField
            type="number"
            name="required_volunteers"
            value={formInfo.required_volunteers || ""}
            onChange={handleChange}
            placeholder="50"
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            عدد الإعلاميين
          </Typography>
          <TextField
            type="number"
            name="media_count"
            value={formInfo.media_count || ""}
            onChange={handleChange}
            placeholder="2"
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            عدد اللوجستيين
          </Typography>
          <TextField
            type="number"
            name="logistic_count"
            value={formInfo.logistic_count || ""}
            onChange={handleChange}
            placeholder="0"
            fullWidth
            inputProps={inputStyleProps}
          />
        </Grid>

        {/* الصورة */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            إضافة صورة للفعالية
          </Typography>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            id="event-visual-upload"
          />
          <label htmlFor="event-visual-upload" style={{ width: "100%" }}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.inputt,
                color: theme.palette.primary.text7,
                width: "100%",
                height: "140px",
                border: "1px dashed #ccc",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {formInfo.image ? (
                <>
                  <img src={URL.createObjectURL(formInfo.image)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "rgba(0,0,0,0.6)", color: white, "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography sx={{ fontSize: "13px", mb: 0.5 }}>انقر لإضافة صورة الفعالية</Typography>
                  <UploadIcon sx={{ color: theme.palette.primary.text4 }} />
                </>
              )}
            </Box>
          </label>
        </Grid>

        {/* الوصف */}
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "13px", mb: 1, color: theme.palette.primary.text4, textAlign: "right" }}>
            الوصف
          </Typography>
          <TextField
            name="description"
            value={formInfo.description || ""}
            onChange={handleChange}
            placeholder="وصف الفعالية..."
            multiline
            rows={3}
            fullWidth
            sx={{ backgroundColor: theme.palette.primary.inputt }}
            inputProps={{ style: { textAlign: "right", color: theme.palette.primary.text7 } }}
          />
        </Grid>
      </Grid>

      {/* الأزرار */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 4, flexDirection: isMobile ? "column" : "row" }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          sx={{
            width: isMobile ? "100%" : "140px",
            height: "43px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            fontWeight: 600,
            borderRadius: "12px",
            "&:hover": { backgroundColor: "#162d6b" }
          }}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: white }} /> : "إنشاء الفعالية"}
        </Button>
        <Button
          onClick={handleClearAndClose}
          disabled={isLoading}
          sx={{
            width: isMobile ? "100%" : "106px",
            height: "43px",
            border: "1px solid #ccc",
            color: theme.palette.primary.text3,
            fontWeight: 600,
            borderRadius: "12px"
          }}
        >
          إلغاء
        </Button>
      </Box>
    </Dialog>
  );
}