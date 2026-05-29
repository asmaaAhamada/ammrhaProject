import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/Login/LoginPage";

import Sidebar from "./components/Layout/sidePar";

import HomePage from "./components/page/home/homePage";
import FrazzenPage from "./components/page/frazzening/frazingPage";
import BlackListPage from "./components/page/blackList/blackListPage";

import "./index.css";
import Volunteerspage from "./components/page/volinterr/viewpage";
import NeWsPage from "./components/page/News/NewsPage";
import NewsDetails from "./components/page/News/NewsDetails";
import RequestsComponent from "./components/page/orders/orderpage";
import CriteriaPage from "./components/page/Criteria/CriteriaPage";
import SectionPage from "./components/page/Section/SectionPage";

export default function App({ toggleMode, mode }) {
  return (
    <Routes>
      {/* صفحة تسجيل الدخول */}
      <Route path="/login" element={<LoginPage />} />

      {/* Layout فيه Sidebar */}
      <Route
        path="/"
        element={<Sidebar toggleMode={toggleMode} mode={mode} />}
      >
        {/* الصفحة الافتراضية */}
        <Route index element={<Navigate to="home" replace />} />

        {/* الصفحات */}
        <Route path="home" element={<HomePage />} />

        <Route
          path="volunteers"
          element={<Volunteerspage />}
        />
        <Route path="News" element={<NeWsPage />} />
<Route path="News/:id" element={<NewsDetails />} />
        <Route path="orders" element={<RequestsComponent />} />

        <Route path="frazing" element={<FrazzenPage />} />

        <Route path="black" element={<BlackListPage />} />
                <Route path="Criteria" element={<CriteriaPage />} />
                <Route path="section" element={<SectionPage />} />

      </Route>
    </Routes>
  );
}