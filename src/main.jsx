import React, { useState, useMemo, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import { blue, card, darkblack, blue1, darkcard, darkgray, darkwhite, gray1, gray2, gray3, gray4, lightgray, lighttext, mainColor, textheder, white, gray, blue2, gray11, gray13, black, blue4, blue5, light_blue } from './style/color-main/color'

function Main() {

  const [mode, setMode] = useState('light')

 const theme = useMemo(() =>
  createTheme({
   typography: {
  fontFamily: "'Tajawal', sans-serif", // تأكد من مطابقة الاسم المعرف في ملف الـ CSS
  allVariants: {
    fontFamily: "'Tajawal', sans-serif", // هذا السطر يضمن تطبيق الخط على كل أنواع النصوص بلا استثناء
  },
},components: {
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: "'Tajawal', sans-serif",
      },
    },
  },
},
  
    palette: {
  mode,    
  primary: {
        Appar: mode === 'light' ? blue1 : blue2 ,
                Appar2: mode === 'light' ? white :  blue2 ,

    text:mode === 'light' ? gray2 : gray4,//لون التنقلات عالناف



button: mode === 'light' ? blue4 : blue5,
button1: mode === 'light' ? blue1 :light_blue,

more: mode === 'light' ? blue1 : darkblack,
moreborder: mode === 'light' ? blue1 : darkgray,
chip: mode === 'light' ? black : gray4,
        drower: mode === 'light' ?  blue : mainColor ,
logo:mode  === 'light' ? blue1 : 'rgba(19, 41, 106, 0.68)',
card:mode  === 'light' ? card : darkcard,

imagecard:mode  === 'light' ? mainColor : blue1,
imagcard:mode  === 'light' ? white : lightgray,

    main: mode === 'light' ?  'rgba(232, 234, 241, 1)' :  'rgba(8, 16, 42, 1)',
        main1: mode === 'light' ? 'rgb(247, 239, 247)' : '#c911eeff', // أزرق رئيسي لللايت، أزرق فاتح للدارك

    // أزرق رئيسي لللايت، أزرق فاتح للدارك
    contrastText:mode === 'light' ?'#ffffffff' : '#000000',
    text4:mode === 'light' ? black : lightgray,
    text3:mode === 'light' ? blue1 : lightgray,
    

    // لون النص على الأزرار
  },
  background: {

    default: mode === 'light' ? gray4 : gray1, // الأبيض لللايت، الأسود للدارك
  },
  text: {
    primary: mode === 'light' ?lightgray : black ,
    secondary: mode === 'light' ? darkblack : darkgray, 
    textcard:mode  === 'light' ? blue1 : darkgray,
        textc:mode  === 'light' ? blue1 : lighttext,
        textt:mode  === 'light' ? gray3 : lighttext,

        textlight:mode  === 'light' ? lighttext : lighttext,
        cardlight:mode  === 'light' ? gray1 : lighttext,


        secondary1: mode === 'light' ? white : darkgray, // النص الثانوي
// النص الثانوي
  },
  divider:{
            main: mode === 'light' ? '#3a04327c' : '#d8bfbfff', // لون خلفية  

  }
},
      
       navbar: {
        main: mode === 'light' ? '#f5c2ed7c' : '#121212', // لون خلفية  
        contrastText: mode === 'light' ? '#c319d2ff' : '#521f4dff', // لون النص والأيقونات
        hover: mode === 'light' ? '#f8e3fdff' : '#1f1f1f', // عند التحويم
        border: mode === 'light' ? 'rgb(226, 218, 226)' : '#c319d2ff',
                border1: mode === 'light' ? 'rgb(226, 218, 226)' : '#9819d2ff',

        span:mode === 'light' ? '#700a99ff' : '#ffffff',
                body: mode === 'light' ? '#c2e0f52c' : '#000000',
                 body1: mode === 'light' ? '#3b4044b2' : '#ffffff',
                // لون خلفية  البودي
button:mode === 'light' ? '#ffffff' : '#9819d2ff',
            Text:mode === 'light' ? '#000000' :'#ad19d2ff' ,  
               paper: mode === 'light' ? '#ffffff' : '#121212', 
               icon:mode=== 'light' ? '#3b4044b2' : '#cc19d2ff', //ت
// لون النص مخصص  

      },
    }),
    [mode]
  )

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleMode={toggleMode} mode={mode} />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <HashRouter>
        <Main />
      </HashRouter>
   
  </React.StrictMode>
)
