import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  lazy,
  Suspense,
} from "react";

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
import { useSelector } from "react-redux"; 

import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import ReportIcon from "../../assets/icons/Icon.svg?react";
import FrazingIcon from "../../assets/icons/UserGear.svg?react";
import CheckIcon from "../../assets/icons/reac.svg?react";
import ClassIcon from "../../assets/icons/class.svg?react";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import BlockIcon from "@mui/icons-material/Block";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import SeventeenMpOutlinedIcon from '@mui/icons-material/SeventeenMpOutlined';
import {
  blue1,
  darkgray,
  mainColor,
} from "../../style/color-main/color";

import LogoHeader from "./logoHeader";

// LAZY LOADING
const TopBar = lazy(() => import("./TopBar"));
const UserMenuSection = lazy(() =>
  import("../user/usersection")
);

// ================= MENU ITEMS =================

const menuItems = [
  {
    text: "لوحة التحكم",
    icon: <DashboardOutlinedIcon />,
    path: "/home",
  },
  {
    text: "التحليلات",
    icon: <AssessmentOutlinedIcon />,
    path: "/analyse",
  },
  {
    text: "الأخبار",
    icon: <ReceiptLongOutlinedIcon />,
    path: "/News",
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
    text: "الأقسام",
    icon: <ReportIcon />,
    path: "/section",
  },
  {
    text: "الفعاليات",
    icon: <SeventeenMpOutlinedIcon />,
    path: "/Events",
  },
  {
    text: "الشكاوي",
    icon: <CreditCardOffOutlinedIcon />,
    path: "/Complaints",
  },
  {
    text: "الحسابات المجمدة",
    icon: <FrazingIcon />,
    path: "/frazing",
  },
  {
    text: "القائمة السوداء",
    icon: <BlockIcon />,
    path: "/black",
  },
  {
    text: "معايير التقييم",
    icon: <CheckIcon />,
    path: "/Criteria",
  },
  {
    text: "خوارزمية الرتب ",
    icon: <MilitaryTechOutlinedIcon />,
    path: "/Rank",
  },
  {
    text: "لوحة الشرف",
    icon: <ClassIcon />,
    path: "/Honor",
  },
];

// ================= SIDEBAR ITEM =================

const SidebarItem = memo(
  ({ item, active, navigate, isDesktop, setMobileOpen, theme }) => {
    return (
      <ListItemButton
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

          boxShadow: active
            ? "0 4px 12px rgba(43, 127, 255, 0.2)"
            : "none",

          display: "flex",
          alignItems: "center",
          gap: 2,

          color: active
            ? theme.palette.primary.text3
            : darkgray,

          backgroundColor: active
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
            color: active
              ? theme.palette.primary.text3
              : darkgray,

            minWidth: "unset",
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
            fontSize: 15,
            textAlign: "right",
            fontWeight: 600,
          }}
        />
      </ListItemButton>
    );
  }
);

// ================= MAIN COMPONENT =================

function Sidebar({ toggleMode, mode }) {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const isDesktop = useMediaQuery(
    theme.breakpoints.up("md")
  );

  const [mobileOpen, setMobileOpen] = useState(false);

const userRole = useSelector(
  (state) => state.user?.userInfo?.role
);
const adminPages = [
  "/section",
  "/analyse",
  "/Complaints"
  
];
console.log("role =", userRole);
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.path === "/orders") {
        return userRole === "hr_general";
      
      }
    if (adminPages.includes(item.path)) {
        return userRole === "admin"
      }
      return true;
    });
  }, [userRole]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const drawerContent = (
    <Box
      sx={{
        width: "256px",
        height: "100vh",
        backgroundColor: theme.palette.primary.Appar,
        color: mainColor,
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden", 
      }}
    >
      <LogoHeader />

      <List sx={{ 
        mt: 0, 
        flex: 1,         
        overflowY: "auto", 
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>      
        {filteredMenuItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            active={location.pathname === item.path}
            navigate={navigate}
            isDesktop={isDesktop}
            setMobileOpen={setMobileOpen}
            theme={theme}
          />
        ))}
      </List>

      <Suspense fallback={null}>
        <UserMenuSection />
      </Suspense>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      {/* MOBILE APPBAR */}
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

            <Typography
              sx={{
                fontWeight: 600,
                mr: 3,
              }}
            >
              القائمة
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* DESKTOP DRAWER */}
      {isDesktop ? (
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: "256px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 266,
              height: "100vh",
              backgroundColor: theme.palette.primary.Appar,
              border: "none",
              boxSizing: "border-box",
              overflow: "hidden", 
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // MOBILE DRAWER - تم تصحيح الـ sx والأقواس وعلامات التنصيص هنا بالأسفل
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
              width: 276,
              height: "100vh",
              backgroundColor: theme.palette.primary.Appar,
              border: "none",
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mt: { xs: 5, md: 0 },
        }}
      >
        <Suspense fallback={null}>
          <TopBar
            toggleMode={toggleMode}
            mode={mode}
          />
        </Suspense>

        <Outlet />
      </Box>
    </Box>
  );
}

export default memo(Sidebar);