import React from "react";
import { Button } from "@mui/material";
import Cards from "./cardStatcais";
import DashboardSection from "./dashboard";
import VolunteersTable from '../volinterr/volintersTable';
import { useTheme } from "@mui/material/styles";
import { white } from "../../../style/color-main/color";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👇 استيراد Navigate للتنقل بين الصفحات

export default function HomePage() {
  const MotionButton = motion(Button);
  const theme = useTheme();
  const navigate = useNavigate(); // 👇 هاتف التنقل

  return (
    <>
      <Cards />
      <DashboardSection />
      <VolunteersTable
        isHomePage={true} // 👇 تفعيل وضع السطرين فقط والمظهر المخصص للرئيسية
        topContent={
          <MotionButton
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 7 }}
            transition={{ duration: 2.5 }}
            // 👇 التوجيه لصفحة الجدول الكاملة عند الضغط (عدلي المسار حسب الـ Routes عندك)
            onClick={() => navigate("/volunteers")} 
            sx={{
              backgroundColor: theme.palette.primary.button1,
              color: white,
              width: { xs: '200px', md: '245px' },
              height: { xs: '40px', md: '43px' },
              borderRadius: "12px",
              mb: -1,
              "&:hover": {
                backgroundColor: theme.palette.primary.button1,
                boxShadow: "none",
              },
            }}
          >
            مشاهدة جميع المتطوعين
          </MotionButton>
        }
      />
    </>
  );
}