import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined"; // أيقونة التجميد (Ice/Freeze)

import { baby_gray, red1, yallow1 } from "../../../style/color-main/color";
import { Tooltip } from "antd";

function SectionCard({
  card,
  theme,
  onEdit,
  onDelete,
  onFreeze,
}) {
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.Appar2,
        width: "100%",
        maxWidth: "352px",  // العرض المطلوب
        height: "349px",    // الطول الثابت المطلوب للـ 3 كاردات
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
      }}
    >
      {/* الصورة */}
      <CardMedia
        component="img"
        image={card.image}
        alt={card.name}
        loading="lazy"
        sx={{
          height: 154,
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
          "&:last-child": { pb: 2 } // لإلغاء البادينغ التلقائي الإضافي من الماتيريال ديزاين
        }}
      >
        <Box>
          {/* اسم القسم */}
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.text3,
              mb: 3,
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {card.name}
          </Typography>

          {/* أيقونة القروب وعدد المتطوعين */}
          <Box display="flex" alignItems="center" sx={{ gap: 1, color: baby_gray }}>
            <PeopleAltOutlinedIcon sx={{ fontSize: "20px" }} />
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {card.volunteerCount} متطوع
            </Typography>
          </Box>
          
        </Box>
        <Box>
          <hr/>

        {/* الأزرار السفليّة */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
           
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          
          {/* زر حذف */}
          <Tooltip title="حذف القسم">
            <Button
              onClick={() => onDelete(card)}
              startIcon={<DeleteOutlineOutlinedIcon sx={{ ml: 0.5 }} />}
              sx={{
                p: 0,
                minWidth: "auto",
                background: "transparent",
                color: red1,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { background: "transparent" }
              }}
            >
              حذف
            </Button>
          </Tooltip>
            {/* زر تجميد */}
          <Tooltip title="تجميد القسم">
            <Button
              onClick={() => onFreeze(card)}
              startIcon={<AcUnitOutlinedIcon sx={{ ml: 0.5 }} />}
              sx={{
                p: 0,
                minWidth: "auto",
                background: "transparent",
                color: yallow1, // لون أزرق يوحي بالتجميد أو حسب ثيم تطبيقك
                textTransform: "none",
                fontWeight: 500,
                
              }}
            >
              تجميد
            </Button>
          </Tooltip>

          {/* زر تعديل */}
          <Tooltip title="تعديل القسم">
            <Button
              onClick={() => onEdit(card)}
              startIcon={<EditOutlinedIcon sx={{ ml: 0.5 }} />}
              sx={{
                p: 0,
                minWidth: "auto",
                background: "transparent",
                color: theme.palette.primary.text3,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { background: "transparent" }
              }}
            >
              تعديل
            </Button>
          </Tooltip>

        

        </Box>
                </Box>

      </CardContent>
    </Card>
  );
}

export default React.memo(SectionCard);