import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { BaseUrl, USER } from "../backend/Api";
import { getData } from "../backend/ApiServecies";
import APPLoading from "../style/loader/AppLoading";
import { clearUserInfo, setUserInfo } from "../backend/slice/auth/userInfo";

const cookies = new Cookies();

export default function ProtectedRoute({ allowedRole }) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user?.userInfo);

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = cookies.get("token");

        if (!token) {
          dispatch(clearUserInfo());
          setLoading(false);
          return;
        }

        const response = await getData(`${BaseUrl}${USER}`);


        dispatch(setUserInfo(response));
      } catch (error) {
        console.log("SESSION ERROR =", error);

        dispatch(clearUserInfo());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  // أثناء الفحص
  if (loading) {
    return <APPLoading />;
  }

  // لا يوجد مستخدم
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // الرول غير مسموح
  if (!allowedRole.includes(userInfo.role)) {
    return <Navigate to="/login" replace />;
  }

  // مسموح
  return <Outlet />;
}