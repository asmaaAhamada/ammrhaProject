import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { darkcard, gray, gray2, mainColor } from "../../style/color-main/color";
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

export default function TopBar(props) {
    const theme= useTheme()
      const { window, toggleMode, mode } = props;

  return (
    <Box
      sx={{
        width: {
          xs: "85%",
          sm: "90%",
          md: "92%",               

          lg: "1050px",
        },

        height: "65px",
        backgroundColor: theme.palette.primary.Appar2,


        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        px: {
          xs: 1.2,
          sm: 2,
          md: 3,
        },

        mx: "auto",
        mt: 3,

        boxShadow: "0px 2px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* 🔍 البحث - جهة اليمين */}
      <Box
        sx={{
          width: {
            xs: "180px",
            sm: "260px",
            md: "380px",
            lg: "576px",
          },
        }}
      >
        <TextField
          fullWidth
          placeholder="بحث..."
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "49.6px",
              borderRadius: "14px",
              backgroundColor: theme.palette.primary.button,
color:theme.palette.primary.text,
              "& fieldset": {
                border: `1px solid  ${gray}`,
              },
            },

            "& input": {
              textAlign: "right",
              direction: "rtl",
              fontSize: {
                xs: "13px",
                sm: "14px",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#64748b" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 🌙 🔔 الأيقونات - أقصى اليسار */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          gap: {
            xs: 0.5,
            sm: 1,
            md: 1.5,
          },
        }}
      >
        <IconButton
                onClick={toggleMode}

          sx={{
            width: {
              xs: 38,
              sm: 42,
            },

            height: {
              xs: 38,
              sm: 42,borderRadius: "12px",
            },

            backgroundColor: darkcard,

            "&:hover": {
              backgroundColor: darkcard,
            },
          }}
        >
                    {mode === 'light' ? <NightlightOutlinedIcon  sx={{color:gray2}}/> : <WbSunnyOutlinedIcon  sx={{color:gray2}} />}

        </IconButton>



        <IconButton
          sx={{
            width: {
              xs: 38,
              sm: 42,
            },

            height: {
              xs: 38,
              sm: 42,borderRadius: "12px",
            },

            backgroundColor: darkcard,

            "&:hover": {
              backgroundColor: darkcard,
            },
          }}
        >
          <NotificationsNoneIcon  sx={{color:gray2}} />
        </IconButton>
      </Box>
    </Box>
  );
}