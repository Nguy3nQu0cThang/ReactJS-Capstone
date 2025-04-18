import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderHome from "../component/HomePage/HeaderHome";
import HeaderHomeManager from "../component/ManagerPage/HeaderHomeManager";
import Banner from "../component/HomePage/Banner";
import { useSelector } from "react-redux";

const HomePageMaster = () => {
  const location = useLocation();
  const { userLogin } = useSelector((state) => state.userReducer);

  const isHome =
    location.pathname === "/" ||
    location.pathname === "/cinema" ||
    location.pathname === "/booking";

  const isAdmin = userLogin?.maLoaiNguoiDung === "QuanTri";

  return (
    <div className="container mx-auto">
      {isAdmin ? <HeaderHomeManager /> : <HeaderHome />}
      {isHome && <Banner />}
      <div className="pt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePageMaster;
