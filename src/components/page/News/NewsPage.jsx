import React, { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
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


export default function NeWsPage() {
    const [open, setOpen] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);
      const navigate = useNavigate();

    const theme =useTheme()
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
          <Grid
            item
            key={card.id}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            display="flex"
            justifyContent="center"
          >
            <Card
              sx={{
                        backgroundColor: theme.palette.primary.Appar2,

                width: "100%",
                maxWidth: "560px",
                minHeight: "369px",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* الصورة */}
              <CardMedia
                component="img"
                image={card.image}
                alt="cover"
                sx={{
                  height: {
                    xs: 180,
                    sm: 200,
                    md: 223,
                  },
                  objectFit: "cover",
                }}
              />

              {/* المحتوى */}
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  {/* التاريخ */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.text5,
                      mb: 1,
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {card.date}
                  </Typography>

                  {/* الوصف */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: "13px",
                        sm: "14px",
                        md: "15px",
                      },
                      lineHeight: 1.7,
                      color: theme.palette.primary.text6,
                      wordBreak: "break-word",
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>

                {/* الأزرار */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Button
                    startIcon={<DeleteOutlineOutlinedIcon sx={{ml:1}} />}
                    sx={{
                      p: 0,
                      minWidth: "auto",
                      background: "transparent",
                      color: red1,
                      textTransform: "none",
                      fontWeight: 500,

                     
                    }}
                  >
                    حذف
                  </Button>

                  <Button
                   onClick={() => {
    setSelectedCard(card);
    setOpenEdit(true);
  }}
                    startIcon={<EditOutlinedIcon sx={{ml:1}} />}
                    sx={{
                      p: 0,
                      minWidth: "auto",
                      background: "transparent",
      color: theme.palette.primary.text3,
                      textTransform: "none",
                      fontWeight: 500,

                     
                    }}
                  >
                    تعديل
                  </Button>

                 
                   <Button
                     onClick={() => navigate(`/News/${card.id}`)}

                    startIcon={<VisibilityOutlinedIcon sx={{ml:1}} />}
                    sx={{
                      p: 0,
                      minWidth: "auto",
                      background: "transparent",
      color: theme.palette.primary.text3,
                      textTransform: "none",
                      fontWeight: 500,

                    
                    }}
                  >
                    مشاهدة
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddNews open={open} onClose={() => setOpen(false)} />
        <EditNews
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  selectedCard={selectedCard}
/>
    </Box>
  );
}