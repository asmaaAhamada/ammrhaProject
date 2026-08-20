import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DefaultRedirect() {
  // جلب دور المستخدم بنفس الطريقة التي تستخدمينها
  const userRole = useSelector((state) => state.user?.userInfo?.role);
console.log(userRole)
  // إذا كان مدير قسم، توجيهه تلقائياً لصفحة التقييمات
  if (userRole === "hr_department") {
    return <Navigate to="/evalation" replace />;
  }

  // بالنسبة لباقي الأدوار (admin أو hr_general) التوجيه للهوم
  return <Navigate to="/home" replace />;
}