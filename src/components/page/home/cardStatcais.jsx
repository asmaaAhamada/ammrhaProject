import { Box, Grid, Card, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

const items = [
  { icon: <HomeIcon />, title: "العنوان الأول", subtitle: "الوصف الأول" },
  { icon: <StarIcon />, title: "العنوان الثاني", subtitle: "الوصف الثاني" },
  { icon: <SettingsIcon />, title: "العنوان الثالث", subtitle: "الوصف الثالث" },
  { icon: <PersonIcon />, title: "العنوان الرابع", subtitle: "الوصف الرابع" },
];

export default function Cards() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {items.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}   // موبايل: كارد واحد
            sm={6}    // تابلت: كاردين
            md={3}    // لابتوب: 4 كروت
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: '275px',
                height: '137px',
                display: "flex",
                alignItems: "center",
                padding: 2,
                borderRadius: 3,
              }}
            >
              {/* Icon left */}
              <Box sx={{ marginRight: 2, display: "flex", alignItems: "center" }}>
                {item.icon}
              </Box>

              {/* Text right */}
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}