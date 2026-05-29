import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";

const AddCriteriaModal = ({ open, onClose}) => {
  const theme = useTheme();

 

 


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.imagecard1,
          color: theme.palette.primary.text3,
          borderRadius: "12px",
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.palette.primary.text3,
          textAlign: "right",
          fontWeight: 700,
          position: "relative",
        }}
      >
        إضافة المعيار

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.primary.text3,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          placeholder="ادخل اسم المعيار"
          margin="normal"
          InputProps={{
            sx: {
              color: theme.palette.primary.text7,
              textAlign: "right",
            },
          }}
          inputProps={{
            style: {
              textAlign: "right",
            },
          }}
        />

        <TextField
          fullWidth
          placeholder="عدد النقاط"
          margin="normal"
          inputMode="numeric"
          InputProps={{
            sx: {
              color: theme.palette.primary.text7,
            },
          }}
          inputProps={{
            style: {
              textAlign: "right",
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            backgroundColor: theme.palette.primary.button1,
            color: white,
            "&:hover": {
              backgroundColor: theme.palette.primary.button1,
            },
          }}
        >
            إضافة
           
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCriteriaModal;