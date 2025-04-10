import React, { useState } from "react";
import ListCinema from "../component/CinemaPage/ListCinema";
import CinemaBranches from "../component/CinemaPage/CinemaBranches";
import CinemaSchedule from "../component/CinemaPage/CinemaSchedule";

const CinemaPage = () => {
  const [selectCinema, setSelectCinema] = useState("BHDStar"); // Mặc định là BHD
  const [selectBranch, setSelectBranch] = useState(null); // Cụm rạp được chọn
  return (
    <div className="flex gap-4 mt-5">
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
  );
};

export default CinemaPage;
