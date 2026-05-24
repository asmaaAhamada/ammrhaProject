import React, { useCallback, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import NewsCard from "./NewsCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { red1, white } from "../../../style/color-main/color";
import { cardsData } from "./fakedata";
import { useNavigate } from "react-router-dom";
import AddNews from "./addNews";
import EditNews from "./edit";
import DeletNews from "./deletnew";


export default function NeWsPage() {
    const [open, setOpen] = useState(false);
        const [opendelet, setOpendelet] = useState(false);

const [openEdit, setOpenEdit] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);
      const navigate = useNavigate();

    const theme =useTheme()
    const handleEdit = useCallback((card) => {
  setSelectedCard(card);
  setOpenEdit(true);
}, []);

const handleDelete = useCallback((card) => {
  setOpendelet(true);
}, []);

const handleView = useCallback((card) => {
  navigate(`/News/${card.id}`);
}, [navigate]);
  return (
    <Box
      sx={{
        width: "100%",
        p: {
          xs: 1,
          sm: 2,
          md: 3,
        },
      }}
    >
      {/* الهيدر */}
     <Box
  sx={{
    width: "100%",
    minHeight: "36px",
    display: "flex",
    alignItems: "center",

    // دائماً جنب بعض
    flexDirection: "row",

    justifyContent: {
      xs: "space-between",
      sm: "space-between",
      md: "space-between",
    },

    // تقليل المسافة بالموبايل والتابليت
    gap: {
      xs: 1,
      sm: 1.5,
      md: 2,
    },

    mb: 3,
  }}
>
  {/* عنوان الأخبار */}
  <Typography
    sx={{
      fontSize: {
        xs: "20px",
        sm: "22px",
        md: "26px",
      },
      fontWeight: 700,
      color: theme.palette.primary.text3,
      whiteSpace: "nowrap",
    }}
  >
    الأخبار
  </Typography>

  {/* زر إضافة خبر */}
  <Button
onClick={() => setOpen(true)}
    variant="contained"
    sx={{
      width: {
        xs: "140px",
        sm: "160px",
        md: "177px",
      },

      height: "43px",

      borderRadius: "12px",
       backgroundColor:
                    theme.palette.primary.button1,
                  color: white,
      boxShadow: "none",

      fontSize: {
        xs: "13px",
        sm: "14px",
        md: "15px",
      },

      fontWeight: 600,
      textTransform: "none",

      "&:hover": {
        backgroundColor: "#162d6b",
        boxShadow: "none",
      },
    }}
  >
    
    إضافة خبر
    <AddIcon sx={{width:'18px',height:'18px' ,mr:2}} />
  </Button>
</Box>

      {/* الكاردات */}
      <Grid container spacing={3}>
  {cardsData.map((card) => (
    <NewsCard
      key={card.id}
      card={card}
      theme={theme}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onView={handleView}
    />
  ))}
</Grid>
      <AddNews open={open} onClose={() => setOpen(false)} />
              <DeletNews open={opendelet} onClose={() => setOpendelet(false)} />

        <EditNews
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  selectedCard={selectedCard}
/>
    </Box>
  );
}