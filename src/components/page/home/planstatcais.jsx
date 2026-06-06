import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { darkgray } from "../../../style/color-main/color";
import GrowthChart from "./victory";

export default function PlanStatcais(){
    const theme = useTheme();
    
    return(
        <>
        {/* جعل الـ Grid يأخذ المساحة كاملة على الشاشات الصغيرة وللشاشات الكبيرة lg={8} */}
        <Grid item xs={12} lg={8} sx={{ width: '100%' }}>
          <Card
            sx={{
              width: "100%",
              maxWidth: "727px",
              height: { xs: "auto", sm: "374px" }, // ارتفاع مرن على الشاشات الصغيرة جداً لمنع القَص
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.Appar2,
              p: { xs: 2, sm: 3 }, // بايدنج مرن حسب حجم الشاشة
              mx: "auto",
              mt: -2,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {/* النصوص */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                textAlign: "right",
                mb: 1,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "right",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: theme.palette.primary.text3
                }}
              >
                نشاط المتطوعين
              </Typography>

              <Typography
                sx={{
                  width: "100%",
                  textAlign: "right",
                  fontSize: "14px",
                  color: darkgray,
                }}
              >
                إحصائيات الأشهر السبعة الماضية
              </Typography>
            </Box>

            {/* بوكس المخطط مستقر ومتجاوب بالكامل بدون قص حواف */}
            <Box
              sx={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible", // تضمن ظهور الأرقام على اليسار كاملة دون انقطاع
                minHeight: { xs: "220px", sm: "auto" }, // حجز مساحة دنيا على الموبايل
                "& svg": {
                  width: "100% !important",
                  height: "100% !important",
                }
              }}
            >
              <GrowthChart/>
            </Box>
          </Card>
        </Grid>
        </>
    );
}