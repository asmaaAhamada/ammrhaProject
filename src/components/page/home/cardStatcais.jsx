import { Box, Grid, Card, Typography, IconButton } from "@mui/material";
import FrazingIcon from "../../../assets/icons/UserGear.svg?react";
import {
  babyblue,
  babyPink,
  babyyallow,
  blue3,
  Pink,
  yallow,
} from "../../../style/color-main/color";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { useTheme } from "@mui/material/styles";

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

function Counter({ value, delay = 0 }) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, delay, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Cards() {
  const MotionCard = motion(Card);
  const theme = useTheme();

  const items = [
    {
      icon: <PeopleOutlinedIcon />,
      title: "إجمالي المتطوعين",
      subtitle: 1250,
      bg: babyblue,
      iconColor: blue3,
    },
    {
      icon: <EventBusyOutlinedIcon />,
      title: "القائمة السوداء",
      subtitle: 33,
      bg: babyPink,
      iconColor: Pink,
    },
    {
      icon: <QueryBuilderOutlinedIcon />,
      title: "الطلبات المعلقة",
      subtitle: 33,
      bg: babyyallow,
      iconColor: yallow,
    },
    {
      icon: <FrazingIcon />,
      title: "المجمدين",
      subtitle: 488,
      bg: theme.palette.primary.button,
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
            <MotionCard
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
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
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    fontSize: "16px",
                    color: theme.palette.primary.text3,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: theme.palette.primary.text4,
                  }}
                >
                  <Counter
                    value={item.subtitle}
                    delay={index * 0.2 + 0.4}
                  />
                </Typography>
              </Box>

              <IconButton
                sx={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: item.bg,
                  borderRadius: "14px",
                  color: item.iconColor,
                  "&:hover": {
                    backgroundColor: item.bg,
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}