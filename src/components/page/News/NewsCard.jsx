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
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { babygreen, red1 } from "../../../style/color-main/color";
import { Tooltip } from "antd";
import { BaseUrl } from "../../../backend/Api";

function NewsCard({
  card,
  theme,
  onEdit,
  onDelete,
  onView,
}) {

  // 🔹 دالة ذكية لبناء رابط الصورة الكامل وتجنب الروابط المكسورة بالمتصفح
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // إذا كان الرابط كاملاً من الباكيند (يبدأ بـ http أو https)
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    // إذا كان المسار راجع نسبياً مثل "storage/announcements/..."
    // نقوم بتنظيف الـ BaseUrl من الـ /v1 إذا كانت مضافة لتوجيهه لمجلد الملفات مباشرة
    const cleanBaseUrl = BaseUrl.replace("/v1", ""); 
    return `${cleanBaseUrl}/${imagePath}`;
  };

  // تحديد مسار الصورة الفعلي (سواء كان في حقل image_url أو image)
  const finalImagePath = card.image_url || card.image;

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
        {/* 🔹 فحص الصورة المصلح: نتحقق من وجود المسار الفعلي أولاً */}
        {finalImagePath ? (
          <CardMedia
            component="img"
            height="180"
            image={getFullImageUrl(finalImagePath)} // 👈 تمرير الرابط الموحد والديناميكي
            alt={card.title || card.name}
            sx={{ objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "180px",
              backgroundColor: "#f8f9fa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              gap: 1
            }}
          >
            <ImageNotSupportedOutlinedIcon sx={{ fontSize: 40, color: "#9ca3af" }} />
            <Typography sx={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>
              لا تتوفر صورة لهذا الخبر
            </Typography>
          </Box>
        )}

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
            {/* العنوان / الوصف */}
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
                  color: babygreen,
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