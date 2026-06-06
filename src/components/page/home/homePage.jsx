import { Button } from "@mui/material";
import Cards from "./cardStatcais";
import DashboardSection from "./dashboard";
import  VolunteersTable from '../volinterr/volintersTable'
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { motion } from "framer-motion"; // تأكد من المسار الصحيح للمكتبة

export default function HomePage(){
      const MotionButton = motion(Button);

    const theme =useTheme()
    return(
        <>
        <Cards/>
        <DashboardSection/>
 <VolunteersTable
      topContent={
         <MotionButton
        initial={{ opacity: 0, x: -250 }}
  animate={{ opacity: 1, x: 7}}
  transition={{ duration: 2.5 }}

          sx={{
            backgroundColor:
              theme.palette.primary.button1,
            color: white,width:{xs:'200px',md:'245px'},height:{xs:'40px',md:'43px'}
,            borderRadius: "12px",mb:-1
,
  "&:hover": {
    backgroundColor: theme.palette.primary.button1, // نفس اللون بدون تغيير
    boxShadow: "none",
  },
          }}
        >
          مشاهدة جميع المتطوعين
        </MotionButton>
      }
    />       </>
    )
}