import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { fetchDetails, resetDetails } from "../../../backend/slice/department/deteails"; // تأكدي من صحة مسار السلايس لديكِ

export default function SectionDetailsModal({ open, onClose, sectionId }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب البيانات وحالة اللودينغ والخطأ من الـ Store
  const { data, isLoading, error } = useSelector((state) => state.fetchDetails);

  useEffect(() => {
    if (open && sectionId) {
      console.log("جاري طلب تفاصيل القسم ذو المعرف:", sectionId);
      dispatch(fetchDetails(sectionId));
    }
    
    return () => {
      if (open) dispatch(resetDetails());
    };
  }, [open, sectionId, dispatch]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.Appar2,
          borderRadius: "16px",
          p: 1,
          direction: "rtl",
        },
      }}
    >
      <DialogTitle sx={{ color: theme.palette.primary.text3, fontSize: "20px", fontWeight: "700", pb: 1 }}>
        تفاصيل القسم
      </DialogTitle>

      <DialogContent>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ py: 2, fontWeight: 500 }}>
            {error}
          </Typography>
        ) : data ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
            
            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: theme.palette.primary.text6 }}>
              {data.name}
            </Typography>

            <Divider />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <BarChartOutlinedIcon sx={{ color: theme.palette.primary.text4 }} />
              <Typography sx={{ fontSize: "15px", color: theme.palette.primary.text4, fontWeight: 500 }}>
                العدد الأعظمي :{" "}
                <Typography component="span" sx={{ fontWeight: 700, color: "#e11d48", fontSize: "16px" }}>
                  {data.max_volunteers || "مفتوح"}
                </Typography>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PeopleAltOutlinedIcon sx={{ color: theme.palette.primary.text4 }} />
              <Typography sx={{ fontSize: "15px", color: theme.palette.primary.text4, fontWeight: 500 }}>
                المتطوعون الحاليون :{" "}
                <Typography component="span" sx={{ fontWeight: 700, color: theme.palette.primary.button1, fontSize: "16px" }}>
                  {data.current_volunteers_count !== undefined ? data.current_volunteers_count : 0}
                </Typography>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CalendarTodayOutlinedIcon sx={{ color: theme.palette.primary.text4, fontSize: "20px" }} />
              <Typography sx={{ fontSize: "15px", color: theme.palette.primary.text4, fontWeight: 500 }}>
                تاريخ الإنشاء :{" "}
                <Typography component="span" sx={{ fontWeight: 600, color: theme.palette.primary.text7, direction: 'ltr', display: 'inline-block' }}>
                  {data.created_at}
                </Typography>
              </Typography>
            </Box>

          </Box>
        ) : (
          <Typography align="center" sx={{ color: theme.palette.primary.text4 }}>لا توجد بيانات لعرضها</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "flex-start" }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderColor: "#ccc", color: theme.palette.primary.text4, borderRadius: "10px", fontWeight: 600 }}>
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
}