import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";



import LoginPage from "./components/Login/LoginPage";
import ComplaintsPage from "./components/page/Complaints/ComplaintsPage";


//lazy
const Sidebar = lazy(() => import("./components/Layout/sidePar"));
const HomePage = lazy(() => import("./components/page/home/homePage"));
const FrazzenPage = lazy(() => import("./components/page/frazzening/frazingPage"));
const BlackListPage = lazy(() => import("./components/page/blackList/blackListPage"));
const Volunteerspage = lazy(() => import("./components/page/volinterr/viewpage"));

const NeWsPage = lazy(()=> import ("./components/page/News/NewsPage") )
const NewsDetails = lazy(()=> import ("./components/page/News/NewsDetails") )
const RequestsComponent = lazy(()=> import ("./components/page/orders/orderpage") )
const SectionPage = lazy(()=> import ("./components/page/Section/SectionPage") )
const CriteriaPage = lazy(()=> import ("./components/page/Criteria/CriteriaPage") )



export default function App({ toggleMode, mode }) {
  return (
          <Suspense fallback={null}>
    
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
                <Route path="Complaints" element={<ComplaintsPage />} />

      </Route>
    </Routes>
    </Suspense>
  );
}