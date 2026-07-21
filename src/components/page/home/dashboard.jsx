import { Box, Grid } from "@mui/material";
import PlanStatcais from "./planstatcais";
import VolnteersCard from "../volinterr/volenterCard";
import { useSelector } from "react-redux";

export default function DashboardSection() {
  const userRole = useSelector(
  (state) => state.user?.userInfo?.role
);
  return (
    <Box sx={{ p: 2, width: "100%", boxSizing: "border-box" }}>
      <Grid container spacing={2}>
        {/* البوكس الأول - نشاط المتطوعين */}
        <PlanStatcais/>

        {/* البوكس الثاني - الكارت الآخر */}
        {userRole === "hr_general" &&   
        <VolnteersCard/>
}
      </Grid>
    </Box>
  );
}