import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { babygreen, babyred, black, blue1, blue3, light_blue, lighttext, white, yallow } from '../../../style/color-main/color';
import {useTheme}  from '@mui/material/styles'

// الألوان المرسلة من قبلك
const cardBg = white;
const textHeader = black;
const lightText = lighttext;
const greenColor = babygreen;
const yellowColor = yallow;
const redColor = 'red';
const blue5 = light_blue;
const successBg = 'rgba(5, 223, 114, 0.1)';

export default function OrdersDistributionCard() {
        const theme =useTheme()

  const rowData = [
    { label: 'المنتهية', count: 156, percentage: 87, color: greenColor },
    { label: 'قيد الانتظار', count: 12, percentage: 7, color: yellowColor },
    { label: 'المرفوضة', count: 12, percentage: 6, color: redColor },
  ];

  return (
   <Box
      dir="rtl"
      sx={{
        width: { xs: '100%', sm: 502  }, // العرض المطلوب تماماً على الشاشات المناسبة
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
        <Typography variant="h6" sx={{      color: theme.palette.primary.text3
, fontWeight: 'bold', fontSize: '1.1rem' }}>
          توزيع الطلبات
        </Typography>
        <Box sx={{ bgcolor: 'rgba(161, 169, 195, 0.1)', px: 1.5, py: 0.5, borderRadius: 1 }}>
          <Typography variant="caption" sx={{       color: theme.palette.primary.text3,
 fontWeight: 'bold' }}>
            مخطط شريطي
          </Typography>
        </Box>
      </Box>

      {/* الأسطر البيانية الأفقية */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, flexGrow: 1, justifyContent: 'center' }}>
        {rowData.map((row, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography
  variant="body2"
  sx={{
    color: row.color,
    fontWeight: "bold",
  }}
>
  {row.label}
</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: textHeader }}>
                  {row.count}
                </Typography>
                <Typography variant="caption" sx={{ color: row.color, bgcolor: `${row.color}15`, px: 0.8, py: 0.2, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {row.percentage}%
                </Typography>
              </Box>
            </Box>
            {/* شريط التقدم اللينيير */}
            <LinearProgress
              variant="determinate"
              value={row.percentage}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: 'rgba(232, 234, 241, 1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  bgcolor: row.color,
                },
              }}
            />
          </Box>
        ))}
      </Box>

      {/* المؤشرات السفلية */}
      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
        <Box sx={{ flex: 1, bgcolor:  "rgba(5, 223, 114, 0.1)", p: 1.5, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color:light_blue, fontWeight: 'bold' }}>إجمالي الطلبات</Typography>
          <Typography variant="h6" sx={{ color:light_blue, fontWeight: 'bold', mt: 0.5 }}>١٨٠</Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: successBg, p: 1.5, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: greenColor, fontWeight: 'bold' }}>معدل القبول</Typography>
          <Typography variant="h6" sx={{ color: greenColor, fontWeight: 'bold', mt: 0.5 }}>٩٣٪</Typography>
        </Box>
      </Box>
    </Box>
  );
}