import { Box, Card, Grid, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { darkgray } from "../../../style/color-main/color";
import GrowthChart from "./victory";


export default function PlanStatcais(){
    const theme =useTheme()
    return(
        <>
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              width: "100%",
              maxWidth: "727px",
              height: "374px",
              borderRadius: "16px",                        backgroundColor: theme.palette.primary.Appar2,

              p: 3,
              mx: "auto",mt:-2
            }}
          >
            {/* النصوص */}
           <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    textAlign: "right",
    mb: 3,
    width: "100%",
  }}
>
  <Typography
    sx={{
      width: "100%",
      textAlign: "right",
      fontSize: "20px",
      fontWeight: "700",
      color:theme.palette.primary.text3
    }}
  >
نشاط المتطوعين  </Typography>

  <Typography
    sx={{
      width: "100%",
      textAlign: "right",
      fontSize: "14px",
      color: darkgray,
    }}
  >
إحصائيات الأشهر السبعة الماضية  </Typography>
</Box>

            {/* المخطط الإحصائي */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
<GrowthChart/>            </Box>
          </Card>
        </Grid>
        
        </>
    )
}




