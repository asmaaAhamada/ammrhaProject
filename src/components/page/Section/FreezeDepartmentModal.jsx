import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
} from "@mui/material";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import { blue, white } from "../../../style/color-main/color";
import { fetchvolunteers } from "../../../backend/slice/volnteers/fetchAll";

export default function FreezeDepartmentModal({ open, onClose, department, onConfirm }) {
  const dispatch = useDispatch();
  
  // جلب بيانات المتطوعين من الـ Store
  const { data, isLoading, error } = useSelector((state) => state.fetchvolunteers);
console.log("البيانات القادمة من السيرفر للمتطوعين:", data);  
  // التأكد من استخراج المصفوفة بشكل سليم حسب معايير Laravel Pagination أو الاستجابة العادية
// ابحثي عن هذا السطر في ملف FreezeDepartmentModal.js:

// وقومي باستبداله بهذا التحقق الشامل:
const volunteersList = Array.isArray(data) 
  ? data 
  : (Array.isArray(data?.data) ? data.data : (data?.data?.data || []));
  // مصفوفة لتخزين الـ IDs الخاصة بالمتطوعين المستثنين
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  // عند فتح المودال، جلب متطوعي هذا القسم النشطين فقط
useEffect(() => {
  if (open && department?.id) {
    // إرسال الرقم 1 بدلاً من true لتجنب مشاكل الـ Validation في روابط الـ GET
    dispatch(fetchvolunteers({ department_id: department.id, is_active: 1 }));
    setSelectedVolunteers([]); 
  }
}, [open, department, dispatch]);

  const handleToggleVolunteer = (id) => {
    setSelectedVolunteers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFreezeSubmit = () => {
    onConfirm(department.id, selectedVolunteers);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{ direction: "rtl" }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700, color: "#111827" }}>
        <AcUnitOutlinedIcon sx={{ color: "#d97706" }} />
        تجميد القسم: {department?.name}
      </DialogTitle>
      
      <DialogContent dividers>
        {/* تعديل الألوان هنا لتصبح واضحة تماماً بدلاً من text.secondary الباهت */}
        <Typography variant="body1" sx={{ mb: 3, color: "#374151", fontWeight: 500, fontSize: "15px", lineHeight: 1.6 }}>
          قم بتحديد المتطوعين الذين ترغب في <span style={{ color: "#ef4444", fontWeight: 700 }}>استثنائهم</span> من التجميد (بمعنى سيبقون نشطين، بينما سيتم تجميد البقية):
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 6, flexDirection: "column", gap: 2 }}>
            <Spin size="large" />
            <Typography sx={{ color: "#4b5563", fontWeight: 500 }}>جاري تحميل متطوعي القسم...</Typography>
          </Box>
        ) : volunteersList.length === 0 ? (
          <Typography sx={{ textAlign: "center", py: 4, color: "#4b5563", fontWeight: 500, fontSize: "15px" }}>
            لا يوجد متطوعين نشطين في هذا القسم حالياً. سيتم تجميد القسم بالكامل مباشرة عند التأكيد.
          </Typography>
        ) : (
          <FormGroup sx={{ maxHeight: "300px", overflowY: "auto", px: 1 }}>
            {volunteersList.map((volunteer) => (
              <Box key={volunteer.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onChange={() => handleToggleVolunteer(volunteer.id)}
                      sx={{
                        color: "#d97706",
                        "&.Mui-checked": { color: "#d97706" },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ mr: 1 }}>
                      <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#1f2937" }}>
                        {volunteer.full_name}
                      </Typography>
                     
                    </Box>
                  }
                  sx={{ my: 1, width: "100%", alignItems: "center" }}
                />
                <Divider />
              </Box>
            ))}
          </FormGroup>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "space-between", backgroundColor: "#f9fafb" }}>
        <Button onClick={onClose} variant="outlined"  sx={{ borderRadius: "8px", fontWeight: 600 , color:blue ,borderColor:"#d97706"}}>
          إلغاء
        </Button>
        <Button
          onClick={handleFreezeSubmit}
          variant="contained"
          disabled={isLoading}
          sx={{
            borderRadius: "8px",
            color: white,
            fontWeight: 600,
            backgroundColor: "#d97706",
            "&:hover": { backgroundColor: "#b45309" },
            px: 3
          }}
        >
          تأكيد التجميد
        </Button>
      </DialogActions>
    </Dialog>
  );
}