import {
  Box,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
} from "@mui/material";
import PlanStatcais from "./planstatcais";
import VolnteersCard from "./volenterCard";



export default function DashboardSection() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* البوكس الأول */}
        <PlanStatcais/>

        {/* البوكس الثاني */}
      <VolnteersCard/>
      </Grid>
    </Box>
  );
}