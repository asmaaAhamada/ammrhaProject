import { Button } from "@mui/material";
import Cards from "./cardStatcais";
import DashboardSection from "./dashboard";
import  VolunteersTable from '../volinterr/volintersTable'
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

export default function HomePage(){
    const theme =useTheme()
    return(
        <>
        <Cards/>
        <DashboardSection/>
 <VolunteersTable
      topContent={
        <Button
          sx={{
            backgroundColor:
              theme.palette.primary.button1,
            color: white,width:{xs:'200px',md:'245px'},height:{xs:'40px',md:'43px'}
,            borderRadius: "12px",
          }}
        >
          مشاهدة جميع المتطوعين
        </Button>
      }
    />       </>
    )
}