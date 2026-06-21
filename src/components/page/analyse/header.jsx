import { Box, Button, Typography } from "@mui/material";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import {useTheme} from '@mui/material/styles' 
import { white } from "../../../style/color-main/color";
import { motion } from "framer-motion"; // تأكد من المسار الصحيح للمكتبة
import { ExportFile } from "../../../backend/slice/dashbord/exportFile";
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Header(){

    const MotionButton = motion(Button);
    const theme = useTheme()
     const dispatch = useDispatch();
    
      const { data, isLoading, error } = useSelector((state) => state.ExportFile);
    
      useEffect(() => {
        dispatch(ExportFile());
      }, [dispatch]);

const handleExport = () => {
  if (!data || typeof data !== 'string') return;

  // 1. تنظيف البيانات القادمة من الـ API
  // تحويل النص لمصفوفة أسطر، ثم تقسيم كل سطر عند الفاصلة (،)
  const rows = data.split('\n')
                   .map(row => {
                      return row.split(',')
                                // إزالة علامات الاقتباس الزائدة إن وجدت
                                .map(cell => cell.replace(/^"|"$/g, '').trim());
                   })
                   // فلترة الأسطر الفارغة
                   .filter(row => row.length > 0 && row[0] !== '');

  // 2. إنشاء "Worksheet" من المصفوفة المنظمة
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // 3. ضبط تنسيقات العمود لتكون "ألطف"
  ws['!cols'] = [
    { wch: 30 }, // تكبير العمود الأول ليناسب النصوص العربية الطويلة
    { wch: 15 }  // تكبير العمود الثاني ليناسب الأرقام والنسب
  ];

  // 4. إنشاء "Workbook"
  const wb = XLSX.utils.book_new();
  // تسمية الصفحة بـ "التقرير"
  XLSX.utils.book_append_sheet(wb, ws, "التقرير");

  // 5. تحميل الملف بتنسيق .xlsx
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  // اسم الملف سيكون باللغة العربية
  link.setAttribute("download", "التقرير_الاحصائي.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
    return(
        <>
        
        <Box
  sx={{
    width: "100%",
    minHeight: "36px",
    display: "flex",
    alignItems: "center",

    // دائماً جنب بعض
    flexDirection: "row",

    justifyContent: {
      xs: "space-between",
      sm: "space-between",
      md: "space-between",
    },

    // تقليل المسافة بالموبايل والتابليت
    gap: {
      xs: 1,
      sm: 1.5,
      md: 2,
    },

    mb: 3,mt:3 
  }}
>
  {/* عنوان الأخبار */}
  <Typography
    sx={{
      fontSize: {
        xs: "14px",
        sm: "18px",
        md: "22px",
      },
      fontWeight: 700,
      color: theme.palette.primary.text3,
      whiteSpace: "nowrap",mr: {
      
      md: 2,
    },
    }}
  >
لوحة التحليلات والإحصائيات
  </Typography>

 <MotionButton
 onClick={handleExport} // إضافة الدالة هنا
  disabled={isLoading || !data}
        initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 7}}
  transition={{ duration: 1 }}

    variant="contained"
    sx={{
      width: {
        xs: "140px",
        sm: "160px",
        md: "177px",
      },

      height: "43px",

      borderRadius: "12px",
       backgroundColor:
                    theme.palette.primary.button1,
                  color: white,
      boxShadow: "none",

      fontSize: {
        xs: "10px",
        sm: "14px",
        md: "15px",
      },

      fontWeight: 600,
      textTransform: "none",

      "&:hover": {
        backgroundColor: "#162d6b",
        boxShadow: "none",
      },
    }}
  >
    
{isLoading ? "جاري التحميل..." : "تصدير التقرير"}<DownloadOutlinedIcon sx={{width:'18px',height:'18px' ,mr:2}}/>
  </MotionButton>
</Box>
        </>
    )
}

