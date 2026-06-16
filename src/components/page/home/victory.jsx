import React, { useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Skeleton } from "@mui/material";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter
} from "victory";
import { fetchvolunteersHome } from "../../../backend/slice/dashbord/homePage";
import { useDispatch, useSelector } from "react-redux";

export default function GrowthChart() {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات من الـ Store
  const { data: serverData, isLoading, error } = useSelector((state) => state.fetchvolunteersHome);

  useEffect(() => {
    dispatch(fetchvolunteersHome());
  }, [dispatch]);

  // قاموس تحويل أرقام الشهور إلى اللغة العربية
  const arabicMonths = useMemo(() => ({
    "01": "يناير", "02": "فبراير", "03": "مارس", "04": "أبريل",
    "05": "مايو", "06": "يونيو", "07": "يوليو", "08": "أغسطس",
    "09": "سبتمبر", "10": "أكتوبر", "11": "نوفمبر", "12": "ديسمبر"
  }), []);

  // معالجة البيانات القادمة من الباكيند
  const chartData = useMemo(() => {
    const monthlyList = serverData?.data?.monthly_activity || [];
    
    return monthlyList.map((item) => {
      const monthParts = item.month.split("-");
      const monthKey = monthParts[1]; 
      
      return {
        x: arabicMonths[monthKey] || item.month,
        y: item.count || 0
      };
    });
  }, [serverData, arabicMonths]);

  // فحص ما إذا كان هناك نقطة واحدة فقط لمنع التشوه العشري في Victory
  const isSinglePoint = chartData.length === 1;

  // حسم أعلى قيمة لعرضها على المحور لمنع توليد كسور مجهرية
  const maxYValue = useMemo(() => {
    if (isSinglePoint) {
      return chartData[0].y;
    }
    return undefined;
  }, [chartData, isSinglePoint]);

  // ================= حالات التحميل والخطأ =================
  if (isLoading) {
    return (
      <Box sx={{ width: "100%", height: 260, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "8px", opacity: 0.1 }} />
      </Box>
    );
  }

  if (error || !serverData?.success) {
    return (
      <Box sx={{ width: "100%", height: 260, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ color: "error.main", fontSize: "13px", fontWeight: 500 }}>
          حدث خطأ أثناء تحميل بيانات المخطط
        </Typography>
      </Box>
    );
  }

  if (chartData.length === 0) {
    return (
      <Box sx={{ width: "100%", height: 260, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
          لا توجد بيانات متاحة حالياً
        </Typography>
      </Box>
    );
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      height={260}
      width={600}
      padding={{ top: 20, bottom: 45, left: 55, right: 25 }}
      // تثبيت النطاق العمودي عند وجود نقطة واحدة بيبدأ من 0 وحتى القيمة المستهدفة لإجبار المكتبة على عدم اختراع أرقام عشرية
      domain={isSinglePoint ? { y: [0, maxYValue + 10] } : undefined}
    >
      {/* المحور السفلي الأفقي X */}
      <VictoryAxis
        tickValues={chartData.map((d) => d.x)}
        style={{
          axis: { stroke: 'rgba(156, 163, 175, 1)' },
          ticks: { stroke: 'rgba(156, 163, 175, 1)', size: 5 },
          tickLabels: { fill: 'rgba(156, 163, 175, 1)', fontSize: 11, padding: 8, fontFamily: "inherit" },
        }}
      />

      {/* المحور الجانبي الرأسي Y */}
      <VictoryAxis 
        dependentAxis
        // تحديد الترقيم بشكل صحيح بدون كسور عشرية غريبة
        tickFormat={(t) => (Math.floor(t) === t ? t : "")}
        tickValues={isSinglePoint ? [0, Math.floor(maxYValue / 2), maxYValue] : undefined}
        style={{
          axis: { stroke: 'transparent' },
          grid: { stroke: 'rgba(156, 163, 175, 0.1)', strokeDasharray: "4, 4" },
          tickLabels: { fill: 'rgba(156, 163, 175, 1)', fontSize: 11, padding: 8, fontFamily: "inherit" },
        }}
      />

      {/* رسم الخط البياني */}
      <VictoryLine
        data={chartData}
        interpolation="natural"
        animate={{
          duration: 2000,
          onLoad: { duration: 2000 }
        }}
        style={{
          data: {
            stroke: theme.palette?.primary?.text3 || "#0284C7",
            strokeWidth: 4,
            strokeLinecap: "round"
          },
        }}
      />

      {/* إضافة نقطة مميزة واضحة (Scatter) فوق الخط لتوضيح القيمة عطفاً على التصميم الجديد */}
      <VictoryScatter
        data={chartData}
        size={5}
        style={{
          data: {
            fill: "#ffffff",
            stroke: theme.palette?.primary?.text3 || "#0284C7",
            strokeWidth: 3
          }
        }}
      />
    </VictoryChart>
  );
}