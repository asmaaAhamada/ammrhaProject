import { Box } from "@mui/material";
import image from '../../assets/image/Container.png'

export default function ImageCard(){
    return(

<>

<Box
          sx={{
            flex: 1, // يأخذ النصف الآخر (537px)
            height: '100%',
            backgroundColor: '#13296a', // اللون الأزرق الغامق من فيجما
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            src={image}
            alt="login visual"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // يجعل الصورة تملأ المساحة بالكامل بدون فراغات
            }}
          />
        </Box>

</>



    )
}