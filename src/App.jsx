import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import LoginPage from "./components/Login/LoginPage";
import ComplaintsPage from "./components/page/Complaints/ComplaintsPage";
import AnalysePage from "./components/page/analyse/analysePage";
import ProtectedRoute from "./protectedRout/proctedRout";
import APPLoading from "./style/loader/AppLoading";
import HonorPage from "./components/page/HonorBord/HonorPage";
import RankPage from "./components/page/Rank/RankPage";
import EventCard from "./components/page/events/EventCard";
import EventsPage from "./components/page/events/EventsPage";
import EventDetails from "./components/page/events/EventDetails";

// lazy imports
const Sidebar = lazy(() => import("./components/Layout/sidePar"));
const HomePage = lazy(() => import("./components/page/home/homePage"));
const FrazzenPage = lazy(() => import("./components/page/frazzening/frazingPage"));
const BlackListPage = lazy(() => import("./components/page/blackList/blackListPage"));
const Volunteerspage = lazy(() => import("./components/page/volinterr/viewpage"));

const NeWsPage = lazy(() => import("./components/page/News/NewsPage"));
const NewsDetails = lazy(() => import("./components/page/News/NewsDetails"));
const RequestsComponent = lazy(() => import("./components/page/orders/orderpage"));
const SectionPage = lazy(() => import("./components/page/Section/SectionPage"));
const CriteriaPage = lazy(() => import("./components/page/Criteria/CriteriaPage"));

export default function App({ toggleMode, mode }) {
  return (
    <Suspense fallback={<APPLoading/>}>
      <Routes>
        {/* 1. صفحة تسجيل الدخول كمسار مستقل تماماً */}
        <Route path="/login" element={<LoginPage />} />
  <Route element={<ProtectedRoute allowedRole={["hr_general", "admin"]} />}>

        {/* 2. المسار الرئيسي يعرض الـ Sidebar والصفحات بداخله */}
        <Route path="/" element={<Sidebar toggleMode={toggleMode} mode={mode} />}>
          
          {/* عندما يفتح المستخدم الرابط الرئيسي "/" يتم تحويله تلقائياً لـ "/home" */}
          <Route index element={<Navigate to="home" replace />} />

          {/* الصفحات الداخلية التي تظهر داخل السايدبار */}
          <Route path="home" element={<HomePage />} />
          <Route path="volunteers" element={<Volunteerspage />} />
          <Route path="News" element={<NeWsPage />} />
          <Route path="News/:id" element={<NewsDetails />} />
          <Route path="orders" element={<RequestsComponent />} />
          <Route path="frazing" element={<FrazzenPage />} />
          <Route path="black" element={<BlackListPage />} />
          <Route path="Criteria" element={<CriteriaPage />} />
          <Route path="section" element={<SectionPage />} />
          <Route path="Complaints" element={<ComplaintsPage />} />
          <Route path="analyse" element={<AnalysePage />} />
                    <Route path="Honor" element={<HonorPage />} />
                    <Route path="Rank" element={<RankPage />} />
<Route path="/Events" element={<EventsPage />} />
<Route path="/Events/:id" element={<EventDetails />} />
        </Route>
</Route>
        {/* أي مسار غير معروف يتم إرجاعه للمسار الرئيسي */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}