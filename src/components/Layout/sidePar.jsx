import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import  ReportIcon  from "../../assets/icons/Icon.svg?react";
import  StatcsIcon  from "../../assets/icons/satists.svg?react";
import  BlackIcon  from "../../assets/icons/CalendarSlash.svg?react";
import  FrazingIcon  from "../../assets/icons/UserGear.svg?react";
import  CheckIcon  from "../../assets/icons/reac.svg?react";
import  ClassIcon  from "../../assets/icons/class.svg?react";

import { blue1, darkgray, mainColor } from "../../style/color-main/color";

import image from "../../assets/image/logo/logo.jpg";

import TopBar from "./TopBar";
import LogoHeader from "./logoHeader";
import UserMenuSection from "../user/usersection";

export default function Sidebar({ toggleMode, mode }) {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  // md وما فوق = لابتوب
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // عناصر التنقل
  const menuItems = [
    {
      text: "لوحة التحكم",
      icon: <DashboardOutlinedIcon />,
      path: "/home",
    },

    {
      text: "المتطوعين",
      icon: <PeopleOutlinedIcon />,
      path: "/volunteers",
    },

    {
      text: "الطلبات",
      icon: <ReportIcon />,
      path: "/orders",
    },

    {
      text: "الحسابات المجمدة",
      icon: <FrazingIcon />,
      path: "/frazing",
    },

    {
      text: "القائمة السوداء",
      icon: <BlackIcon />,
      path: "/black",
    },
    {
      text: "معايير التقييم",
      icon: <CheckIcon />,
      path: "/evalouit",
    },
    {
      text: "لوحة الشرف",
      icon: <ClassIcon />,
      path: "/evalouit",
    },

  ];

  // محتوى السايدبار
  const drawerContent = (
    <Box
      sx={{
        width: "256px",
        height: "100%",
        backgroundColor: theme.palette.primary.Appar,
        color: mainColor,
        direction: "rtl",display: "flex", // تحويل الحاوية لـ Flex
        flexDirection: "column", // ترتيب العناصر عمودياً
        justifyContent: "space-between",
      }}
    >
      {/* اللوجو */}
      <LogoHeader/>

      {/* القائمة */}
<List sx={{ mt: 0 }}>
  {menuItems.map((item, index) => (
  <ListItemButton
  key={index}
  onClick={() => {
    navigate(item.path);

    if (!isDesktop) {
      setMobileOpen(false);
    }
  }}
  sx={{
    mx: 1,
    mb: 1,
    borderRadius: "14px",
    minHeight: 30,
boxShadow: location.pathname === item.path
  ? "0 4px 12px rgba(43, 127, 255, 0.2)"
  : "none",
    display: "flex",
    alignItems: "center",
    gap: 2, // المسافة بين الأيقونة والكلمة

    color:
      location.pathname === item.path
        ? theme.palette.primary.text3
        : darkgray,

    backgroundColor:
      location.pathname === item.path
        ? theme.palette.primary.button2
        : "transparent",

    "&:hover": {
      backgroundColor: mainColor,
      color: blue1,
    },
  }}
>
  <ListItemIcon
    sx={{
      color:
        location.pathname === item.path
          ? theme.palette.primary.text3
          : darkgray,

      minWidth: "unset", // إزالة العرض الافتراضي
    }}
  >
    {item.icon}
  </ListItemIcon>

  <ListItemText
    primary={item.text}
    sx={{
      margin: 0, 
    }}
    primaryTypographyProps={{
      fontSize: 15,textAlign:'right',
      fontWeight: 600,
    }}
  />
</ListItemButton>
  ))}
</List>
         {/* هنا نضع الكود الذي صممناه سابقاً */}
         <UserMenuSection /> 
         
       </Box>

  );

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      {/* AppBar للموبايل فقط */}
      {!isDesktop && (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: blue1,
          }}
        >
          <Toolbar>
            <IconButton
              sx={{
                color: "white",
              }}
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography sx={{ fontWeight: 600, mr: 3 }}>
              القائمة
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar ثابت للابتوب */}
      {isDesktop ? (
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: "256px",
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              width: "256px",
              boxSizing: "border-box",
              border: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Drawer للموبايل والتابليت
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "256px",
              border: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* محتوى الصفحة */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mt: { xs: 5, md: 0 },
        }}
      >
        <TopBar toggleMode={toggleMode} mode={mode} />

        <Outlet />
      </Box>
    </Box>
  );
}