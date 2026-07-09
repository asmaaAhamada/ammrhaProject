import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { blue } from "../../../style/color-main/color";

export default function ActivateDepartmentModal({
  open,
  onClose,
  department,
  onConfirm,
}) {
  if (!department) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent sx={{ p: 4, textAlign: "center" }}>

        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#dcfce7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <PlayArrowOutlinedIcon
            sx={{
              color: "#22c55e",
              fontSize: 38,
            }}
          />
        </Box>

        <Typography
          sx={{
            color:"#22c55e",
            fontWeight: 700,
            fontSize: 22,
            mb: 1,
          }}
        >
          تفعيل القسم
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            mb: 4,
            fontSize: 15,
          }}
        >
          هل أنت متأكد من إعادة تفعيل القسم
          <br />
          <strong>{department.name}</strong> ؟
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Button
          sx={{color:blue ,borderColor:"#22c55e"}}
            variant="outlined"
            onClick={onClose}
          >
            إلغاء
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#22c55e",
              "&:hover": {
                bgcolor: "#16a34a",
              },
            }}
            onClick={() => onConfirm(department.id)}
          >
            تفعيل
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
}