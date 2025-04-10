import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ListCinema from "../component/DetailPage/ListCinema";
import CinemaSchedule from "../component/DetailPage/CinemaSchedule";
import CinemaBranches from "../component/DetailPage/CinemaBranches";

const DetailPage = () => {
  const [selectCinema, setSelectCinema] = useState("BHDStar"); // Mặc định là BHD
  const [selectBranch, setSelectBranch] = useState(null); // Cụm rạp được chọn

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Trang phim</h2>
      <Outlet />

      <div className="flex gap-4">
        <div className="w-[15%] h-[600px]">
          <ListCinema onSelectCinema={setSelectCinema} />
        </div>

        <div className="w-[25%] h-[600px]">
          <CinemaBranches
            maHeThongRap={selectCinema}
            onSelectBranch={setSelectBranch}
          />
        </div>

        <div className="w-[60%] h-[600px]">
          <CinemaSchedule maCumRap={selectBranch} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;