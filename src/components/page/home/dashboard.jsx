import { Box, Grid } from "@mui/material";
import PlanStatcais from "./planstatcais";
import VolnteersCard from "../volinterr/volenterCard";

export default function DashboardSection() {
  return (
    <Box sx={{ p: 2, width: "100%", boxSizing: "border-box" }}>
      <Grid container spacing={2}>
        {/* البوكس الأول - نشاط المتطوعين */}
        <PlanStatcais/>

        {/* البوكس الثاني - الكارت الآخر */}
        <VolnteersCard/>
      </Grid>
    </Box>
  );
}