import React, { lazy, Suspense, useCallback, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import SectionCard from "./SectionCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { white } from "../../../style/color-main/color";
import { cardsData } from "./fakedata";
import { useNavigate } from "react-router-dom";

//lazy-loading
const AddSection = lazy(() => import("./AddSection"));
const EditSection = lazy(() => import("./EditSection"));
const DeletSection = lazy(() => import("./DeletSection"));

export default function SectionPage() {
  const [open, setOpen] = useState(false);
  const [opendelet, setOpendelet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleEdit = useCallback((card) => {
    setSelectedCard(card);
    setOpenEdit(true);
  }, []);

  const handleDelete = useCallback((card) => {
    setSelectedCard(card);
    setOpendelet(true);
  }, []);

  const handleFreeze = useCallback((card) => {
    // هنا يتم وضع منطق التجميد الخاص بك
    console.log("تم تجميد القسم:", card.id);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      {/* الهيدر */}
      <Box
        sx={{
          width: "100%",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: { xs: 1, sm: 1.5, md: 2 },
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            fontWeight: 700,
            color: theme.palette.primary.text3,
            whiteSpace: "nowrap",
          }}
        >
          الأقسام
        </Typography>

        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            width: { xs: "140px", sm: "160px", md: "177px" },
            height: "43px",
            borderRadius: "12px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            boxShadow: "none",
            fontSize: { xs: "13px", sm: "14px", md: "15px" },
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#162d6b",
              boxShadow: "none",
            },
          }}
        >
          إضافة قسم
          <AddIcon sx={{ width: "18px", height: "18px", mr: 2 }} />
        </Button>
      </Box>

      {/* الكاردات - عرض 3 كاردات في الشاشات الكبيرة والتابلت الأفقي */}
      <Grid container spacing={3} justifyContent="flex-start">
        {cardsData.map((card) => (
          <Grid 
            item 
            key={card.id} 
            xs={12}      // كارد واحد في الموبايل
            sm={6}       // كاردين في التابلت
            md={4}       // 3 كاردات في الشاشات المتوسطة/اللابتوب
            lg={4}       // 3 كاردات في الشاشات الكبيرة
            display="flex"
            justifyContent="center"
          >
            <SectionCard
              card={card}
              theme={theme}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFreeze={handleFreeze}
            />
          </Grid>
        ))}
      </Grid>

      {/* دعم لفكرة الليزي لودنغ */}
      <Suspense fallback={null}>
        {open && <AddSection open={open} onClose={() => setOpen(false)} />}
        {opendelet && <DeletSection open={opendelet} onClose={() => setOpendelet(false)} />}
        {openEdit && (
          <EditSection
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            selectedCard={selectedCard}
          />
        )}
      </Suspense>
    </Box>
  );
}