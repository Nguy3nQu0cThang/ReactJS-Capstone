import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderHome from "../component/HomePage/HeaderHome";
import Banner from "../component/HomePage/Banner";

const HomePageMaster = () => {
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "/cinema" || location.pathname === "/booking"

  return (
    <div className="container mx-auto">
      <HeaderHome />
      {isHome && <Banner />}
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePageMaster;