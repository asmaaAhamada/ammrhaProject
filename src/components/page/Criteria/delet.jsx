import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import { blue, blue2, red } from "../../../style/color-main/color";

import { useTheme } from "@mui/material/styles";



export default function DeletCriteriaModal( {open,onClose}){
        const theme =useTheme()

    return(
        <>
        
        
      <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
         
        >
           
          <DialogTitle
            id="alert-dialog-title"
            sx={{                      color: theme.palette.text.textc,
 direction: "rtl", fontSize: "24px", fontWeight: "700" ,                               backgroundColor: theme.palette.primary.Appar2,
 }}
          >
            {"هل ترغب حقا بحذف هذا العيار"}
          </DialogTitle>
          <DialogContent sx={{backgroundColor: theme.palette.primary.Appar2,}}>
            <DialogContentText
              sx={{ fontSize: "24px", fontWeight: "700",backgroundColor: theme.palette.primary.Appar2, color: theme.palette.primary.text6, }}
              id="alert-dialog-description"
            >
              لن تستطبع التراجع اذا قمت بالضغط على موافق
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: theme.palette.primary.Appar2, display: "flex",
    justifyContent: "flex-start",}}>
          
           <Button
              onClick={onClose}
               
              sx={{
                color: red,
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              حذف
            </Button>

            <Button
              onClick={onClose}
               
              sx={{
      color: theme.palette.primary.text3,
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              تراجع
            </Button>
            
          </DialogActions>
          
        </Dialog>
        
        </>
    )
}

