import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { red1 } from "../../../style/color-main/color";
import { Tooltip } from "antd";

function NewsCard({
  card,
  theme,
  onEdit,
  onDelete,
  onView,
}) {
  return (
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
          image={card.image_url}
          alt="cover"
          loading="lazy"
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
              {card.title}
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
                        <Tooltip title="حذف الخبر">
            
            <Button
              onClick={() => onDelete(card)}
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
</Tooltip>
            <Tooltip title="تعديل الخبر">

            <Button
              onClick={() => onEdit(card)}
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
</Tooltip>
            <Tooltip title="مشاهدة الخبر">

            <Button
              onClick={() => onView(card)}
              startIcon={<VisibilityOutlinedIcon sx={{ ml: 1 }} />}
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
            </Tooltip>

          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default React.memo(NewsCard);