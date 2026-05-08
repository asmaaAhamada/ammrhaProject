import { Box, Typography } from "@mui/material";
import { blue1, gray11, gray12 } from "../../style/color-main/color";

export default function Hello(){
    return(

<>
    <Box sx={{ direction: 'rtl', textAlign: 'right', width: '100%' }}>

 <Typography sx={{ color:gray11, fontSize: '24px', mb: 1 }}>
            مرحباً بعودتك
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: blue1, mb: 1 ,fontSize: '24px'}}>
            تسجيل الدخول
          </Typography>
          <Typography sx={{ color: gray12, mb: 4, fontSize: '12px' }}>
            ادخل بياناتك للمتابعة
          </Typography>
</Box>
</>



    )
}