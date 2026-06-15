import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { babygreen, light_blue, yallow, black } from '../../../style/color-main/color';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../../backend/slice/dashbord/fetchAll';

const textHeader = black;
const greenColor = babygreen;
const yellowColor = yallow;
const redColor = 'red';
const blue5 = light_blue;
const successBg = 'rgba(5, 223, 114, 0.1)';

export default function OrdersDistributionCard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const MotionBox = motion(Box);

  const { data, isLoading, error } = useSelector((state) => state.fetchDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 1. معالجة حالة اللودر الفخم المخصص للمخطط الشريطي 🌊 ✨
  if (isLoading) {
    return (
      <Box
        dir="rtl"
        sx={{
          width: { xs: '100%', sm: 502 },
          maxWidth: 502,
          height: { xs: 'auto', md: 346 },
          minHeight: 346,
          backgroundColor: theme.palette.primary.Appar2,
          borderRadius: 4,
          p: 3,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.text3, fontWeight: 'bold', fontSize: '1.1rem' }}>
            توزيع الطلبات
          </Typography>
        </Box>

        {/* أسطر لودر متحركة كأمواج ناعمة ومضيئة تحاكي الأشرطة البيانية */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, flexGrow: 1, justifyContent: 'center' }}>
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ width: '60px', height: '12px', bgcolor: 'rgba(161, 169, 195, 0.15)', borderRadius: 1 }} />
                <Box sx={{ width: '40px', height: '12px', bgcolor: 'rgba(161, 169, 195, 0.15)', borderRadius: 1 }} />
              </Box>
              <Box sx={{ height: 8, borderRadius: 5, bgcolor: 'rgba(232, 234, 241, 0.4)', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <MotionBox
                  animate={{ 
                    x: ['100%', '-100%'],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 1.6, 
                    repeat: Infinity, 
                    ease: 'linear',
                    delay: item * 0.2 
                  }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(161, 169, 195, 0.3), transparent)',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/* لودر المؤشرات السفلية */}
        <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
          <Box sx={{ flex: 1, height: '54px', bgcolor: 'rgba(161, 169, 195, 0.08)', borderRadius: 3 }} />
          <Box sx={{ flex: 1, height: '54px', bgcolor: 'rgba(161, 169, 195, 0.08)', borderRadius: 3 }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: { xs: '100%', sm: 502 }, height: 346, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error">تعذر تحميل توزيع الطلبات.</Typography>
      </Box>
    );
  }

  // استخراج الداتا بأمان من الـ API
  const summary = data?.data?.summary || {
    All_requests: 0,
    pending_requests: 0,
    completed_requests: 0,
    rejected_requests: 0,
    acceptance_rate: 0,
  };

  const totalRequests = summary.All_requests;

  // دالة لحساب النسبة المئوية بدقة ومنع أخطاء القسمة على صفر
  const calculatePercentage = (count) => {
    if (!totalRequests || totalRequests === 0) return 0;
    return Math.round((count / totalRequests) * 100);
  };

  // 2. ربط مصفوفة الأسطر بالبيانات الحقيقية المستلمة
  const rowData = [
    { 
      label: 'المنتهية', 
      count: summary.completed_requests, 
      percentage: calculatePercentage(summary.completed_requests), 
      color: greenColor 
    },
    { 
      label: 'قيد الانتظار', 
      count: summary.pending_requests, 
      percentage: calculatePercentage(summary.pending_requests), 
      color: yellowColor 
    },
    { 
      label: 'المرفوضة', 
      count: summary.rejected_requests, 
      percentage: calculatePercentage(summary.rejected_requests), 
      color: redColor 
    },
  ];

  return (
    <Box
      dir="rtl"
      sx={{
        width: { xs: '100%', sm: 502 },
        maxWidth: 502,
        height: { xs: 'auto', md: 346 },
        minHeight: 346,
        backgroundColor: theme.palette.primary.Appar2,
        borderRadius: 4,
        p: 3,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* الهيدر */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.text3, fontWeight: 'bold', fontSize: '1.1rem' }}>
          توزيع الطلبات
        </Typography>
        <Box sx={{ bgcolor: 'rgba(161, 169, 195, 0.1)', px: 1.5, py: 0.5, borderRadius: 1 }}>
          <Typography variant="caption" sx={{ color: theme.palette.primary.text3, fontWeight: 'bold' }}>
            مخطط شريطي
          </Typography>
        </Box>
      </Box>

      {/* الأسطر البيانية الأفقية الديناميكية */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, flexGrow: 1, justifyContent: 'center' }}>
        {rowData.map((row, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: row.color, fontWeight: "bold" }}>
                {row.label}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.primary.text3 }}>
                  {row.count}
                </Typography>
                <Typography variant="caption" sx={{ color: row.color, bgcolor: `${row.color}15`, px: 0.8, py: 0.2, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {row.percentage}%
                </Typography>
              </Box>
            </Box>
            
            {/* حاوية شريط التقدم اللينيير المعتمد على الداتا الجديدة */}
            <Box sx={{ height: 8, borderRadius: 5, bgcolor: 'rgba(232, 234, 241, 1)', width: '100%', position: 'relative', overflow: 'hidden' }}>
              <Box
                component={motion.div}
                style={{ originX: 1 }} // للتوافق المثالي مع اتجاه الكتابة والنمو العربي الـ RTL
                initial={{ width: "0%" }}
                whileInView={{
                  width: [
                    "0%", 
                    `${Math.min(row.percentage + 10, 100)}%`, 
                    `${Math.max(row.percentage - 8, 0)}%`,   
                    `${Math.min(row.percentage + 4, 100)}%`,  
                    `${row.percentage}%`                      
                  ]
                }}
                viewport={{ once: true, amount: 0.2 }} 
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  delay: index * 0.15 
                }}
                sx={{
                  height: '100%',
                  borderRadius: 5,
                  bgcolor: row.color,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* المؤشرات السفلية المحدثة من الإيباي */}
      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
        <Box sx={{ flex: 1, bgcolor: "rgba(5, 223, 114, 0.05)", p: 1.5, borderRadius: 3, textAlign: 'center', border: '1px solid rgba(161, 169, 195, 0.1)' }}>
          <Typography variant="caption" sx={{ color: blue5, fontWeight: 'bold' }}>إجمالي الطلبات</Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.text3, fontWeight: 'bold', mt: 0.5 }}>
            {totalRequests}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: successBg, p: 1.5, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: greenColor, fontWeight: 'bold' }}>معدل القبول</Typography>
          <Typography variant="h6" sx={{ color: greenColor, fontWeight: 'bold', mt: 0.5 }}>
            {summary.acceptance_rate}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}