// NewsDetails.jsx

import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { red1, white } from "../../../style/color-main/color";

export default function CriteriaDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const newsItem = cardsData.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <Typography sx={{ color: theme.palette.primary.text3, fontSize: "20px", fontWeight: 600 }}>
        الخبر غير موجود
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {/* الهيدر */}
      <Box
        sx={{
          width: "100%",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            fontWeight: 700,
            color: theme.palette.primary.text3,
          }}
        >
          تفاصيل خبر
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/News")}
          sx={{
            width: { xs: "130px", sm: "150px", md: "177px" },
            height: "43px",
            borderRadius: "12px",
            backgroundColor: theme.palette.primary.button1,
            color: white,
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 600,fontSize:'16px'
           
          }}
        >
          رجوع
          <ArrowBackIosNewOutlinedIcon sx={{mr:2}} />
        </Button>
      </Box>

      {/* الكارد */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: "100%",
            maxWidth: "1136px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: theme.palette.primary.Appar2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* الصورة */}
          <CardMedia
            component="img"
            image={newsItem.image}
            alt="news-image"
            sx={{
              height: { xs: 180, sm: 192 },
              objectFit: "cover",
            }}
          />

          {/* المحتوى */}
          <CardContent sx={{ p: 3 }}>
            <Typography
              sx={{
                color: theme.palette.primary.text5,
                fontSize: "13px",
                mb: 1,
              }}
            >
              {newsItem.date}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.text6,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              {newsItem.description}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.text6,
                fontSize: { xs: "13px", md: "15px" },
                lineHeight: 2,
                mb: 3,
              }}
            >
              {newsItem.details}
            </Typography>

            {/* 🔥 الأزرار داخل الكارد */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                startIcon={<DeleteOutlineOutlinedIcon sx={{ ml: 1 }} />}
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
                startIcon={<EditOutlinedIcon sx={{ ml: 1 }} />}
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}