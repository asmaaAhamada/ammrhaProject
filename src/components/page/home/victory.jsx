import { useTheme } from "@mui/material/styles";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis
} from "victory";

export default function GrowthChart() {
    const theme = useTheme()
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
      height={300}
padding={{ top: 20, bottom: 90,  }}    >
      {/* المحور السفلي */}
     <VictoryAxis
  tickValues={[1, 2, 3, 4, 5]}
  tickFormat={["يناير", "فبراير", "مارس", "أبريل", "مايو"]}
  style={{
    axis: {
      stroke: 'rgba(156, 163, 175, 1)',
    },
    ticks: {
      stroke: 'rgba(156, 163, 175, 1)',
      size: 5,
    },
    tickLabels: {
      fill: 'rgba(156, 163, 175, 1)',
      fontSize: 12,
      padding: 10,
    },
  }}
/>

      {/* المحور الجانبي */}
      <VictoryAxis dependentAxis />

      {/* الخط التصاعدي */}
      <VictoryLine
        data={data}
        interpolation="natural"
        style={{
          data: {
            stroke: theme.palette.primary.text3,
            strokeWidth: 4,
          },
        }}
      />
    </VictoryChart>
  );
}