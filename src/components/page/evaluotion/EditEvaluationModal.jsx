import React, { useState, useEffect } from "react";
import { Modal, Divider, TimePicker, message as antMessage } from "antd";
import { 
  Box, 
  Typography, 
  Button, 
  useTheme, 
  Switch, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Paper 
} from "@mui/material";
import { 
  AccessTime as TimeIcon,
  ChevronLeft as NextIcon,
  Save as SaveIcon
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { creteriaList } from "../../../backend/slice/Criteria/list";
import { editVolunteerEvaluation, resetEditStatus } from "../../../backend/slice/volnteers/evalaution/editeEvaltion";

export const EditEvaluationModal = ({ open, onClose, eventData, volunteersList = [] }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // جلب معايير التقييم من Redux
  const criteriaState = useSelector((state) => state.creteriaList);
  const criteriaList = Array.isArray(criteriaState) 
    ? criteriaState 
    : Array.isArray(criteriaState?.data?.data) 
    ? criteriaState.data.data 
    : Array.isArray(criteriaState?.data) 
    ? criteriaState.data 
    : [];

  // جلب حالة التحميل من Redux Slice
  const { isLoading } = useSelector((state) => state.editEvaluation || {});

  const [selectedVolunteerIndex, setSelectedVolunteerIndex] = useState(0);
  const [evaluations, setEvaluations] = useState({});

  // 1. طلب المعايير عند فتح المودال
  useEffect(() => {
    if (open) {
      dispatch(creteriaList());
    }
  }, [dispatch, open]);

  // 2. تهيئة حالة التقييمات عند فتح المودال
  useEffect(() => {
    if (open && volunteersList.length > 0 && criteriaList.length > 0) {
      const initialStore = {};
      volunteersList.forEach((vol) => {
        const volId = vol.volunteer_id || vol.id;
        initialStore[volId] = {
          event_id: Number(eventData?.id),
          volunteer_id: Number(volId),
          left_at: null,
          criteria: criteriaList.map((c) => ({
            criterion_id: Number(c.id),
            achieved: false
          }))
        };
      });
      setEvaluations(initialStore);
      setSelectedVolunteerIndex(0);
    }
  }, [open, volunteersList, criteriaList, eventData]);

  const currentVolunteer = volunteersList[selectedVolunteerIndex];
  const currentVolId = currentVolunteer?.volunteer_id || currentVolunteer?.id;
  const currentEvalData = evaluations[currentVolId] || { criteria: [], left_at: null };

  const handleToggleCriterion = (criterionId) => {
    if (!currentVolId) return;
    setEvaluations((prev) => {
      const volData = prev[currentVolId];
      if (!volData) return prev;

      const updatedCriteria = volData.criteria.map((item) => {
        if (Number(item.criterion_id) === Number(criterionId)) {
          return { ...item, achieved: !item.achieved };
        }
        return item;
      });

      return {
        ...prev,
        [currentVolId]: { ...volData, criteria: updatedCriteria }
      };
    });
  };

  const handleTimeChange = (time, timeString) => {
    if (!currentVolId) return;
    setEvaluations((prev) => {
      const volData = prev[currentVolId];
      if (!volData) return prev;

      return {
        ...prev,
        [currentVolId]: { ...volData, left_at: timeString || null }
      };
    });
  };

  const handleNextVolunteer = () => {
    if (selectedVolunteerIndex < volunteersList.length - 1) {
      setSelectedVolunteerIndex((prev) => prev + 1);
    }
  };

  // 3. الحفظ وإظهار الرسالة المطلوبة عند النجاح، أو الخطأ القادم من الباك إند
  const handleSaveAll = async () => {
    const payloadList = Object.values(evaluations);

    const promises = payloadList.map((payload) =>
      dispatch(
        editVolunteerEvaluation({
          eventId: eventData?.id,
          evaluationData: payload
        })
      ).unwrap()
    );

    try {
      await Promise.all(promises);
      // عرض الرسالة المحددة للنجاح مرة واحدة فقط
      antMessage.success("تم إنشاء تقييم المتطوع بنجاح");
      dispatch(resetEditStatus());
      onClose();
    } catch (err) {
      // إظهار نص الخطأ القادم من الباك إند مرة واحدة فقط
      const errorMsg = typeof err === 'string' 
        ? err 
        : err?.message || err?.error || "حدث خطأ أثناء حفظ التقييمات";

      antMessage.error(errorMsg);
      dispatch(resetEditStatus());
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={850}
      centered
      destroyOnClose
      title={
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.text3 }}>
          تعديل وتقييم المتطوعين: {eventData?.event_name || eventData?.name}
        </Typography>
      }
      styles={{
        content: {
          backgroundColor: theme.palette.primary.Appar2,
          color: theme.palette.primary.text3,
          borderRadius: "16px",
          direction: "rtl"
        },
        header: {
          backgroundColor: "transparent",
          marginBottom: "0px"
        }
      }}
    >
      <Divider style={{ margin: "10px 0 20px 0", borderColor: "rgba(161, 169, 195, 0.15)" }} />

      <Box sx={{ display: "flex", gap: 2, minHeight: 400 }}>
        {/* الشريط الجانبي للمتطوعين */}
        <Paper
          elevation={0}
          sx={{
            width: 240,
            p: 1,
            backgroundColor: "rgba(161, 169, 195, 0.04)",
            border: "1px solid rgba(161, 169, 195, 0.15)",
            borderRadius: "12px"
          }}
        >
          <Typography variant="caption" sx={{ px: 1, color: theme.palette.primary.chip, fontWeight: 700 }}>
            قائمة المتطوعين ({volunteersList.length})
          </Typography>
          <List sx={{ mt: 1, p: 0 }}>
            {volunteersList.map((vol, index) => {
              const isSelected = index === selectedVolunteerIndex;
              return (
                <ListItem
                  button
                  key={vol.volunteer_id || vol.id || index}
                  onClick={() => setSelectedVolunteerIndex(index)}
                  sx={{
                    borderRadius: "8px",
                    mb: 0.5,
                    backgroundColor: isSelected ? "rgba(161, 169, 195, 0.12)" : "transparent",
                    borderRight: isSelected ? `4px solid ${theme.palette.primary.button1}` : "none"
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 38 }}>
                    <Avatar src={vol.image} sx={{ width: 28, height: 28, fontSize: "12px" }}>
                      {vol.name?.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={vol.name}
                    primaryTypographyProps={{
                      fontSize: "13px",
                      fontWeight: isSelected ? 700 : 500,
                      color: theme.palette.primary.text3
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>

        {/* المساحة الرئيسية */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(161, 169, 195, 0.06)",
                borderRadius: "12px"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar src={currentVolunteer?.image} sx={{ width: 42, height: 42 }}>
                  {currentVolunteer?.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.primary.text3 }}>
                    {currentVolunteer?.name || "اختر متطوعاً"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.primary.chip }}>
                    مُعرّف المتطوع: {currentVolId}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TimeIcon sx={{ fontSize: 18, color: theme.palette.primary.chip }} />
                <TimePicker
                  format="HH:mm"
                  value={currentEvalData.left_at ? dayjs(currentEvalData.left_at, "HH:mm") : null}
                  onChange={handleTimeChange}
                  placeholder="وقت الانصراف"
                  style={{ width: 110 }}
                />
              </Box>
            </Paper>

            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.chip }}>
              معايير التقييم:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 240, overflowY: "auto", pr: 0.5 }}>
              {criteriaList.map((criterion) => {
                const matchedCriterion = currentEvalData.criteria?.find(
                  (c) => Number(c.criterion_id) === Number(criterion.id)
                );
                const isAchieved = Boolean(matchedCriterion?.achieved);

                return (
                  <Paper
                    key={criterion.id}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: isAchieved ? "rgba(5, 223, 114, 0.05)" : "rgba(161, 169, 195, 0.02)",
                      border: "1px solid",
                      borderColor: isAchieved ? "#05df72" : "rgba(161, 169, 195, 0.15)",
                      borderRadius: "8px"
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.text3 }}>
                      {criterion.name}
                    </Typography>
                    <Switch
                      checked={isAchieved}
                      onChange={() => handleToggleCriterion(criterion.id)}
                      color="success"
                    />
                  </Paper>
                );
              })}
            </Box>
          </Box>

          {/* الأزرار */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, pt: 1, borderTop: "1px solid rgba(161, 169, 195, 0.15)" }}>
            <Button
              variant="text"
              onClick={handleNextVolunteer}
              disabled={selectedVolunteerIndex === volunteersList.length - 1}
              endIcon={<NextIcon />}
              sx={{ color: theme.palette.primary.button1 }}
            >
              المتطوع التالي
            </Button>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" onClick={onClose} sx={{ borderRadius: "8px" }}>
                إلغاء
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveAll}
                loading={isLoading}
                sx={{
                  bgcolor: theme.palette.primary.button1,
                  color: "#fff",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: theme.palette.primary.button1, opacity: 0.9 }
                }}
              >
                حفظ التقييمات
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};