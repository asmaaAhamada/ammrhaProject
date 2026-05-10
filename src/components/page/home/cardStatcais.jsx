import { Box, Grid, Card, Typography, IconButton } from "@mui/material";
import  FrazingIcon  from "../../../assets/icons/UserGear.svg?react";
import { babyblue, babyPink, babyyallow, blue3, blue4, Pink, yallow } from "../../../style/color-main/color";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import { useTheme } from "@mui/material/styles";
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';


export default function Cards() {
    const theme= useTheme()
    const items = [
  {
    icon: <PeopleOutlinedIcon />,
    title: "إجمالي المتطوعين",
    subtitle: "000",
    bg: babyblue,
    iconColor: blue3,
  },
  {
    icon: <EventBusyOutlinedIcon />,
    title: "القائمة السوداء",
    subtitle: "33",
    bg: babyPink,
    iconColor: Pink,
  },
  {
    icon: <QueryBuilderOutlinedIcon />,
    title: "الطلبات المعلقة",
    subtitle: "33",
    bg: babyyallow,
    iconColor: yallow,
  },
  {
    icon: <FrazingIcon sx={{fontSize:'36px'}}/>,
    title: "المجمدين",
    subtitle: "488",
    bg:  theme.palette.primary.button,
    iconColor: theme.palette.primary.drower,
  },
];
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {items.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                        backgroundColor: theme.palette.primary.Appar2,

                width: "275px",
                height: "137px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                px: 2,
              }}
            >
              {/* Text */}
              <Box  >
                <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize:'16px',color: theme.palette.primary.text3}}>
                  {item.title}
                </Typography>

                <Typography  sx={{fontSize:'36px',color: theme.palette.primary.text4}}>
                  {item.subtitle}
                </Typography>
              </Box>

              {/* Icon Button */}
              <IconButton
                sx={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: item.bg,borderRadius:'14px',
                  color: item.iconColor,
                  "&:hover": {
                    backgroundColor: item.bg,
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}