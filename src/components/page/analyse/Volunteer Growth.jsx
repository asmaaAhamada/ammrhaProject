import React, { useEffect, useMemo } from "react";
import { Box, Typography, Skeleton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup } from "victory";
import { motion, useMotionValue, useTransform, animate as framerAnimate } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchvolunteersHome } from "../../../backend/slice/dashbord/homePage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

function Counter({ value, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = framerAnimate(count, value, {
      duration: 2,
      delay,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, delay]);

  return <motion.span>{rounded}</motion.span>;
}

const VolunteerGrowth = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const MotionBox = motion(Box);

  // الاعتماد كلياً على الـ Slice الخاص بالصفحة الرئيسية للمتطوعين
  const { data: serverData, isLoading, error } = useSelector((state) => state.fetchvolunteersHome);

  useEffect(() => {
    dispatch(fetchvolunteersHome());
  }, [dispatch]);

  // 1. معالجة بيانات مخطط النمو الجدد
  const chartData = useMemo(() => {
    const monthlyList = serverData?.data?.monthly_activity || [];
    if (monthlyList.length === 0) return [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return monthlyList.map((item) => {
      const monthIndex = parseInt(item.month.split("-")[1], 10) - 1;
      return {
        x: monthNames[monthIndex] || item.month,
        y: item.count || 0,
      };
    });
  }, [serverData]);

  // 2. معالجة بيانات أحدث طلبات التطوع
  const latestRequests = useMemo(() => {
    return serverData?.data?.latest_requests || [];
  }, [serverData]);

  // ================= 1. حالة التحميل (Skeleton Loading) =================
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3, width: "100%", direction: "rtl" }}>
        {/* شاشة تحميل المخطط */}
        <Box sx={{ flex: 1.8, height: "347px", backgroundColor: theme.palette.primary?.Appar2 || "#ffffff", borderRadius: "14px", padding: "24px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}>
          <Skeleton variant="text" width="120px" height="28px" sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height="210px" sx={{ borderRadius: "8px" }} />
        </Box>
        {/* شاشة تحميل الطلبات الأخيرة */}
        <Box sx={{ flex: 1.2, height: "347px", backgroundColor: theme.palette.primary?.Appar2 || "#ffffff", borderRadius: "14px", padding: "24px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}>
          <Skeleton variant="text" width="140px" height="28px" sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height="210px" sx={{ borderRadius: "8px" }} />
        </Box>
      </Box>
    );
  }

  // ================= 2. حالة وجود خطأ (Error State) =================
  if (error) {
    return (
      <Box sx={{ width: "100%", height: "347px", backgroundColor: theme.palette.primary?.Appar2 || "#ffffff", borderRadius: "14px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}>
        <Typography sx={{ color: "error.main", fontWeight: 600, fontSize: "15px" }}>
          حدث خطأ أثناء تحميل بيانات لوحة المتطوعين: {error}
        </Typography>
      </Box>
    );
  }

  // ================= 3. العرض الطبيعي المدمج احترافياً عريضاً وبصرياً =================
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", lg: "row" }, 
        gap: 3, 
        width: "100%", 
        direction: "rtl" 
      }}
    >
      {/* القسم الأول: مخطط نمو المتطوعين الجدد */}
      <MotionBox
        initial={{ opacity: 0, x: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          flex: 1.8,
          height: "347px",
          backgroundColor: theme.palette.primary?.Appar2 || "#ffffff",
          borderRadius: "14px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "hidden", 
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 700, textAlign: "right", color: theme.palette.primary.text3, mb: 1 }}>
          نمو المتطوعين الجدد
        </Typography>

        <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ width: "100%", height: "210px" }}>
            {chartData.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Typography sx={{ color: theme.palette.primary.text5, fontSize: "14px" }}>
                  لا توجد بيانات نمو متاحة
                </Typography>
              </Box>
            ) : (
              <VictoryChart responsive={true} padding={{ top: 10, bottom: 35, left: 45, right: 20 }} height={200}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity={0.00} />
                  </linearGradient>
                </defs>
                <VictoryAxis
                  tickValues={chartData.map((d) => d.x)}
                  style={{
                    axis: { stroke: "#E2E8F0", strokeWidth: 1 },
                    ticks: { stroke: "transparent" },
                    tickLabels: { fill: "#64748B", fontSize: 10, fontFamily: "inherit", padding: 5 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: "transparent" },
                    grid: { stroke: "#F1F5F9", strokeDasharray: "4, 4" },
                    tickLabels: { fill: "#94A3B8", fontSize: 10, fontFamily: "inherit", padding: 8 },
                  }}
                />
                <VictoryGroup animate={{ duration: 1200, onLoad: { duration: 1200 } }}>
                  <VictoryArea data={chartData} interpolation="natural" style={{ data: { fill: "url(#areaGradient)" } }} />
                  <VictoryLine data={chartData} interpolation="natural" style={{ data: { stroke: "#0284C7", strokeWidth: 3 } }} />
                  <VictoryScatter data={chartData} size={3.5} style={{ data: { fill: "#ffffff", stroke: "#0284C7", strokeWidth: 2 } }} />
                </VictoryGroup>
              </VictoryChart>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, justifyContent: "flex-start", px: 2 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "3px", backgroundColor: "#0284C7" }} />
            <Typography sx={{ fontSize: "13px", fontWeight: 500, color: theme.palette.primary.text3 }}>
              المتطوعين الجدد المسجلين شهرياً
            </Typography>
          </Box>
        </Box>
      </MotionBox>

      {/* القسم الثاني: عرض عيني وتفاعلي لأحدث طلبات التطوع القادمة من الباكيند */}
      <MotionBox
        initial={{ opacity: 0, x: -20, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          flex: 1.2,
          height: "347px",
          backgroundColor: theme.palette.primary?.Appar2 || "#ffffff",
          borderRadius: "14px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700, color: theme.palette.primary.text3 }}>
            أحدث طلبات التطوع
          </Typography>
          {/* شارة توضح عدد الطلبات المعلقة عطفاً على الـ summary */}
          <Box sx={{ backgroundColor: "rgba(255, 152, 0, 0.1)", color: "#ff9800", px: 1.2, py: 0.4, borderRadius: "20px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
            <PersonAddOutlinedIcon style={{ fontSize: "14px" }} />
            {serverData?.data?.summary?.pending_requests || 0} معلق
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
          {latestRequests.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80%" }}>
              <Typography sx={{ color: theme.palette.primary.text5, fontSize: "13px" }}>
                لا توجد طلبات جديدة معلقة حالياً
              </Typography>
            </Box>
          ) : (
            <List sx={{ width: "100%", padding: 0 }}>
              {latestRequests.map((request, index) => (
                <React.Fragment key={request.id || index}>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.button1, color: "#ffffff", fontSize: "14px", fontWeight: 600 }}>
                        {request.name ? request.name.charAt(0).toUpperCase() : "م"}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600, fontSize: "14px", color: theme.palette.primary.text3 }}>
                          {request.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5, color: theme.palette.primary.text5 }}>
                          <AccessTimeIcon sx={{ fontSize: "13px" }} />
                          <Typography sx={{ fontSize: "12px" }}>{request.created_at_human}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < latestRequests.length - 1 && <Divider variant="inset" component="li" sx={{ opacity: 0.2 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </MotionBox>
    </Box>
  );
};

export default VolunteerGrowth;