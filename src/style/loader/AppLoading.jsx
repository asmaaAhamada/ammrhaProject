
import { CircularProgress, Box } from '@mui/material';
import { blue1 } from '../color-main/color';

export default function APPLoading(){
    return(
        <>
  <Box
      sx={{
        backgroundColor: '#ffffff',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        sx={{
          color:blue1,
        }}
        size={60}
        thickness={5}
      />
    </Box>   </> )
}