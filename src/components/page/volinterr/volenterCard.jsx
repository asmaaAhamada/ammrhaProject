import { Box, Button, Card, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { babyblue, darkgray, light_blue, white } from "../../../style/color-main/color";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { motion } from "framer-motion"; // تأكد من المسار الصحيح للمكتبة
import { fetchrequest_pinding } from "../../../backend/slice/volnteers/request/pinding";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




export default function VolnteersCard(){
    const navigate = useNavigate(); // 👇 هاتف التنقل
  
   const { data, isLoading, error } = useSelector((state) => state.fetchrequest_pinding);
  const dispatch = useDispatch();
 
   useEffect(() => {
    dispatch(fetchrequest_pinding());
    }, [dispatch]);
  
      const MotionButton = motion(Button);

    const theme = useTheme()
    return(
        <>
       <Grid item xs={12} lg={4}>
          <Card
            sx={{
              width: "100%",
              maxWidth: "370px",
              height: "374px",
              borderRadius: "20px",
              p: 3,
              mx: "auto",
              
              
              mt:{xs:2,md:-2 },
              display: "flex",
              flexDirection: "column",                        backgroundColor: theme.palette.primary.Appar2,

              justifyContent: "space-between",
            }}
          >
            {/* العنوان */}
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",      color:theme.palette.primary.text3

                }}
              >
                أحدث الأشخاص
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: darkgray,
                }}
              >
                قائمة آخر الأشخاص المضافين
              </Typography>
            </Box>

            {/* الليست */}
            <List>
              {data.map((data) => (
                <ListItem
  key={data.id}
  sx={{
    display: "flex",
    alignItems: "center",
  }}
>
                      <IconButton
                              sx={{
                                width: {
                                  xs: 38,
                                  sm: 40,
                                },
                    
                                height: {
                                  xs: 38,
                                  sm: 40,borderRadius: "24px",
                                },
                    
                                backgroundColor: babyblue,ml:2 ,
                    
                              }}
                            >
                 <PersonAddAltOutlinedIcon sx={{color:light_blue}}/>
</IconButton>
                  <ListItemText
  primary={data.full_name}
  sx={{
    textAlign: "right",color:theme.palette.primary.chip,
    flexGrow: 1,
  }}
/>
                   <Button
                    variant="contained"
                    size="small"
                     onClick={() => navigate("/orders")} 
                    sx={{
mr: "auto",
                      borderRadius: "12px",width:{xs:'120px' ,md:'129px'}
,   height:{xs:'41px' ,md:'41px'},                     bgcolor: theme.palette.primary.button1,color:white,

                    }}
                  >
                    مراجعة الطلب
                  </Button>
                </ListItem>
                
              ))}
            </List>

            {/* زر عرض الكل */}
             <MotionButton
        initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 7}}
  transition={{ duration: 1 }}
   onClick={() => navigate("/orders")} 
              variant="contained"
              fullWidth
              sx={{
                mt: 2,bgcolor: theme.palette.primary.button1,color:white,
                borderRadius: "12px",
                height: "45px",
              }}
            >
              عرض قائمة الطلبات
            </MotionButton>
          </Card>
        </Grid>
        
        </>
    )
}




