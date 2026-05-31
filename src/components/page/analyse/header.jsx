import { Box, Button, Typography } from "@mui/material";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import {useTheme} from '@mui/material/styles' 
import { white } from "../../../style/color-main/color";
export default function Header(){
    const theme = useTheme()
    return(
        <>
        
        <Box
  sx={{
    width: "100%",
    minHeight: "36px",
    display: "flex",
    alignItems: "center",

    // دائماً جنب بعض
    flexDirection: "row",

    justifyContent: {
      xs: "space-between",
      sm: "space-between",
      md: "space-between",
    },

    // تقليل المسافة بالموبايل والتابليت
    gap: {
      xs: 1,
      sm: 1.5,
      md: 2,
    },

    mb: 3,mt:3 
  }}
>
  {/* عنوان الأخبار */}
  <Typography
    sx={{
      fontSize: {
        xs: "14px",
        sm: "18px",
        md: "22px",
      },
      fontWeight: 700,
      color: theme.palette.primary.text3,
      whiteSpace: "nowrap",mr: {
      
      md: 2,
    },
    }}
  >
لوحة التحليلات والإحصائيات
  </Typography>

  <Button
onClick={() => setOpen(true)}
    variant="contained"
    sx={{
      width: {
        xs: "140px",
        sm: "160px",
        md: "177px",
      },

      height: "43px",

      borderRadius: "12px",
       backgroundColor:
                    theme.palette.primary.button1,
                  color: white,
      boxShadow: "none",

      fontSize: {
        xs: "10px",
        sm: "14px",
        md: "15px",
      },

      fontWeight: 600,
      textTransform: "none",

      "&:hover": {
        backgroundColor: "#162d6b",
        boxShadow: "none",
      },
    }}
  >
    
تصدير التقرير
<DownloadOutlinedIcon sx={{width:'18px',height:'18px' ,mr:2}}/>
  </Button>
</Box>
        </>
    )
}

