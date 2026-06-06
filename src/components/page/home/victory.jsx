import { useTheme } from "@mui/material/styles";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis
} from "victory";

export default function GrowthChart() {
  const theme = useTheme();
  
  const data = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 35 },
    { x: 4, y: 50 },
    { x: 5, y: 80 },
  ];

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      height={260}
      width={600}
      // 👇 تم زيادة الـ left إلى 55 والـ right إلى 25 لتوفير مساحة أمان مريحة تمنع القطع
      padding={{ top: 20, bottom: 45, left: 55, right: 25 }} 
    >
      {/* المحور السفلي */}
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={["يناير", "فبراير", "مارس", "أبريل", "مايو"]}
        style={{
          axis: { stroke: 'rgba(156, 163, 175, 1)' },
          ticks: { stroke: 'rgba(156, 163, 175, 1)', size: 5 },
          tickLabels: { fill: 'rgba(156, 163, 175, 1)', fontSize: 11, padding: 8 },
        }}
      />

      {/* المحور الجانبي */}
      <VictoryAxis 
        dependentAxis 
        style={{
          axis: { stroke: 'transparent' },
          grid: { stroke: 'rgba(156, 163, 175, 0.1)', strokeDasharray: "4, 4" },
          tickLabels: { fill: 'rgba(156, 163, 175, 1)', fontSize: 11, padding: 8 },
        }}
      />

      {/* الخط التصاعدي - مع حركة الرسم والارتفاع التدريجي المدمجة */}
      <VictoryLine
        data={data}
        interpolation="natural"
        
        // 👇 هذا الكود يجعل الخط يرتفع وينرسم بالتدريج صعوداً فور فتح الصفحة خلال ثانيتين
        animate={{
          duration: 2000,
          onLoad: { duration: 2000 }
        }}
        
        style={{
          data: {
            stroke: theme.palette.primary.text3,
            strokeWidth: 4,
            strokeLinecap: "round"
          },
        }}
      />
    </VictoryChart>
  );
}